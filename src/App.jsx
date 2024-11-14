// import './App.css'
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import "./index.css";
import "./fanta.css";
import { useState, useEffect } from "react";

function App() {
  // const todos = [
  //   {input: "Buy some milk", completed: false},
  //   {input: "Do the laundry", completed: false},
  //   {input: "Take Ichika Nakano out on a date", completed: true},
  //   {input: "Give flowers to Miku Nakano", completed: false},
  //   {input: "Buy an icecream for Yotsuba Nakano", completed: true},
  // ]

  const [todos, setTodos] = useState([
    { input: "Buy some milk", completed: false },
    { input: "Do the laundry", completed: false },
    { input: "Take Ichika Nakano out on a date", completed: true },
    { input: "Give flowers to Miku Nakano", completed: false },
    { input: "Buy an icecream for Yotsuba Nakano", completed: true },
  ]);

  const [selectedTab, setSelectedTab] = useState("All");

  const handleAddTodo = (newTodo) => {
    const newTodoList = [...todos, { input: newTodo, completed: false }];
    setTodos((prevTasks) => newTodoList);
    handleSaveData(newTodoList);
  };
  const handleDeleteTodo = (index) => {
    let newTodoList = todos.filter((_, todoIndex) => todoIndex !== index); // if the index of the current element is not equal to the index of the element that we want to remove from the list, then we keep that element in the list, otherwise we remove it.
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };
  // const handleCompleteTodo = (index) => {
  //   // to update/edit/modify an existing todo
  //   let newTodoList = [...todos];
  //   let completedTodo = todos[index];
  //   completedTodo.completed = true;
  //   // completedTodo.completed = !completedTodo.completed;
  //   newTodoList[index] = completedTodo;
  //   setTodos(newTodoList);
  // };

  const handleCompleteTodo = (index) => {
    // Create a shallow copy of todos
    let newTodoList = [...todos];
    // Create a new object for the todo to avoid mutation
    let completedTodo = { ...newTodoList[index], completed: true };
    // Update the todo at the given index
    newTodoList[index] = completedTodo;
    // Update the state
    setTodos((prevTodoList) => newTodoList);
    handleSaveData(newTodoList);
  };

  const markAsUndone = (index) => {
    let newTodoList = [...todos];
    let completedTodo = { ...newTodoList[index], completed: false };
    newTodoList[index] = completedTodo;
    setTodos((prevTodoList) => newTodoList);
    handleSaveData(newTodoList);
  };

  const handleSaveData = (currentTodos) => {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currentTodos }));
  };

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) return; // if localStorage is not available, or if the item 'todo-app' in the localStorage is not available, then we return early
    // let db = [...todos];
    let db = JSON.parse(localStorage.getItem('todo-app'));
    setTodos(db.todos);
    // const data = localStorage.getItem("todos");
    // if (data) {
    //   setTodos(JSON.parse(data));
    // }
  }, []); // if the dependency array is empty, then the useEffect hook will only run once (but every time) when the component is ready and loaded on the screen.
  return (
    <>
      <Header todos={todos} />
      <Tabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        todos={todos}
      />
      <TodoList
        handleCompleteTodo={handleCompleteTodo}
        handleDeleteTodo={handleDeleteTodo}
        markAsUndone={markAsUndone}
        selectedTab={selectedTab}
        todos={todos}
      />
      <TodoInput handleAddTodo={handleAddTodo} />
    </>
  );
}

export default App;
