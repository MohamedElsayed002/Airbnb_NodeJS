

import express from 'express'
import { createBooking , getUserBooking } from '../controller/booking.js'
import { allowedTo, protectedRoutes } from '../controller/auth.js'

const bookingRouter = express.Router()


bookingRouter.post('/' ,  protectedRoutes , allowedTo('admin','user') ,createBooking)
bookingRouter.get('/' , protectedRoutes , allowedTo('admin','user') ,getUserBooking)


export default bookingRouter