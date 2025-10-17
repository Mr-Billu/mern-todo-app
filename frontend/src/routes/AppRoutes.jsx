import React from "react";
import { Routes,Route,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../components/authforms/Login";
import Register from "../components/authforms/Register";
import App from "../App";

function PrivateRoute({children}){
    const token = useSelector((state ) => state.auth.token)
    return token ? children : <Navigate to="/login" replace/>
}

function PublicRoute({children}){
    const token = useSelector((state) => state.auth.token)
    return token ? <Navigate to="/" replace/> : children
}

export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/"
            element={<PrivateRoute>
                <App />
            </PrivateRoute>}
             />
             <Route 
             path="/login"
             element ={
                <PublicRoute>
                    <Login />
                    </PublicRoute>
             }
             />
             <Route 
             path="/register"
             element ={
                <PublicRoute>
                    <Register />
                    </PublicRoute>
             }
             />
        </Routes>
    )
}