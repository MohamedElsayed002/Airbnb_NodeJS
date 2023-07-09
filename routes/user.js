

import express from 'express'
import { getAllUsers, getSingleUser } from '../controller/users.js'
import { protectedRoutes } from '../controller/auth.js'



const userRouter = express.Router()


userRouter.get('/' , getAllUsers)
userRouter.get('/getSingleUser/:id'  , protectedRoutes, getSingleUser)



export default userRouter