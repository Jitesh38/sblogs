const db = require("../db/db.config");
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const { encryptPassword, decryptPassword } = require('../db/db.password');
const fs = require('fs');
// create user
const createUser = asyncHandler(async (req, res, next) => {
    const { username, fullname, email, password, avatar } = req.body;

    // console.log(req.body);

    const findUser = await db.user.findUnique({
        where: {
            email: email,
        }
    });

    if (findUser) {
        throw new ApiError(400, 'Please enter a valid email address', ['EmailID already exist ']);
    }
    let encryptedPassword = await encryptPassword(password);

    const user = await db.user.create({
        data: {
            username: username,
            fullname: fullname,
            email: email,
            password: encryptedPassword,
            avatar: req?.file?.filename
        },
    });

    if (!user) {
        throw new ApiError(400, 'Something went wrong!')
    }

    res.status(201).json(new ApiResponse(201, user, "User created successfully"));
})

const showUser = asyncHandler(async (req, res, next) => {
    const username = req.params.uname;

    const findUser = await db.user.findFirst({
        where: {
            username:username
        }
    });

    const post = await db.post.findMany({
        where:{
            user:findUser
        }
    })

    if (!findUser) {
        throw new ApiError(404, "User not found", ['provide valid user id'])
    }

    return res.status(200).json(new ApiResponse(200, {...findUser,post}, "User found successfully"));
})

const currentUser = asyncHandler(async (req, res, next) => {
    res.status(200).json(new ApiResponse(200, req.user, 'User fetched successfully.'));
});

const updateUser = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const { username, email, fullname } = req.body;
    let updatedUser
    if (req.file) {
        fs.unlink(`./public/temp/${req?.user?.avatar}`, (err) => {
            if (err) console.log('error while deleting');
            console.log('File deleted successfully');
        })
        updatedUser = await db.user.update({
            where: {
                id: Number(req.user.id),
            },
            data: {
                username,
                fullname,
                email,
                avatar: req.file.filename,
            },
        });
        console.log(updatedUser);
    }
    else {
        updatedUser = await db.user.update({
            where: {
                id: Number(req.user.id),
            },
            data: {
                username,
                fullname,
                email,
            },
        });
    }
    res.status(201).json(new ApiResponse(201, updatedUser, 'Updated successfully'));
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
        .json({ statusCode: 200, message: "User deleted successfully", user });
};


const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await db.user.findFirst({
        where: {
            email
        }
    })
    let checkPassword = await decryptPassword(password, user.password);
    if (!checkPassword) {
        throw new ApiError(400, 'Please enter correct password');
    }
    let accessToken = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.ACESS_TOKEN_SECRET, {
        expiresIn: process.env.ACESS_TOKEN_EXPIRY
    });
    const options = {
        httpOnly: true,
        secure: false
    }
    return res
        .cookie('accessToken', accessToken, options)
        .json(new ApiResponse(200, { accessToken }, 'Login successfully'))

})

const logoutUser = asyncHandler(async (req, res, next) => {
    const options = {
        httpOnly: true,
        secure: false
    }
    return res
        .clearCookie('accessToken', options)
        .json(new ApiResponse(200, {}, 'Logout successfully'))

})

module.exports = {
    createUser,
    currentUser,
    showUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser
};
