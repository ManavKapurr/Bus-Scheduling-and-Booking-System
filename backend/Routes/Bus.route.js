const express = require('express')

//importing 
const app=express();
const busRoute = express.Router();

//bus module which is required and imported
let busModel = require('../Models/Bus');

//To get list of buses
busRoute.route('/').get(function(req,res){
    busModel.find(function(err,bus){
        if(err){
            console.log(err);
        } 
        else{
            res.json(bus);
        }
    });
});

//To add new bus
busRoute.route('/addBus').post(function(req,res){
    let bus =new busModel(req.body);
    bus.save()
             .then(result=>{
               
                  res.status(200).json({'bus' : 'bus added successfully'}) 

             })
             .catch(err=>{
                res.status(400).send("Something went wrong")
             });
});

//To get bus details by id
busRoute.route('/editBus/:id').get(function(req,res){
    let id=req.params.id;
    busModel.findById(id,function(err,bus){
        res.json(bus);
    });
});

//To update the bus details
busRoute.route('/updateBus/:id').post(function(req,res){
    busModel.findById(req.params.id,function(err,bus){
       if(!bus){
        return next(new Error('Unable to find bus with thisid'))
       }else{
         bus.busNumber=req.body.busNumber;
         bus.companyName=req.body.companyName; 
         bus.busType=req.body.busType;
         bus.startCity=req.body.startCity;
         bus.destination=req.body.destination;
         bus.departDate=req.body.departDate;
         bus.departTime=req.body.departTime;
         bus.totalSeats=req.body.totalSeats;
         bus.availableSeats=req.body.availableSeats;
         bus.pricePerSeat=req.body.pricePerSeat;
         bus.driver=req.body.driver;
         bus.forEverySeat=req.body.forEverySeat;

         bus.save().then(cus=>{
            res.json("bus updated successfully");
         }).catch(err=>{
              res.status(400).send("Unable to update bus");
            })
       }

    });
});

//deleting bus
busRoute.route('/deleteBus/:id').delete(function(req,res){
    busModel.findByIdAndRemove({_id:req.params.id},function(err,bus){
        if(err){
            res.json(err)
        }else{
            res.json("bus deleted successfully");
        }
    })
})


module.exports = busRoute;