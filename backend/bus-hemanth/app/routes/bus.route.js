const express = require('express')
const app = express();
const busRoute = express.Router();
// Bus Model

let Bus = require('../models/bus.model')

//Add Bus

busRoute.route('/create').post((req,res,next)=>{
    Bus.create(req.body, (error, data) => {
        if (error) {
        return next(error)
        } else {
        res.json(data)
        }
})
})
// get all bus

busRoute.route('/').get((req, res) => {
    Bus.find((error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    }
    })
   })
// Get single bus
busRoute.route('/read/:id').get((req, res) => {
    Bus.findById(req.params.id, (error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    }
    })
   })

//    busRoute.route('/read/:idd').get((req, res) => {
//     Bus.findById(req.params.idd, (error, data) => {
//     if (error) {
//      console.log(error)
//     } else {
//     res.json(data)
//     }
//     })
//    })
   
   module.exports=busRoute