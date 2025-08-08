const jwt = require('jsonwebtoken');
const db = require('../db/db.config');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const varifyJWT = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const accessToken = req.cookies?.accessToken ||
        req.header('Authorization')?.replace("Bearer ", "");
    if (!accessToken) {
        throw new ApiError(400, "User authentication failed.", ['Please provide token to authenticate']);
    }
    const data = jwt.verify(accessToken, process.env.ACESS_TOKEN_SECRET);

    if (!data) {
        throw new ApiError(400, "User authentication failed.", ['Please provide valid token']);
    }

    const user = await db.user.findFirst({
        where: {
            id: Number(data?.id)
        },
        select:{
            id:true,
            email:true,
            username:true,
            fullname:true,
            avatar:true
        }
    })
    if (!user) {
        throw new ApiError(400, "User not exist!");
    }
    req.user = user
    next()
})


module.exports = varifyJWT