import React from "react";
import TodoCard from "./TodoCard";

const TodoList = ({
  todos,
  selectedTab,
  handleCompleteTodo,
  handleDeleteTodo,
  markAsUndone,
  handleEditTodo,
}) => {
  const filterTodosList = todos.filter((todo) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "Open") return !todo.completed;
    if (selectedTab === "Completed") return todo.completed;
    return false;
  });

  return (
    <>
      {filterTodosList.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          handleCompleteTodo={handleCompleteTodo}
          handleDeleteTodo={handleDeleteTodo}
          markAsUndone={markAsUndone}
          handleEditTodo={handleEditTodo}
        />
      ))}
    </>
  );
};

export default TodoList;

// import React from "react";
// import TodoCard from "./TodoCard";

// const TodoList = (props) => {
//   const { todos, selectedTab } = props;
//   // const tab = "All";
//   const filterTodosList =
//     selectedTab === "All"
//       ? todos
//       : selectedTab === "Open"
//       ? todos.filter((task) => !task.completed)
//       : todos.filter((task) => task.completed);

//   return (
//     <>
//       {filterTodosList.map((todo, todoIndex) => {
//         // Changed from todos.map to filterTodosList.map
//         return (
//           <TodoCard
//             key={todoIndex}
//             todoIndex={todoIndex}
//             {...props}
//             todo={todo}
//           />
//         );
//       })}
//     </>
//   );
// };

// export default TodoList;
