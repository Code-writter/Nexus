import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGION,
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit:"16kb"
}))

// To store the static data
app.use(express.static("public"))
// for the cookies
app.use(cookieParser())

// Backend Routes
import userRoutes from './routes/user.routes.js'

app.use('/api/v1/user', userRoutes)



export default app