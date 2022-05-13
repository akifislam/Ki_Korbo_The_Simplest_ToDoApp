// Step 1 : Authentication with MongoDB (without Any Salt, JWT, etc). Just Simple Plain text POST compared to DB.
// Step 2 : Fix Login & Register Error Handling (like Duplicate User, etc) & password Encryption
// Step 3 : Adding JWT (JSON Web Token)
// Step 4 : Adding React to Frontend

PORT = 8080 || process.env.PORT;
secret = "doradorafedoradoraakifdoradora";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/authentication");
const userRoute = require("./routes/userdata");
const todolistRoute = require("./routes/todolist");
const logger = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger("tiny"));
// Models
const Users = require("./models/userSchema");
//Database Connection
mongoose
  .connect("mongodb://localhost/TestAuthentication", { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  });

app.use("/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/todolist", todolistRoute);
