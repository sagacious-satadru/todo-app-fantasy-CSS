// import './App.css'
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import "./index.css";
import "./fanta.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  // const todos = [
  //   {input: "Buy some milk", completed: false},
  //   {input: "Do the laundry", completed: false},
  //   {input: "Take Ichika Nakano out on a date", completed: true},
  //   {input: "Give flowers to Miku Nakano", completed: false},
  //   {input: "Buy an icecream for Yotsuba Nakano", completed: true},
  // ]

  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      input: "Buy some milk",
      completed: false,
      description: "Buy some milk for the family",
    },
    {
      id: uuidv4(),
      input: "Do the laundry",
      completed: false,
      description: "Do the laundry for the family",
    },
    {
      id: uuidv4(),
      input: "Take Ichika Nakano out on a date",
      completed: true,
      description: "Take Ichika Nakano out on a date and have a good time",
    },
    {
      id: uuidv4(),
      input: "Give flowers to Miku Nakano",
      completed: false,
      description:
        "Give flowers to Miku Nakano to show your love and appreciation",
    },
    {
      id: uuidv4(),
      input: "Buy an icecream for Yotsuba Nakano",
      completed: true,
      description: "Buy an icecream for Yotsuba Nakano to make her happy",
    },
  ]);

  const [selectedTab, setSelectedTab] = useState("All");

  const handleAddTodo = (newTodoInput, newTodoDescription) => {
    const newTodoItem = {
      id: uuidv4(), // Generate a unique ID using uuid
      input: newTodoInput,
      completed: false,
      description: newTodoDescription,
    };
    const newTodoList = [...todos, newTodoItem];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };
  const handleDeleteTodo = (id) => {
    const newTodoList = todos.filter((todo) => todo.id !== id);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleCompleteTodo = (id) => {
    const newTodoList = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const markAsUndone = (id) => {
    const newTodoList = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: false } : todo
    );
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleEditTodo = (id, newInput, newDescription) => {
    const newTodoList = todos.map((todo) =>
      todo.id === id
        ? { ...todo, input: newInput, description: newDescription }
        : todo
    );
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleSaveData = (currentTodos) => {
    localStorage.setItem("todo-app", JSON.stringify({ todos: currentTodos }));
  };

  useEffect(() => {
    if (!localStorage || !localStorage.getItem("todo-app")) return; // if localStorage is not available, or if the item 'todo-app' in the localStorage is not available, then we return early
    // let db = [...todos];
    let db = JSON.parse(localStorage.getItem("todo-app"));
    setTodos(db.todos);
    // const data = localStorage.getItem("todos");
    // if (data) {
    //   setTodos(JSON.parse(data));
    // }
  }, []); // if the dependency array is empty, then the useEffect hook will only run once (but every time) when the component is ready and loaded on the screen.
  // In App.jsx

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <Header todos={todos} />
        <Tabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          todos={todos}
        />
        <TodoList
          handleCompleteTodo={handleCompleteTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
          markAsUndone={markAsUndone}
          selectedTab={selectedTab}
          todos={todos}
        />
        <TodoInput handleAddTodo={handleAddTodo} />
      </div>
    </div>
  );
}

export default App;
