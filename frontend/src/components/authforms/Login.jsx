import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { login } from '../../services/authApi';
import { setError, setLoading, setToken, setUser } from '../../redux/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
 

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (location.state?.registered) {
            dispatch(setError(null))
        }
    }, [location.state, dispatch])
    const {loading, error} = useSelector((state) => state.auth)


    const handleLogin = async (e) =>{
        e.preventDefault()
        if(!email || !password) {
            dispatch(setError("Email and password are required!"))
            return
        }

        dispatch(setLoading(true))
        try{
            const response = await login(email,password)
            dispatch(setToken(response.token))
            dispatch(setUser(response.user))
            dispatch(setError(null))
            navigate("/")
        }catch(err){
            dispatch(setError(err.message || "Login failed"))
        }finally {
            dispatch(setLoading(false))
        }
    }


    return(
        <div className='flex justify-center items-center min-h-screen w-screen bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-48'>
        <Card className = 'p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md mx-auto shadow-lg'>
            <h2 className='text-3xl font-bold text-black text-center mb-2'>Login</h2>
            {location.state?.registered && (
              <p className='text-green-600 text-center text-sm mb-2'>Registration successful. Please log in.</p>
            )}
            <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                <Input type="email" placeholder='Email...' value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className ="text-black"
                />

                <Input type="password" placeholder='Password...' 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className ="text-black"
                 />
                  {(!location.state?.registered && error) && (
                    <p className='text-red-500 text-center text-sm mb-2'>{error}</p>
                  )}

                <Button type="submit" className="w-full mt-4" variant="outline">
                    {loading ? "Logging in..." : "Login "}
                </Button>
            </form>
            <Button variant ="link"
            className='text-sm mt-6'
            onClick = {() => navigate("/register")}>
                New here ? Register
            </Button>
        </Card>
        </div>
    )

}
