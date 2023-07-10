

import { UserModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken'


const Register = async (req,res) => {
    const {email,password,name} = req.body
    if(!email || !password || !name) {
        throw new Error('please all fields required')
    }
    const user = await UserModel.findOne({email})
    if(user) {
            throw new Error('user already exists')
    }
    const newUser = new UserModel(req.body)
    await newUser.save()
    res.status(201).json({message : "user created successfully" , newUser})
}


const Login = async (req,res) => {
    const {email,password} = req.body
    if(!email ||!password) {
        throw new Error('please all fields required')
    }
    const user = await UserModel.findOne({email})
    if(!user) {
        throw new Error('user does not exist')
    }
    const isMatch = await user.matchPassword(password)
    if(!isMatch) {
        throw new Error('invalid password')
    }

    const token = await  user.CreateToken()

    res.status(200).json({message : "user logged in successfully", user , token})
}



const protectedRoutes = async (req,res,next) => {
    const token = req.headers.Authorization 
    if(!token) {
        throw new Error('please login first')
    }

    let decoded = await jwt.verify(token , process.env.PASSWORD_TOKEN)
    let user = await UserModel.findById({_id : decoded.userId})
    if(!user) {
        throw new Error('invalid token')
    }
    req.user = {name : decoded.name , userId : decoded.userId , email : decoded.email , role: decoded.role}
    next()
}


const allowedTo = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
            throw new Error('invalid role')
        }
        next()
    }
}





export {
    Register,
    Login,
    protectedRoutes,
    allowedTo
}