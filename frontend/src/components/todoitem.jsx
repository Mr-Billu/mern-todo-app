import { useState, useContext } from "react";
import { TodoContext } from "../context/todoContext";

 const TodoItem = ({todo}) => {
    const [editing, setediting] = useState(false)
    const {removeTodo, changeTodo, editTodo} = useContext(TodoContext)
    const [editText , seteditText] = useState(todo.title)

    const handleEdit = () => {
        if(editText !== todo.title) {
            editTodo(todo._id, editText)
        }
        setediting(false)
    }

    const handleCancel = () => {
        seteditText(todo.title)
        setediting(false)
    }


    return (
        <div className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg mb-2 hover:shadow-md transition w-full">
          {editing ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={editText}
                onChange={(e) => seteditText(e.target.value)}
                className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={handleEdit}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => changeTodo(todo._id)}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {todo.title}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setediting(true)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeTodo(todo._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      );


}

export default TodoItem