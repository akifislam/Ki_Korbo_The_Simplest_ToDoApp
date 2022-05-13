// For Personal Use Only

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

//Endpoints 03 : localhost:8080/api/delete (DELETE)
// Made for Database Clearing
router.delete("/", (req, res) => {
  Users.remove({}).then(() => {
    res.send("Deleted");
  });
});

router.get("/", (req, res) => {
  Users.find().then((userlists) => {
    res.send(userlists);
  });
});

module.exports = router;
