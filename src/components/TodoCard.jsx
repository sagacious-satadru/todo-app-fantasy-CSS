import React from "react";

const TodoCard = (props) => {
  const {
    todo,
    handleDeleteTodo,
    todoIndex,
    handleCompleteTodo,
    markAsUndone,
  } = props;
  // console.log(todo);
  return (
    <div className="card todo-item">
      <p>{todo.input}</p>
      <div className="todo-buttons">
        <button
          onClick={() => handleCompleteTodo(todoIndex)}
          disabled={todo.completed}
        >
          <h6>Done</h6>
        </button>
        {todo.completed && (
          <button onClick={() => markAsUndone(todoIndex)}>
            <h6>Mark as undone</h6>
          </button>
        )}
        <button onClick={() => handleDeleteTodo(todoIndex)}>
          <h6>Delete</h6>
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
