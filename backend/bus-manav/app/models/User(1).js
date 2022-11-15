const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = require('../config/config');

//List of columns for Employee Schema
let User = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "customer"
    },
    saltSecret: String,

    
},{collection : 'users'}
);

//password encryption using bcryptjs
User.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//verify password
User.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

//jwt token generation
User.methods.generateJwt = function(){
    return jwt.sign({_id:this._id,},
        secret.JWT_SECRET, {expiresIn: secret.JWT_EXP});
}
module.exports = mongoose.model('User',User);