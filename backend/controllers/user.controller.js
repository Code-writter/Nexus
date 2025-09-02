import { asyncHandler } from '../utils/AsyncHandler.js'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from "../utils/ApiResponse.js"

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

const handleRegisterUser = asyncHandler( async (req, res) => {
    // get uses details from frontend
    const {fullName, email, password} = req.body;

    // Now validate if they come or not
    if(
        [fullName, email, password].some((field) => field?.trim() === "" )
    ){
        throw new ApiError(400, "All fields are required")
    }

    // check for the existing user in the database

    const existingUser = await User.findOne({email})

    if(existingUser)
        throw new ApiError(409, "User with the email already exists")


    // create the user 
    const user = await User.create({
        email,
        fullName,
        password,
        events : [],
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser)
        throw new ApiError(500, `Something went wrong while registering the user`)


    // User have been saved
    return res.status(200).json(
        new ApiResponse(200, createdUser, "User created sucessfully")
    )
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

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const cookieOptions = {
        httpOnly: true,
        secure: true
    }

    // Return the response and the cookies
    return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .send(
        new ApiResponse(
            200,
            {
                user : loggedInUser, accessToken, refreshToken
            },
            "User logged In successfully"
        )
    )
})


const handleUserInformation = asyncHandler( async (req, res) => {
    const id = req.user._id;

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
    .json(
        new ApiResponse(
            200,
            {
                user : details
            },
            "User details"
        )
    )
})



export {
    handleUserInformation,
    handleRegisterUser,
    handleLoginUser,
}