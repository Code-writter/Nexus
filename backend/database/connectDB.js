import mongoose from "mongoose";

import { ApiError } from "../utils/ApiError.js"
// import {DB_NAME} from '../constants.js'


export default async function connectDB(){
    try {
        
        const databaseUrl = process.env.MONGO_URI;

        if (!databaseUrl) {
            throw new ApiError(500, "MONGO_URI was not found after loading .env file");
        }

        const connectionInstance = await mongoose.connect(databaseUrl);
        console.log(`Database connected ${connectionInstance.connection.host}`);

    } catch (error) {
        // console.log("MongoDB connection error : ", error)
        // // we can also use throw error
        // process.exit(1)

        throw new ApiError(500, "MongoDB connection Error", error)
    }
}