

import mongoose from 'mongoose'


const BookingSchema = mongoose.Schema({
    place : {
        type : mongoose.Types.ObjectId,
        ref : 'place',
        required : [true , 'place required'],
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'user',
        required : [true, 'user required'],
    },
    checkIn : {
        type : Date,
        required : [true , 'checkIn required'],
    },
    checkOut : {
        type :Date,
        required : [true, 'checkOut required'],
    },
    name :{
        type : String,
                required : [true, 'name required'],
    },
    phone :{
        type: String,
        required : [true, 'phone required'],
    },
    price: Number,
})

export const BookingModel = mongoose.model('booking' , BookingSchema)