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

router.get("/:userID", (req, res) => {
  Users.find({ _id: req.params.userID })
    .then((user) => {
      res.json({ name: user[0].name, todolist: user[0].todolist });
    })
    .catch((err) => res.json(err));
});

// It will update the todolist with new todos
router.put("/:userID", (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.params.userID },
    { todolist: req.body.todolist }
  )
    .then((user) => {
      console.log("Updated :" + user.todolist);
      res.send(user);
    })
    .catch((err) => console.log(err));
});

// It will delete the todolist
router.delete("/:userID/:taskid", (req, res) => {
  Users.find({ _id: req.params.userID }).then((user) => {
    const previousTodolist = user[0].todolist;

    const newTodolist = previousTodolist.filter(
      (task) => task.id != req.params.taskid
    );
    Users.findOneAndUpdate(
      { _id: req.params.userID },
      { todolist: newTodolist }
    ).then((user) => res.send(user.todolist));
  });
});

module.exports = router;
