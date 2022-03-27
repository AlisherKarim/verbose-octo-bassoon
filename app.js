const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require('./db/dbConnect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./db/userModel');

const auth = require('./auth');

dbConnect();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.get("/easy", (req, res) => {
  res.json({
    message: "You are looking page where login is not needed"
  })
})

app.get("/admin", auth, (req, res) => {
  res.json({
    message: "You are looking admin page"
  })
})


app.post("/register", (req, res) => {
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
      })
      newUser
        .save()
        .then((result) => {
          res.status(201).send({
            message: "User successfully was created!",
            result
          })
        })
        .catch(err => {
          console.error(err);
          res.status(500).send({
            message: "Couldn't save the user to the database..."
          })
        });
    })
    .catch(err => {
      console.log("Something went wrong during hashing...");
      console.error(err);
      res.status(500).send({
        message: "Something went wrong during hashing..."
      })
    })
})

app.post('/login', (req, res) => {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if(!passwordCheck){
            return res.status(400).send({
              message: "Passwords do not match!!",
              error
            })
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email
            },
            "RANDOM_TOKEN",
            { expiresIn: "1h" }
          );

          res.status(200).send({
            message: "Login Successful!",
            email: user.email,
            token,
          })

        })
        .catch(err => {
          res.status(400).send({
            message: "Passwords do not match!",
            err
          })
        })

    })
    .catch(err => {
      res.status(404).send({
        message: 'Email not found',
        err
      })
    })
})


module.exports = app;
