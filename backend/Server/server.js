//import required packages
const bodyParser = require('body-parser');
const express = require('express');
const app=express();
const path = require('path');
const cors = require('cors');
const mongoose =require('mongoose');

//passport
const passport = require('passport');
app.use(passport.initialize());
require('../config/passportConfig');


//MongoDB  url
var mongoDatabase = 'mongodb://localhost:27017';


//create  express server

mongoose.Promise = global.Promise;

//connect to MongoDB Database
mongoose.connect(mongoDatabase,{useNewUrlParser:true}).then(
    () =>{
        console.log('Database is connected')
    },
    err=>{
        console.log('Could not connect to database')
    }
);

//All the express routes
const userRoutes = require('../Routes/User.route');
const busRoutes = require('../bus-manav/app/routes/Bus');
const ticketRoutes = require('../Routes/Ticket.route');
const feedbackRoutes = require('../Routes/Feedback.route'); 

//Convert incoming data to JSON Format
app.use(bodyParser.json());

//Enabled CORS
app.use(cors());

//setup for the server port number
const port = process.env.PORT || 4000;

//Routes configuration
app.use('/users',userRoutes);
app.use('/buses',busRoutes);
app.use('/tickets',ticketRoutes);
app.use('/feedbacks',feedbackRoutes);

//Start our express server
const server=app.listen(port,function(){
    console.log("Server is listening to port : "+port);
});
