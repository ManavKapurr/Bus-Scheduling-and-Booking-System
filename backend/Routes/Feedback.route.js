let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let feedbackSchema = require('../models/Feedback')

// user gives a feedback

router.route('/give-feedback').post((req,res,next)=>{
    feedbackSchema.create(req.body,(error,data)=>{
        if(error){
            return next(error)
        } else{
            console.log(data);
            res.json(data)
        }
    })
})
// get user by id
router.route('/view-feedback/:id').get((req,res) =>{
    feedbackSchema.findById(req.params.id,(error,data) =>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
});

// get all feedback for admin

router.route('/').get((req,res) =>{
    feedbackSchema.find((error,data) =>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

// admin updates feedback
router.route('/update-feedback/:id').put((req,res,next) =>{
    feedbackSchema.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },(error,data) =>{
        if(error){
            return next(error);
            
        }else{
            res.json(data);
            console.log('Feedback Updated Successfully')
        }
    })
});

router.route('/getFeedbacksByUser/:id').get(function(req,res){
    let id = req.params.id;
    feedbackSchema.find({userId:id})
    .populate("userId",'-password')
    .then(feedback => {
        res.json(feedback);
    });
});



module.exports = router;