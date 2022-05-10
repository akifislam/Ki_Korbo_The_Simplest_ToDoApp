import { useState } from "react";
import "./App.css";
import InputTask from "./components/InputTask";

function App() {
  //States
  const [todolists, settodolist] = useState([
    { id: 1, task: "Ruhul Bhai er sathe Bhaat Khabo" },
    { id: 2, task: "Bondhu der sathe Adda Dibo" },
    { id: 3, task: "Taposhi Rabeyar Shamne Ful niye Wait korbo" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [check, setcheck] = useState(false);

  //Input Field Handler
  const handleInput = (e) => {
    setCurrentInput(e.target.value);
    console.log(currentInput);
  };

  //Task Add Handler
  const handleAdd = () => {
    console.log("Handle Add Called");
    const newID = todolists.length + 1;
    if (currentInput.length > 0) {
      settodolist([...todolists, { id: { newID }, task: currentInput }]);
    } else {
      alert("Please enter a task");
    }
    setCurrentInput("");
  };

  //Complete Task Handler
  const handleDelete = (id) => {
    const newlist = todolists.filter((item) => item.id != id);
    // const index = newlist.indexOf(id);
    settodolist(newlist);
    console.log(newlist);
    setcheck(true);
    setcheck(false);
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
                handleDelete(todo.id);
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
