import { useState } from "react";
import "./App.css";
import InputTask from "./components/InputTask";

function App() {
  //States
  const [todolists, settodolist] = useState([
    "Morning Walk at 6am",
    "Exercise at 8am",
    "Eat breakfast at 9am",
  ]);
  const [currentInput, setCurrentInput] = useState("");

  //Handler
  const handleInput = (e) => {
    console.log("Handle Input Called");
    setCurrentInput(e.target.value);
  };
  const handleAdd = () => {
    console.log("Handle Add Called");
    if (currentInput.length > 0) {
      settodolist([...todolists, currentInput]);
    }
    setCurrentInput("");
  };

  //Rendering UI
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

      <InputTask onInput={handleInput} onAdd={handleAdd} />
    </div>
  );
}

export default App;
