import { TodoProvider } from "./context/todoContext"
import  TodoList  from "./components/todoList"
import Todocard  from "./components/todocard" 
import { Button } from "@/components/ui/button"
import { useDispatch } from 'react-redux'
import { logout } from './redux/authSlice'
import { useNavigate } from 'react-router-dom'

export default function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <div className="min-h-screen w-screen">
    <TodoProvider>
      <div className="min-h-screen w-full">
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-4xl font-bold text-white">
              My Todo App
            </h1>
            <Button variant="outline" className='mt-2' onClick={handleLogout}>
              Logout
            </Button>
          </div>
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


