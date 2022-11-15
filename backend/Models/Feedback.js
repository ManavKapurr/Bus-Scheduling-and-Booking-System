const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     },
    // Name:{
    //     type: String
    // },
    // Email:{
    //     type: String
    // },
    Feedback:{
        type: String
    },
    Reply:{
        type: String
    },
    Rating: {
        type: String
    }

},{

    collection : 'feedback'
})

module.exports = mongoose.model("Feedback",feedbackSchema)