import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { register } from '../../services/authApi';
import { setError, setLoading, setToken, setUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username, setUsername] = useState("")
    const dispatch = useDispatch()
const navigate = useNavigate()
 const {loading, error} = useSelector(state => state.auth)

 useEffect(() => {
     // clear any stale auth errors when opening the register page
     dispatch(setError(null))
 }, [dispatch])

    const handleregister = async(e) => {
        e.preventDefault();
        dispatch(setError(null))
        
        if(!email || !password || !username){
            dispatch(setError("All fields are required!"))
            return
        }
        if(password.length < 6){
            dispatch(setError("Password must be at least 6 characters long!"))
            return
        }

        dispatch(setLoading(true))
       try{
        await register(email,password,username)
        dispatch(setError(null))
        navigate("/login", { state: { registered: true } })

       }catch(err){
        dispatch(setError(err.message || "Registration failed"))
       }finally{
        dispatch(setLoading(false))
       }
        
    }

    return ( 
        <div className="flex justify-center items-center min-h-screen w-screen bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-48">
            <Card className="p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md mx-auto shadow-lg">
            <h2 className='text-3xl text-black font-bold text-center mb-4' >Register</h2>
            <form onSubmit={handleregister}
            className='flex flex-col gap-4'>
                <Input 
                type = "text"
                placeholder = "Username..."
                value={username}
                onChange = {(e)=> setUsername(e.target.value)}
                className ="text-black"
                />

                <Input 
                type='email' 
                placeholder='Email...'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className ="text-black"
                />

                <Input 
                type='password' 
                placeholder='Password...'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className ="text-black"
                />
                    
                    {error && <p className='text-red-500 text-sm mb-2 text-center'>{error}</p>}

                <Button type="submit" className='w-full mt-6 ' disabled={loading} variant= "outline">
                    {loading ? "Registering..." : "Register"}
                    </Button>   
            </form>
            <Button 
            variant = "link"
            className='text-sm mt-6'
            onClick = {() => { dispatch(setError(null)); navigate("/login") }}
            >
                Already have an account? Login
            </Button>
            </Card>
        </div>
    )


}