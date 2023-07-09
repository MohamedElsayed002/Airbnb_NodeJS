

import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const UserSchema = mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        enum : ['admin','user'],
        type :String,
        default : 'user'
    }
})

UserSchema.pre('save' , async function () {
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(8)
    this.password = await bcrypt.hashSync(this.password, salt)
})

UserSchema.methods.matchPassword = async function (password) {
    return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.CreateToken = async function () {
    return jwt.sign({name : this.name , userId : this._id , email : this.email , role : this.role} , process.env.PASSWORD_TOKEN )
}

export const UserModel = mongoose.model('user' , UserSchema)