import mongoose from "mongoose";

import { ApiError } from "../utils/ApiError.js"
// import {DB_NAME} from '../constants.js'

import dotenv from 'dotenv'

const dotenvResult = dotenv.config();


if (dotenvResult.error) {
    console.error("FATAL: Error loading .env file:", dotenvResult.error);
    throw new Error("Could not find or load .env file. Please check its location and permissions.");
}


console.log("--- Variables loaded from .env file ---");
console.log(dotenvResult.parsed);
console.log("---------------------------------------");

export default async function connectDB(){
    try {
        
        const databaseUrl = process.env.MONGO_URI;

        if (!databaseUrl) {
            throw new ApiError(500, "MONGO_URI was not found after loading .env file");
        }

        const connectionInstance = await mongoose.connect("mongodb+srv://abhishektiwari03929:ForgotpasswordofMongoDB@cluster0.hswquky.mongodb.net/nexus?retryWrites=true&w=majority");
        console.log(`Database connected ${connectionInstance.connection.host}`);
    } catch (error) {
        // console.log("MongoDB connection error : ", error)
        // // we can also use throw error
        // process.exit(1)

        throw new ApiError(500, "MongoDB connection Error", error)
    }
}