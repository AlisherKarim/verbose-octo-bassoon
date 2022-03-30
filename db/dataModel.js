const mongoose = require('mongoose');

const dataModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },

    eventName: {
        type: String,
        required: true,
    },

    data: {
        type: String
    },
    
    time: {
        type: String,
    }
})

module.exports = mongoose.Model('Data', dataModel);