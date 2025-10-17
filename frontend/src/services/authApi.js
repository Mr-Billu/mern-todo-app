import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/auth';

export const register = async (email, password, username) =>{
    try{
        const {data} = await axios.post(`${BASE_URL}/register`, {
            email, password, username
        } ) 
        return data

    }catch(err){
        const message = err.response?.data?.message || err.message || 'Registration failed';
        throw new Error(message);
        

    }
}

export const login= async (email, password) => {
    try{
        const {data} = await axios.post(`${BASE_URL}/login`, {
            email, password
        })
        return data
    }catch(err){
    const message = err.response?.data?.message || err.message || 'Login failed';
    throw new Error(message);

    }
}

