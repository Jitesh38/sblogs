const db = require("../db/db.config");
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');


// create user
const createPost = asyncHandler(async (req, res, next) => {
    const { userid,title,description } = req.body;

    const user = await db.post.create({
        data:{
            user_id:Number(userid),
            title,
            description
        }
    })

    res.status(201).json(new ApiResponse(201, user, "User fetched successfully"));
})


const showAllPost = async (req, res, next) => {
    const allPosts = await db.post.findMany({});
    res.status(201).json(allPosts);
};

const showPost = asyncHandler(async (req, res, next) => {
    const postID = req.params.id;

    const post = await db.post.findFirst({
        where:{
            id:Number(postID)
        }
    })

    if (!post) {
        throw new ApiError(404, "Post not found", ['provide valid post id'])
    }

    return res.status(200).json(new ApiResponse(200, post, "Post found successfully"));
})


const updatePost = asyncHandler(async (req, res, next) => {
    const postID = req.params.id;
    const { userid,title,description } = req.body;

    const post = await db.post.update({
        where:{
            id:Number(postID)
        },
        data:{
            user_id:Number(userid),
            title,
            description

        }
    })

    res.status(201).json(post);
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

module.exports = {
    createPost,
    showAllPost,
    showPost,
    updatePost,
    deletePost,
};
