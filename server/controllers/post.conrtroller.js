const db = require("../db/db.config");
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');


// create user
const createPost = asyncHandler(async (req, res, next) => {

    let { title, content, slug, status = "" } = req.body;

    if (status.trim() === "active") {
        status = true
    } else { status = false }

    const post = await db.post.create({
        data: {
            user_id: Number(req.user.id),
            title,
            slug,
            content,
            status,
            postImage: req?.file?.filename
        }
    })

    res.status(201).json(new ApiResponse(201, post, "Post added successfully"));
})


const showAllPost = asyncHandler(async (req, res, next) => {
    const allPosts = await db.post.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    fullname: true,
                    avatar: true,
                    email: true,
                    password: false
                }
            }
        }
    });
    res.status(200).json(new ApiResponse(201, allPosts, "Blogs fetched successfully"));
});

const showPost = asyncHandler(async (req, res, next) => {
    console.log(req.params);
    const slug = req.params.id;

    const post = await db.post.findFirst({
        where: {
            slug: slug
        },
        include: {
            user: {
                select: {
                    username: true,
                    fullname: true,
                    avatar: true
                }
            },
            comment:true
        }
    })

    if (!post) {
        throw new ApiError(404, "Post not found", ['provide valid post id'])
    }

    return res.status(200).json(new ApiResponse(200, post, "Post found successfully"));
})


const updatePost = asyncHandler(async (req, res, next) => {
    const postID = req.params.id;
    const { userid, title, description } = req.body;

    const post = await db.post.update({
        where: {
            id: Number(postID)
        },
        data: {
            user_id: Number(userid),
            title,
            description

        }
    })

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
    if (!query || query.trim() === '') {
        throw new ApiResponse(400, {}, 'Query is required',);
    }

    let posts = await db.post.findMany({
        where: {
            title: {
                contains: query,
                mode: 'insensitive'
            }
        }
    })
    return res.status(200).json(new ApiResponse(200, posts, 'Post fetched successfully'))
})

module.exports = {
    createPost,
    showAllPost,
    showPost,
    updatePost,
    deletePost,
    searchPost
};
