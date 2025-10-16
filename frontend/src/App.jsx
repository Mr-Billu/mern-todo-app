import { TodoProvider } from "./context/todoContext"
import  TodoList  from "./components/todoList"
import Todocard  from "./components/todocard" 

function App() {
  
  return (
    <div className="min-h-screen w-screen">
    <TodoProvider>
      <div className="min-h-screen w-full">
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-left text-gray-800 mb-8">
            My Todo App
          </h1>
          <div className="bg-gray-100 rounded-xl shadow-lg p-3 sm:p-4 md:p-6 overflow-y-hidden h-[550px] w-full">
            <Todocard />
            <TodoList />
          </div>
        </div>
      </div>
    </TodoProvider>
    
    </div>
  )
}

export default App
