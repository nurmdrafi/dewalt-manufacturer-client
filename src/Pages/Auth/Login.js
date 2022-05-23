import React from 'react';
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();
    return (
        <div>
           <h1>Login</h1> 
        </div>
    );
};

export default Login;