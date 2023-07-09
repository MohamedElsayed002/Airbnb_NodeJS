

import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import { dbConnection } from './database/dbConnection.js'
import {notFound} from './middleware/middlewareNotFound.js'
import {errorHandlerMiddleware} from './middleware/error-handler.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import placeRouter from './routes/place.js'
import bookingRouter from './routes/booking.js'

const app = express()
dbConnection()
app.use(express.json())
app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/users' , userRouter)
app.use('/api/v1/places' , placeRouter)
app.use('/api/v1/booking' , bookingRouter)



app.get('/' , (req,res) => {
    res.send('Welcome sir')
})

app.use(notFound)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})