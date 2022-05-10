import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import InputTask from "./components/InputTask";

function App() {
  //States
  const [todolists, settodolist] = useState([]);

  const [currentInput, setCurrentInput] = useState("");
  const [check, setcheck] = useState(false);
  //API Data Fetching from MongoDB
  const fetchItems = () => {};

  const updateTaskBoard = () => {
    fetch("/todolist").then((res) => {
      console.log(res);
      res.json().then((data) => {
        console.log(data);
        settodolist(data);
      });
    });
  };

  // Initaial Call
  useEffect(() => {
    updateTaskBoard();
  }, []);

  //Input Field Handler
  const handleInput = (e) => {
    setCurrentInput(e.target.value);
    console.log(currentInput);
  };

  //Task Add Handler
  const handleAdd = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: currentInput }),
    };

    fetch("/todolist", requestOptions).then(() => {
      updateTaskBoard();
    });
    console.log("Added : ", requestOptions.body);
    setCurrentInput("");
  };

  //Delete / Complete Task Handler
  const handleDelete = (id) => {
    console.log("Deleting ID : ", id);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/todolist/" + id, requestOptions).then(() => {
      updateTaskBoard();
    });
  };

  //Rendering UI
  return (
    <div className="App">
      <h1>
        Ki Korbo? - A Simple To Do App
        <small className="text-muted">
          <h6>Made with React by Akif Islam </h6>
        </small>
      </h1>
      <br></br>

      <ul className="list-group">
        {todolists.map((todo) => (
          <li class="list-group-item">
            <input
              className="form-check-input me-1"
              type="checkbox"
              value=""
              aria-label="..."
              checked={check}
              onChange={() => {
                console.log("Checkbox Clicked of id : ", todo);
                handleDelete(todo._id);
              }}
            ></input>
            {todo.task}
          </li>
        ))}
      </ul>

      <InputTask onInput={handleInput} onAdd={handleAdd} />
    </div>
  );
}

export default App;
