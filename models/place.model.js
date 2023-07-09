

import mongoose from 'mongoose'


const PlaceSchema = mongoose.Schema({
    owner : { 
        type : mongoose.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    title : {
        type : String,
        required : [true , 'title required']
    },
    address : {
        type : String,
        required : [true, 'address required']
    },
    photos: [String],
    description : {
        type : String,
        required : [true, 'description required']
    },
    perks : [String],
    extraInfo : String,
    checkIn : Number,
    checkOut : Number,
    maxGuests : {
        type :Number,
        min : 0,
        default : 1
    },
    price : {
        type : Number,
        min : 0,
    },
})


export const PlaceModel = mongoose.model('place' , PlaceSchema)
