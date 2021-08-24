import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [user,setUser]=useState({
        name:'',
        email:'',
        password:'',
    })

    const onChange=e=>{
        const {name,value}=e.target
        setUser({...user,[name]:value})
    }

    const registerSubmit=async e=>{
        e.preventDefault();
        try {
            await axios.post('user/register',{...user})
            localStorage.setItem('firstLogin',true)
            window.location.href="/"
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className="login">
            <h2>Register</h2>
            <form onSubmit={registerSubmit}>
                <div className="input-field">
                    <input type="text" required placeholder=" " value={user.name} name="name" onChange={onChange}/>
                    <label className="lable-input" htmlFor="name">Name</label>
                </div>
                <div className="input-field">
                    <input type="email" required placeholder=" " value={user.email} name="email" onChange={onChange}/>
                    <label className="lable-input" htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                    <input type="password" required placeholder=" " value={user.password} name="password" onChange={onChange}/>
                    <label className="lable-input" htmlFor="password">Password</label>
                </div>
                <div className="btn-login-register">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;