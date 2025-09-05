
import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import connectDB from './database/connectDB.js'
import { ApiError } from './utils/ApiError.js'



const PORT = process.env.PORT || 8000



connectDB()
.then(() => {
    // After connecting database start the app
    app.listen(PORT, () => {
        console.log(`Server started : http://localhost:${PORT}`)
    })
})
.catch((error) => {
    throw new ApiError(500, "MongoDB connection Failed ", error.message)
})
