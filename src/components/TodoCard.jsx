import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";

const TodoCard = ({
  todo,
  handleDeleteTodo,
  handleCompleteTodo,
  markAsUndone,
  handleEditTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState(todo.input);
  const [editDescriptionValue, setEditDescriptionValue] = useState(
    todo.description || ""
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPopped, setIsPopped] = useState(false);

  const handleSaveEdit = () => {
    handleEditTodo(todo.id, editInputValue, editDescriptionValue);
    setIsEditing(false);
  };

  const descriptionWordCount = todo.description?.split(" ").length || 0;
  const shouldTruncate = descriptionWordCount > 10; // Adjust number as needed

  // Popup card component
  const PopupCard = () => (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setIsPopped(false)}
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-11/12 m-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{todo.input}</h2>
        <p className="text-gray-600 text-lg">{todo.description}</p>
        <button
          onClick={() => setIsPopped(false)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`bg-white shadow-md rounded-xl p-5 mb-4 border border-gray-200 hover:shadow-lg transition-shadow ${
          todo.completed ? "bg-gray-50" : ""
        }`}
      >
        {isEditing ? (
          <div className="flex flex-col gap-3">
            <input
              className="w-full p-2 border rounded-md"
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
            />
            <input
              className="w-full p-2 border rounded-md"
              value={editDescriptionValue}
              onChange={(e) => setEditDescriptionValue(e.target.value)}
            />
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3
                  className={`text-lg font-semibold text-gray-800 ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.input}
                </h3>
                <button
                  onClick={() => setIsPopped(true)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <ArrowsPointingOutIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {todo.description && (
                <div>
                  <p
                    className={`text-gray-600 ${
                      !isExpanded && shouldTruncate ? "line-clamp-2" : ""
                    }`}
                  >
                    {todo.description}
                  </p>
                  {shouldTruncate && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-1 font-medium"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUpIcon className="w-4 h-4" /> Show less
                        </>
                      ) : (
                        <>
                          <ChevronDownIcon className="w-4 h-4" /> Show more
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {!todo.completed && (
                <button
                  onClick={() => handleCompleteTodo(todo.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Done</span>
                </button>
              )}
              {todo.completed && (
                <button
                  onClick={() => markAsUndone(todo.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-md transition-colors"
                >
                  <XCircleIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Mark as undone</span>
                </button>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
              >
                <PencilSquareIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="flex items-center gap-1 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {isPopped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={() => setIsPopped(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button in top-right corner */}
              <button
                onClick={() => setIsPopped(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircleIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 pr-8">
                {todo.input}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {todo.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TodoCard;

// import React, { useState } from "react";

// const TodoCard = ({
//   todo,
//   handleDeleteTodo,
//   handleCompleteTodo,
//   markAsUndone,
//   handleEditTodo,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editInputValue, setEditInputValue] = useState(todo.input);
//   const [editDescriptionValue, setEditDescriptionValue] = useState(
//     todo.description || ""
//   );

//   const handleSaveEdit = () => {
//     handleEditTodo(todo.id, editInputValue, editDescriptionValue);
//     setIsEditing(false);
//   };

//   return (
//     <div className="card todo-item">
//       {isEditing ? (
//         <>
//           <input
//             value={editInputValue}
//             onChange={(e) => setEditInputValue(e.target.value)}
//           />
//           <input
//             value={editDescriptionValue}
//             onChange={(e) => setEditDescriptionValue(e.target.value)}
//           />
//           <button onClick={handleSaveEdit}>Save</button>
//         </>
//       ) : (
//         <>
//           <p>{todo.input}</p>
//           {todo.description && <p>{todo.description}</p>}
//           <div className="todo-buttons">
//             <button
//               onClick={() => handleCompleteTodo(todo.id)}
//               disabled={todo.completed}
//             >
//               <h6>Done</h6>
//             </button>
//             {todo.completed && (
//               <button onClick={() => markAsUndone(todo.id)}>
//                 <h6>Mark as undone</h6>
//               </button>
//             )}
//             <button onClick={() => setIsEditing(true)}>
//               <h6>Edit</h6>
//             </button>
//             <button onClick={() => handleDeleteTodo(todo.id)}>
//               <h6>Delete</h6>
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TodoCard;
