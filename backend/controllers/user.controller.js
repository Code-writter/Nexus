import { asyncHandler } from '../utils/AsyncHandler.js'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, `Something went wrong while generating refresh and access token ${error}`)
    }
}

const generateAccessToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {
            expiresIn : "1h"
        }
    )
}

const handleRegisterUser = asyncHandler( async (req, res) => {
    // get uses details from frontend
    const {name, email, password} = req.body;

    // Now validate if they come or not
    if(
        [name, email, password].some((field) => field?.trim() === "" )
    ){
        throw new ApiError(400, "All fields are required")
    }

    // check for the existing user in the database

    const existingUser = await User.findOne({email})

    if(existingUser)
        throw new ApiError(400, "User with the email already exists")


    // create the user 
    const user = await User.create({
        email,
        name,
        password,
        polls : [],
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser)
        throw new ApiError(500, `Something went wrong while registering the user`)


    // User have been saved
    return res
    .status(200)
    .json({
        id : createdUser._id,
        user : {
            ...createdUser.toObject(),
            totalPollsCreated : 0,
            totalPollsVoted : 0,
            totalPollsBookmarked : 0
        },
        token : generateAccessToken(createdUser._id)
    })
})

const handleLoginUser = asyncHandler( async (req, res) => {
    // get data
    const {email, password} = req.body;

    // check for the value
    if(
        [email, password].some((field) => field.trim() === "" )
    ){
        throw new ApiError(409, "Email and password is required")
    }

    // Find the user
    const user = await User.findOne({email})

    if(!user)
        throw new ApiError(404, "User doesn't exists with this email")

    // Now check if the password is correct or not

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid)
        throw new ApiError(401, "Invalid User Credentials")


    // Modify the access token and refresh token

    // const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const cookieOptions = {
        httpOnly: true,
        secure: true
    }

    // Return the response and the cookies
    return res
    // .status(200)
    // .cookie("accessToken", accessToken, cookieOptions)
    // .cookie("refreshToken", refreshToken, cookieOptions)
    // .send(
    //     new ApiResponse(
    //         200,
    //         {
    //             user : loggedInUser, accessToken, refreshToken
    //         },
    //         "User logged In successfully"
    //     )
    // )
    .status(200)
    .json({
        id : loggedInUser._id,
        user : {
            ...loggedInUser.toObject(),
            totalPollsCreated : 0,
            totalPollsVoted : 0,
            totalPollsBookmarked : 0
        },
        token : generateAccessToken(loggedInUser._id)
    })
})


const handleUserInformation = asyncHandler( async (req, res) => {
    const id = req.user.id;

    if(!id){
        throw new ApiError(404, "UnAuthorized")
    }

    // Find in the data base
    const getUser = await User.findById({ _id : id })

    if(!getUser)
        throw new ApiError(404, "User not found ")

    const details = await User.findById(getUser._id).select("-password -refreshToken")

    if(!details)
        throw new ApiError(500, "Something went wrong while feating the details")
    
    return res
    .status(200)
    .json({
        id : details._id,
        user : {
            ...details.toObject(),
            totalPollsCreated : 0,
            totalPollsVoted : 0,
            totalPollsBookmarked : 0
        },
    })

})


const getCurrentUser = asyncHandler(async(req, res, next) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            'current user fetched successfully'
        )
    )
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, 'Unauthorized request')
    }

    try {
        const decodedToken = Jwt.verify(
            incomingRefreshToken, 
            process.env.REFRESH_TOKEN_SECRET,
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, 'Invalid refresh token')
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, 'Refresh token is expired or used')
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, NewrefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', NewrefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: NewrefreshToken},
                'Access Token refreshed '
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid refresh token')
    }
})

const isAuthenticated = asyncHandler(async(req, res) => {
    try {
        return res.status(200).json({success : true})
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid refresh token')
    }
})  

export {
    handleUserInformation,
    handleRegisterUser,
    handleLoginUser,
    getCurrentUser,
    refreshAccessToken,
    isAuthenticated
}