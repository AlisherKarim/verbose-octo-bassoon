const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect(){
    // console.log(process.env.DB_URL);
    mongoose
        .connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, })
        .then(() => {
            console.log("Successfully connected to the database...");
        }).catch(err => {
            console.log("Unable to connect to the database");
            console.error(err);
        });
}

module.exports = dbConnect;