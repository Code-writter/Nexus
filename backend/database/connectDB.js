import mongoose from "mongoose";
import {config} from 'dotenv'

config()

export default async function connectDB(){
    try {
        
        const databaseUrl = process.env.MONGODB_URI
        const appName = process.env.APP_NAME
        const connectionInstance = await mongoose.connect(`${databaseUrl}${appName}`)

        console.log(`Database connected ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}