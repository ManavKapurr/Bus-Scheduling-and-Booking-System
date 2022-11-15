const express = require('express')

//importing 
const app=express();
const userRoute = express.Router();
const jwtHelper = require('../config/jwtHelper');
const passport = require('passport');
const _ = require('lodash');

//User module which is required and imported
let userModel = require('../Models/User');

//To get list of all users(only for admin)
userRoute.route('/getAllUsers').get(function(req,res){
    userModel.find(function(err,user){
        if(err){
            console.log(err);
        } 
        else{
            res.json(user);
        }
    });
});

//To add new user
userRoute.route('/addUser').post(function(req,res){
    let user =new userModel(req.body);
    user.save()
             .then(result=>{
               
                  res.status(200).json({'user' : 'User added successfully'}) 

             })
             .catch(err=>{
                res.status(400).send("Something went wrong")
             });
});

//To get user details by id
userRoute.route('/getUser/:id').get(function(req,res){
    let id=req.params.id;
    userModel.findById(id,function(err,user){
        res.json(user);
    });
});

//To update the user details
var update = async(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"Data to update connot be empty",
        });
    }
const id = req.params.id;
await userModel.findByIdAndUpdate(id, req.body,{userFindAndModify:false,})
.then((data)=>{
    if(!data){
        res.status(404).send({message:"Customer not found"});
    }else{
        res.send({message:"Customer updated successfully"});
    }

})
.catch((err)=>{
    res.status(500).send({
        message:err.message,
    });
});
};
userRoute.patch('/updateUser/:id', update)

//deleting user
userRoute.route('/deleteUser/:id').delete(function(req,res){
    userModel.findByIdAndRemove({_id:req.params.id},function(err,user){
        if(err){
            res.json(err)
        }else{
            res.json("User deleted successfully");
        }
    })
})

//authentication
var authenticate = (req,res,next)=>{
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            return res.status(400).json(err);
        }
        else if(user){
            const token=user.generateJwt();

            return res.status(200).json(user);
        }
        else{
            return res.status(404).json(info);
        }
    })(req,res);
}
userRoute.post('/authenticate', authenticate)





module.exports = userRoute;
