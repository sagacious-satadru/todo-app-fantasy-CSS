import React from "react";
import { useState } from "react";

const TodoInput = (props) => {
  const { handleAddTodo } = props;
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="input-container">
      <input value={inputValue} type="text" placeholder="Add a new task" onChange={(e) => {setInputValue((prevInputValue) => e.target.value)}} />
      <button onClick={() => {
        if (!inputValue) { return; }
        handleAddTodo && handleAddTodo(inputValue); /* The active selection (&& that we see to the left --> `handleAddTodo && handleAddTodo(inputValue);`) is a concise JavaScript expression that uses short-circuit evaluation to conditionally call a function. Here's a breakdown of how it works:

        Short-Circuit Evaluation: The expression handleAddTodo && handleAddTodo(inputValue); leverages JavaScript's logical AND (&&) operator. In JavaScript, the && operator evaluates the left-hand side first. If the left-hand side is true (or truthy), it then evaluates the right-hand side. If the left-hand side is false (or falsy), it skips evaluating the right-hand side. This behavior is known as short-circuit evaluation.
        
        Conditional Function Call: In this context, handleAddTodo is expected to be a function or a variable that holds a function reference. The expression handleAddTodo && handleAddTodo(inputValue); first checks if handleAddTodo is truthy (i.e., it exists and is not null, undefined, false, 0, NaN, or an empty string). If handleAddTodo is truthy, the function handleAddTodo is called with inputValue as its argument.
        
        Purpose: This pattern is often used to ensure that a function is defined before attempting to call it, which helps prevent runtime errors. In this case, handleAddTodo is likely a function responsible for adding a new to-do item, and inputValue is the value of the new to-do item to be added.
        
        Example Scenario: Imagine you have a to-do list application where users can add new tasks. The handleAddTodo function might be passed as a prop to a component, and it handles the logic for adding a new task to the list. By using this conditional call, the code ensures that handleAddTodo is only invoked if it has been provided, making the component more robust and less prone to errors.
        
        Overall, this line of code is a compact and safe way to invoke a function only when it is available, which is a common practice in JavaScript to enhance code reliability. */ 
        setInputValue(""); /* The setInputValue function is called with an empty string to clear the input field after adding a new task. This line ensures that the input field is reset to an empty state, ready for the user to add another task. */
        
        
      }}>
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