const db = require("../db/db.config");
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');


// create user
const createComment = asyncHandler(async (req, res, next) => {
    const { postid, userid, content } = req.body;

    const comment = await db.comment.create({
        data:{
            post_id:Number(postid),
            user_id:Number(userid),
            comment:content
        }
    })

    res.status(201).json(new ApiResponse(201, comment, "Comment created successfully"));
})


const showAllComment = async (req, res, next) => {
    const allComment = await db.comment.findMany({});
    res.status(200).json(allComment);
};

const showComment = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const comment = await db.comment.findFirst({
        where:{
            id:Number(id)
        }
    })

    if (!comment) {
        throw new ApiError(404, "Post not found", ['provide valid post id'])
    }

    return res.status(200).json(new ApiResponse(200, comment, "Post found successfully"));
})


const updateComment = asyncHandler(async (req, res, next) => {
    const postID = req.params.id;
    const { postid, userid,content } = req.body;

    const post = await db.comment.update({
        where:{
            id:Number(postID)
        },
        data:{
            user_id:Number(userid),
            post_id:Number(postid),
            comment:content

        }
    })

    res.status(201).json(post);
});

const deleteComment = async (req, res) => {
    const commentID = req.params.id;

    await db.post.delete({
        where: {
            id: Number(commentID),
        },
    });

    res
        .status(200)
        .json({ statusCode: 200, message: "Comment deleted successfully" });
};

module.exports = {
    createComment,
    showAllComment,
    showComment,
    updateComment,
    deleteComment,
};
