// This Route will only be called when the user is logged in
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

var userName = "";
var userID = "";

function Posts() {
  const [todolist, setTodolist] = useState([{}]);
  const [currentInput, setCurrentInput] = useState("");
  const [check, setcheck] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (taskID) => {
    const newID = todolist.length + 1;
    const newTodo = todolist.filter((task) => task.id !== taskID);
    setTodolist(newTodo);
    setCurrentInput("");

    fetch("http://localhost:8080/api/todolist/" + userID + "/" + taskID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      console.log("Deleted Successfully");
    });
  };

  const handleAdd = (id) => {
    const newID = todolist.length + 1;
    const newTodo = [...todolist, { id: newID, task: currentInput }];

    setTodolist(newTodo);
    setCurrentInput("");

    fetch("http://localhost:8080/api/todolist/" + userID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        todolist: newTodo,
      }),
    }).then(() => {});
  };

  const getTodoList = (id) => {
    console.log(id);
    const todolistURL = "http://localhost:8080/api/todolist/" + String(id);
    console.log("Todolist URL : " + todolistURL);
    fetch(todolistURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodolist(data.todolist);
      })
      .catch((err) => {
        console.log("Error" + err);
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    fetch("http://localhost:8080/posts", {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isTokenOK) {
          userName = data.name;
          userID = data.id;
          console.log("Logged in As  : " + userName);
          getTodoList(data.id);
          navigate("/posts");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("Error" + err);
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <h1>
        Ki Korbo? - A Simple To Do App
        <small className="text-muted">
          <h6>Made with React by Akif Islam </h6>
        </small>
      </h1>
      <br></br>
      <h6> Welcome {userName}</h6>
      <ul className="list-group">
        {todolist.map((todo) => (
          <li class="list-group-item">
            <input
              className="form-check-input me-1"
              type="checkbox"
              value=""
              aria-label="..."
              checked={check}
              onChange={() => {
                console.log("Checkbox Clicked of id : ", todo.id);
                handleDelete(todo.id);
              }}
            ></input>
            {todo.task}
          </li>
        ))}
      </ul>
      <div class="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task to do"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          onChange={(e) => setCurrentInput(e.target.value)}
        ></input>
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Posts;
