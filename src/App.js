import { useState } from "react";
import "./App.css";

function App() {
  const [todolists, settodolist] = useState([
    "Morning Walk at 6am",
    "Exercise at 8am",
    "Eat breakfast at 9am",
  ]);
  const [currentInput, setCurrentInput] = useState("");

  return (
    <div className="App">
      <h1>
        Ki Korbo? - A Simple To Do App
        <small class="text-muted">
          <h6>Made with React by Akif Islam </h6>
        </small>
      </h1>
      <br></br>

      <ul class="list-group list-group-flush">
        {todolists.map((todo) => (
          <li class="list-group-item">{todo}</li>
        ))}
      </ul>

      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Enter a task to do"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          onChange={(e) => setCurrentInput(e.target.value)}
        ></input>
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={(e) => {
            e.preventDefault();
            settodolist([...todolists, currentInput]);
            setCurrentInput("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
