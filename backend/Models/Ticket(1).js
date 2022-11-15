const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//List of columns for ticket Schema
let Ticket = new Schema({
   
    userId: {
        type: String,
        required: true,
        default: ''
    },
    
    busId: {
        type: String,
        required: true,
        default: ''
    },
   
    ForEverySelectedSeat : {
        type : Array
    }
   
     

},{collection : 'tickets'},{timestamps:true}
);

module.exports = mongoose.model('Ticket',Ticket);