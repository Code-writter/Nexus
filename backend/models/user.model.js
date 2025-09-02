import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        email:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName:{
            type:String,
            required: true,
            trim: true,
            index: true,
        },
        events :[
            {
                type: Schema.Types.ObjectId,
                ref: "Event" 
            }
        ],
        password:{
            type: String,
            required: [true, "password is required"]
        },
        refreshToken:{
            type: String
        }
    },
    {
        timestamps: true,
    }
)
// before saving encryption
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


// Method to check the password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// Method to genrate the access token for the user 
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        
        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Method to generate the refresh token 
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)