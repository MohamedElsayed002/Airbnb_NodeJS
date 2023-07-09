

import express from 'express'
import { createPlace , userPlaces , getSinglePlace , getAllPlaces , updatePlace } from '../controller/place.js'
import { protectedRoutes , allowedTo } from '../controller/auth.js'

const placeRouter = express.Router()


placeRouter.post('/' ,  protectedRoutes , allowedTo('admin' , 'user'),createPlace)
placeRouter.get('/userPlaces' , protectedRoutes , allowedTo('admin' , 'user'), userPlaces)
placeRouter.get('/allPlaces' , getAllPlaces)
placeRouter.get('/:id' , getSinglePlace)
placeRouter.put('/:id' , protectedRoutes , allowedTo('admin','user'), updatePlace)


export default placeRouter