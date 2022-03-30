const mongoose = require('mongoose')

const siteModel = new mongoose.Schema({
    link: {
        type: String,
        required: [true, 'Please provide the webpage link!'], 
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Site', siteModel);