// Necessary Datas (PORTS, SECRET for JWT)
PORT = 8080 || process.env.PORT;
secret = "doradorafedoradoraakifdoradora";

// Imports
const router = require("express").Router();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postRoute = require("../routes/posts");

// Models
const Users = require("../models/userSchema");

//Endpoints 01 : localhost:8080/api/auth/register (POST)
router.post("/register", (req, res) => {
  //Checking if the user already exists
  Users.findOne({ email: req.body.email }).then((user) => {
    if (user) res.send("User Already Exists");
    else {
      //Hashing Password
      bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(req.body.password, salt).then((hashedPassword) => {
          console.log("Hashed Password is : " + hashedPassword);
          //Creating a new user
          const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            todolist: req.body.todolist,
          });
          user
            .save()
            .then(() => {
              res.send(user);
            })
            .catch((err) => {
              res.send(err);
            });
        });
      });
    }
  });
});

//Endpoints 02 : localhost:8080/api/auth/login (POST)
router.post("/login", (req, res) => {
  console.log(req.body);
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (result) {
            //Create and Assign a JWT Token
            const token = jwt.sign({ _id: user._id }, "secret");
            res
              .header("x-auth-token", token)
              .json({ token: token, user: user, hasAccess: true });
          } else {
            res.send({ token: "invalid", user: user, hasAccess: false });
          }
        });
      } else {
        res.json({ token: "invalid", user: user, hasAccess: false });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
