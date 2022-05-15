// Step 1 : Authentication with MongoDB (without Any Salt, JWT, etc). Just Simple Plain text POST compared to DB.
// Step 2 : Fix Login & Register Error Handling (like Duplicate User, etc) & password Encryption
// Step 3 : Adding JWT (JSON Web Token)
// Step 4 : Adding React to Frontend
require("dotenv/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRoute = require("./routes/authentication");
const todolistRoute = require("./routes/todolist");
const logger = require("morgan");
secret = process.env.SECRET;

const path = require("path");
const app = express();

PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use(logger("tiny"));
// Models
const Users = require("./models/userSchema");
//Database Connection
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });

    if (process.env.NODE_ENV === "production") {
      app.use(express.static("clients/build"));

      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "clients", "build", "index.html"));
      });
    }
  })
  .catch((err) => {
    console.log("Database Connection Failed");
  });

app.use("/api/auth", authRoute);
app.use("/api/todolist", todolistRoute);
