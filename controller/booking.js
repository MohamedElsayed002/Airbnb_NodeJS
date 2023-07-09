

import { BookingModel } from "../models/booking.js";
import { PlaceModel } from "../models/place.model.js";


const createBooking = async (req,res) => {
    req.body.user = req.user.userId
    let checkPlace = await PlaceModel.findById({_id : req.body.place})
    if(!checkPlace) {
        throw new Error('place not found')
    }
    const booking = await BookingModel(req.body)
    await booking.save()
    res.status(201).json({message : "booking saved successfully" ,booking})
}


const getUserBooking = async (req,res) => {
    let places = await BookingModel.find({user : req.user.userId})
    res.status(200).json({places})
}


export {
    createBooking,
    getUserBooking
}