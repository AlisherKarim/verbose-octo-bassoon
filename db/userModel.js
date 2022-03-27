const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide Email address'],
        unique: [true, 'Email Exists']
    },

    password: {
        type: String, 
        required: [true, 'Please Provide password'],
        unique: false
    }
})

module.exports = mongoose.model("Users", userSchema);