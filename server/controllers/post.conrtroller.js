const db = require("../db/db.config");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// create user
const createPost = asyncHandler(async (req, res, next) => {
    let { title, content, slug, status = "" } = req.body;

    if (status.trim() === "active") {
        status = true;
    } else {
        status = false;
    }

    const post = await db.post.create({
        data: {
            user_id: Number(req.user.id),
            title,
            slug,
            content,
            status,
            postImage: req?.file?.filename,
        },
    });

    res.status(201).json(new ApiResponse(201, post, "Post added successfully"));
});

const showAllPost = asyncHandler(async (req, res, next) => {
    const allPosts = await db.post.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    fullname: true,
                    avatar: true,
                    email: true,
                    password: false,
                },
            },
        },
    });
    res
        .status(200)
        .json(new ApiResponse(201, allPosts, "Blogs fetched successfully"));
});

const showPost = asyncHandler(async (req, res, next) => {
    console.log(req.params);

    const slug = req.params.id;
    const post = await db.post.findFirst({
        where: {
            slug: slug,
        },
        include: {
            likedBy: {
                select: {
                    id: true,
                },
            },
            bookmarkedBy: {
                select: {
                    id: true,
                },
            },
            user: {
                select: {
                    username: true,
                    fullname: true,
                    avatar: true,
                },
            },
            comment: {
                include:{
                    user:{
                        select:{
                            username:true,
                            avatar:true
                        }
                    }
                }
            },
        },
    });

    if (!post) {
        throw new ApiError(404, "Post not found", ["provide valid post id"]);
    }
    let isLiked = post.likedBy.some((like) => like.id === req.user.id);
    let isBookmarked = post.bookmarkedBy.some((user) => user.id === req.user.id);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { ...post, isLiked, isBookmarked },
                "Post found successfully"
            )
        );
});

const updatePost = asyncHandler(async (req, res, next) => {
    const postID = req.params.id;
    const { userid, title, description } = req.body;

    const post = await db.post.update({
        where: {
            id: Number(postID),
        },
        data: {
            user_id: Number(userid),
            title,
            description,
        },
    });

    return res.status(201).json(post);
});

const deletePost = async (req, res) => {
    const postID = req.params.id;

    await db.post.delete({
        where: {
            id: Number(postID),
        },
    });

    res
        .status(200)
        .json({ statusCode: 200, message: "Post deleted successfully" });
};

const searchPost = asyncHandler(async (req, res) => {
    let query = req.query.q;
    console.log(query);
    let posts;
    if (!query || query.trim() === "") {
        posts = await db.post.findMany({
            include: {
                user: {
                    select: {
                        fullname: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    } else {
        posts = await db.post.findMany({
            where: {
                title: {
                    contains: query,
                    mode: "insensitive",
                },
            },
            include: {
                user: {
                    select: {
                        fullname: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }
    if (posts.length === 0) {
        throw new ApiError(400, "No Post found.", [
            "Please enter a relative keyword to search post.",
            "No post matching this keyword",
        ]);
    }
    return res
        .status(200)
        .json(new ApiResponse(200, posts, "Post fetched successfully"));
});
const likePost = asyncHandler(async (req, res) => {
    let postId = req.body.id;

    let user = await db.user.findFirst({
        where: {
            id: req.user.id,
        },
    });

    let posts = await db.post.update({
        where: {
            id: Number(postId),
        },
        data: {
            likedBy: {
                connect: user,
            },
        },
    });
    return res
        .status(200)
        .json(new ApiResponse(200, posts, "Post fetched successfully"));
});

const savePost = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { postID } = req.body;
    console.log(req.user);

    let post = await db.post.findFirst({
        where: {
            id: Number(postID),
        },
    });

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // Check if user already bookmarked it
    const user = await db.user.findFirst({
        where: {
            id: Number(req.user.id),
            bookmarks: {
                some: { id: post.id },
            },
        },
    });

    if (!user) {
        let userLike = await db.user.update({
            where: { id: Number(req.user.id) },
            data: {
                bookmarks: {
                    connect: { id: post.id },
                },
            },
        });
        return res
            .status(200)
            .json(new ApiResponse(200, userLike, "Post saved successfully"));
    } else {
        let userLike = await db.user.update({
            where: { id: Number(req.user.id) },
            data: {
                bookmarks: {
                    disconnect: { id: post.id },
                },
            },
        });
        return res
            .status(200)
            .json(new ApiResponse(200, userLike, "Post unsaved successfully"));
    }
});

const showSavedPosts = asyncHandler(async (req, res) => {
    const user = await db.user.findFirst({
        where: {
            id: Number(req.user.id),
        },
        select: {
            bookmarks: {
                include: {
                    user: {
                        select: {
                            username: true,
                            avatar: true,
                            createdAt: true,
                        },
                    },
                },
            },
        },
    });
    res
        .status(200)
        .json(new ApiResponse(200, user, "Post fetched successfullyyyyy"));
});
module.exports = {
    createPost,
    showAllPost,
    showPost,
    updatePost,
    deletePost,
    searchPost,
    likePost,
    savePost,
    showSavedPosts,
};
