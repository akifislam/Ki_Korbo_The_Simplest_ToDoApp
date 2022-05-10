PORT = process.env.PORT || 8080;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const TodoList = require("./model/todolistSchema");
//Connecting to MongoDB Database
mongoose
  .connect("mongodb://localhost:27017/todolist", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB !");
    app.listen(PORT, () => {
      console.log("Listening to PORT : ", PORT);
    });
  });

app.get("/todolist", (req, res) => {
  TodoList.find().then((tasklists) => res.send(tasklists));
});

app.post("/todolist", (req, res) => {
  const tasklist = new TodoList(req.body);
  tasklist
    .save()
    .then((tasklist) => res.send(tasklist))
    .catch((err) => console.log("Error Found"));
});

app.delete("/todolist/:id", (req, res) => {
  TodoList.findByIdAndDelete(req.params.id).then((tasklist) =>
    res.send(tasklist)
  );
});
