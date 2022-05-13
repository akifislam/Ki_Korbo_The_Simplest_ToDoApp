//Middleware Function
const jwt = require("jsonwebtoken");
secret = "doradorafedoradoraakifdoradora";
const mongoose = require("mongoose");
const Users = require("../models/userSchema");

module.exports = function (req, res, next) {
  console.log("Verifying Token");
  const token = req.header("x-auth-token");
  console.log(token);
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const verified = jwt.verify(token, "secret"); // verified contains id
    req.user = verified;
    console.log("Token Verified");
    res.setHeader("Content-Type", "application/json");
    Users.find({ _id: verified._id }).then((data) => {
      res.json({ id: data[0]._id, isTokenOK: true, name: data[0].name });
    });
  } catch (err) {
    console.log("Error");
    res.status(404).json({ isTokenOK: false });
  }
};
