

import { PlaceModel } from "../models/place.model.js";



const createPlace = async (req,res) => {
    req.body.owner = req.user.userId
    const place= new PlaceModel(req.body)
    await place.save()
    res.status(201).json({message : "place saved successfully" , place})
}


const userPlaces = async (req,res) => {
    const places = await PlaceModel.find({owner : req.user.userId})
    res.status(200).json({places})
}

const getAllPlaces = async (req,res) => {
    const places = await PlaceModel.find()
    res.status(200).json({places})
}


const getSinglePlace = async (req,res) => {
    const place = await PlaceModel.findById(req.params.id)
    if(!place) {
        throw new Error('place not found')
    }
    res.status(200).json({place})
}

const updatePlace = async (req,res) => {
    const place = await PlaceModel.findByIdAndUpdate(req.params.id , req.body , {new : true})
    if(!place) {
        throw new Error('place not found')
    }
    res.status(201).json({message : "place updated successfully" , place})
}



export {
    createPlace,
    userPlaces,
    getSinglePlace,
    getAllPlaces,
    updatePlace
}