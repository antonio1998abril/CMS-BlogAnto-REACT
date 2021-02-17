import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

function Login() {
    const [user,setUser]=useState({
        email:'',password:''
    })
    const onChangeInput=e=>{
        const {name,value}=e.target;
        setUser({...user,[name]:value})
    }
    const loginSubmit=async e=>{
        e.preventDefault()
        try{
            await Axios.post('/user/login',{...user})
            localStorage.setItem('firstLogin',true)
            window.location.href="/";
            localStorage.removeItem('userid')
        }catch(err){
            alert(err.response.data.msg)
        }
    }
    return (
     
        <div className="login-page">
            
            <form onSubmit={loginSubmit}>
                <div className="form-group">
                    <label className="labelbox"> Email address</label>
                    <input name="email" type="email"  value={user.email} className="form-control"  aria-describedby="emailHelp" placeholder="Enter email" autoComplete="on" onChange={onChangeInput}></input>
                    <small id="emailHelp" className="form-text text-muted labelbox">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label className="labelbox"> Password</label>
                    <input name="password" type="password" value={user.password} className="form-control"  placeholder="Password"  autoComplete="on" onChange={onChangeInput}></input>
                </div>
                
                <button type="submit" className="btn btn-primary" >Login</button>
                <div className="row">
                
                <Link to="/register"> Register</Link>
            </div>
            </form>
        </div>
    )
}

export default Login
