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



const handleUsers = asyncHandler( async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})



export {
    handleUsers,
    handleRegisterUser
}