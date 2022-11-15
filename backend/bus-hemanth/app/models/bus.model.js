const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let Bus = new Schema({
    id:{
        type:Number
    },
    Bus_Name:{
        type:String
    },
    Departure_Time:{
        type:String
    },
    Coach_Type:{
        type:String
    },
    Fare:{
        type: Number
    },
    Seats_Available:{
        type:Number
    } 

},{collection: 'Bus'})

module.exports=mongoose.model('Bus',Bus)
// [key: string]: string | any;
//   'id': number;
//   'Bus Name': string;
//   'Departure Time': string;
//   'Source': string;
//   'Destination': string;
//   'Fare': number;
//   'Coach Type': string;
//   'Seats Available': number;
//   'bookings': any;
// }