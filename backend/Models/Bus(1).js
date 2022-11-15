const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//List of columns for Employee Schema
let Bus = new Schema({
    busNumber: {
        type: Number,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    busType: {
        type: String,
        default : 'sleeper',
        required: true
    },
    
    startCity: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    departDate: {
        type: String,
        required: true
    },
    departTime: {
        type: Number,
        required: true
    },
    totalSeats: {
        type: Number,
        default : 30
    },
    availableSeats: {
        type: Number,
        default : 0
    },
    pricePerSeat: {
        type: Number,
        required : true
        
    },
    driver : {
           name  : String,
           phoneNumber : Number
    },
    forEverySeat : {
        type : Array
    }


    
},{collection : 'buses'}
);

module.exports = mongoose.model('Bus',Bus);