const db = require("../db/db.config");
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');


// create user
const createUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const findUser = await db.user.findUnique({
        where: {
            email: email,
        },
    });

    if (findUser) {
        throw new ApiError(400, 'Email already exist')
    }

    const user = await db.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    });

    res.status(201).json(new ApiResponse(201, user, "User created successfully"));
})

const showUser = asyncHandler(async (req, res, next) => {
    const userID = req.params.id;

    const findUser = await db.user.findFirst({
        where: {
            id: Number(userID),
        },
        select:{
            _count:{
                select:{
                    post:true
                }
            }
        }
    });

    if (!findUser) {
        throw new ApiError(404, "User not found", ['provide valid user id'])
    }

    return res.status(200).json(new ApiResponse(200, findUser, "User found successfully"));
})

const showAllUser = async (req, res, next) => {
    const findUser = await db.user.findMany({});
    res.status(201).json(findUser);
};

const updateUser = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const updatedUser = await db.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            name,
            email,
            password,
        },
    });

    res.status(201).json(updatedUser);
});

const deleteUser = async (req, res) => {
    const userID = req.params.id;

    const user = await db.user.delete({
        where: {
            id: Number(userID),
        },
    });

    res
        .status(200)
        .json({ statusCode: 200, message: "User deleted successfully",user });
};

module.exports = {
    createUser,
    showAllUser,
    showUser,
    updateUser,
    deleteUser,
};
