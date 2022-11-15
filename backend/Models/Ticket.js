const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//List of columns for ticket Schema
let Ticket = new Schema({
   
    userId: {
        type: String,
        ref: "User"
     },
    
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus"
     },
   
    ForEverySelectedSeat : {
        type : Array
    }
   
     

},{collection : 'tickets'},{timestamps:true}
);

module.exports = mongoose.model('Ticket',Ticket);