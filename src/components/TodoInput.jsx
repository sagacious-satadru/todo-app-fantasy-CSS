import React, { useState } from "react";

const TodoInput = ({ handleAddTodo }) => {
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleSubmit = () => {
    if (!inputValue) return;
    handleAddTodo(inputValue, descriptionValue);
    setInputValue("");
    setDescriptionValue("");
  };

  return (
    <div className="input-container">
      <input
        value={inputValue}
        type="text"
        placeholder="Add a new task"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input
        value={descriptionValue}
        type="text"
        placeholder="Add a description"
        onChange={(e) => setDescriptionValue(e.target.value)}
      />
      <button onClick={handleSubmit}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
};

export default TodoInput;

// import React, { useState } from 'react';

// const TodoInput = ({ handleAddTodo }) => {
//   const [inputValue, setInputValue] = useState('');

//   const handleChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Conditionally call handleAddTodo if it is defined
//     handleAddTodo && handleAddTodo(inputValue);
//     setInputValue(''); // Clear the input field after adding the todo
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleChange}
//         placeholder="Add a new todo"
//       />
//       <button type="submit">Add Todo</button>
//     </form>
//   );
// };

// export default TodoInput;
