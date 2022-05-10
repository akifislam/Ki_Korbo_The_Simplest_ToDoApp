import React from "react";

function InputTask(props) {
  return (
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Enter a task to do"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        onChange={(e) => props.onInput(e)}
      ></input>
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        onClick={(e) => {
          e.preventDefault();
          props.onAdd();
        }}
      >
        Add
      </button>
    </div>
  );
}

export default InputTask;
