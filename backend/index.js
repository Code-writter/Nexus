
import dotenv from 'dotenv'


import app from './app.js'
import connectDB from './database/connectDB.js'
import { ApiError } from './utils/ApiError.js'

import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './env') });


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
