import {  useContext } from "react";
import { TodoContext } from "../context/todoContext";

import TodoItem from "./todoitem";

 const TodoList = () => {
    const {Todos, loading} = useContext(TodoContext)

    return(
        <>
        <div className="list flex flex-col justify-start item-center h-[415px] w-12/13 sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto border border-gray-300 p-3 sm:p-6 rounded-lg shadow-sm overflow-y-auto">
            {loading ? (
                <div className="text-center text-gray-500">Loading todos...</div>
            ) : Todos.length > 0 ? (
                Todos.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                ))
            ) : (
                <div className="text-center text-gray-400">No todos available.</div>
            )}
        </div>
        </>
    )


}

export default TodoList