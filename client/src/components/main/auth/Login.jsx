import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [user,setUser]=useState({
        email:'',
        password:'',
    })

    const onChange=e=>{
        const {name,value}=e.target
        setUser({...user,[name]:value})
    }

    const loginSubmit=async e=>{
        e.preventDefault();
        try {
            await axios.post('user/login',{...user})
            localStorage.setItem('firstLogin',true)
            window.location.href="/"
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={loginSubmit}>
                <div className="input-field">
                    <input type="email" required placeholder=" " value={user.email} name="email" onChange={onChange}/>
                    <label className="lable-input" htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                    <input type="password" required placeholder=" " value={user.password} name="password" onChange={onChange}/>
                    <label className="lable-input" htmlFor="password">Password</label>
                </div>
                <div className="btn-login-register">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;