
import dotenv from 'dotenv'


import app from './app.js'
import connectDB from './database/connectDB.js'

const PORT = process.env.PORT || 8000

connectDB()
.then(() => {
    // After connecting database start the app
    app.listen(PORT, () => {
        console.log(`Server started : http://localhost:${PORT}`)
    })
})
.catch((error) => {
    console.log(`Something went wrong`)
})
