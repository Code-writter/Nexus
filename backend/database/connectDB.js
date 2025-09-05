import mongoose from "mongoose";
import {config} from 'dotenv'
import { ApiError } from "../utils/ApiError.js"
import {DB_NAME} from '../constants.js'


// .env config
config()


export default async function connectDB(){
    try {
        
        const databaseUrl = process.env.MONGO_URI
        console.log(databaseUrl)
        const connectionInstance = await mongoose.connect(databaseUrl)

        console.log(`Database connected ${connectionInstance.connection.host}`)
    } catch (error) {
        // console.log("MongoDB connection error : ", error)
        // // we can also use throw error
        // process.exit(1)

        throw new ApiError(500, "MongoDB connection Error", error)
    }
}