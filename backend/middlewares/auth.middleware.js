import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1]

        // Note: #Removelog
        // console.log(req.cookies)
        console.log(accessToken)

        if(!accessToken){
            throw new ApiError(401, `Unauthorized request`)
        }

        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET)
        // Note : #Removelog
        // console.log(decodedToken)
        console.log(decodedToken)

        const user = await User.findById(decodedToken.id).select('-password')
        // Note : #Removelog
        // console.log(user)

        if(!user){
            throw new ApiError(401, `Invalid access token`)
        }
    
        req.user = user;

        next()
    } catch (error) {
        throw new ApiError(401, error?.message || `Inavlid access token`)
    }

})