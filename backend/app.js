import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

const allowedOrigings = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://nexus-zeta-ruby.vercel.app"
]

app.use(cors({
    origin: allowedOrigings,
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

// Health check 

app.get("/health", (req,res) => {
    res.status(200).json({
        message : "Server health is good : )"
    })
})



// Backend Routes
import userRoutes from './routes/user.routes.js'
import pollRoutes from './routes/poll.routes.js'

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/poll', pollRoutes)



export default app