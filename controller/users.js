


import { UserModel } from "../models/user.model.js";



const getAllUsers = async (req,res) => {
    let users = await UserModel.find({}).select('-password')
    res.status(200).json(users)
}



const getSingleUser = async (req,res) => {

    let user = await UserModel.findById({_id : req.params.id}).select('-password')
    if(!user) {
        throw new Error('User not found')
    }
    res.status(200).json(user)

}



export{
    getAllUsers,
    getSingleUser
}