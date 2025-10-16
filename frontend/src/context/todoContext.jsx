import { createContext, useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoApi';

export const TodoContext = createContext()

export const TodoProvider = ({children}) => {
    const [Todos, setTodos] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        setloading(true)
        try{
            const data = await getTodos()
            setTodos(data)
        } catch(error) {
            console.log ('Error ', error)
        } finally{
            setloading(false)
        }
    }

    const addTodo = async (newtodotext) => {
        try {
            const newtodo = await createTodo({title:newtodotext, completed:false})
            setTodos([...Todos, newtodo])
        }catch(error){
            console.log('Error ', error)
        }
    }

    const changeTodo = async (id) => {
        try {
            const todo = Todos.find(t => t._id === id)
            const updated = await updateTodo(id, {completed: !todo.completed})
            setTodos(Todos.map(t => t._id === id ? updated : t))
        } catch(error){
            console.log ('error', error)
        }
    }

    const editTodo = async (id, newTitle) => {
        try {
          const updated = await updateTodo(id, { title: newTitle });
          setTodos(Todos.map(t => t._id === id ? updated : t));
        } catch (error) {
          console.log('error:', error);
        }
    };

    const removeTodo = async (id) => {
        try {
            await deleteTodo(id)
            setTodos(Todos.filter(t => t._id !== id))
        }catch (error){
            console.log("error", error)
        }
    }

    return (
        <TodoContext.Provider value={{Todos, loading, addTodo, removeTodo, changeTodo, fetchTodos, editTodo}}>
            {children}
        </TodoContext.Provider>
    )
}