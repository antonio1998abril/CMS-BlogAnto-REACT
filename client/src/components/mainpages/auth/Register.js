import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

function Register() {
    const [user,setUser]=useState({
        name:'',email:'',password:''
    })

    const onChangeInput=e=>{
        const {name,value}=e.target;
        setUser({...user,[name]:value})
    }

    const registerSubmit= async e=>{
        e.preventDefault()
        try{
            await Axios.post('/user/register',{...user})
            localStorage.setItem('firstLogin',true)
            window.location.href="/";

        }catch(err){
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
       

            <form onSubmit={registerSubmit}>
            <h2>Register</h2>

                <div className="form-group">
                    <label className="labelbox">Name</label>
                    <input type="text" value={user.name} className="form-control" name="name" placeholder="Name"  autoComplete="on" onChange={onChangeInput}></input>
                </div>
                <div className="form-group">
                    <label className="labelbox"> Email address</label>
                    <input  type="email"  value={user.email} className="form-control"  name="email" placeholder="Enter email" autoComplete="on" onChange={onChangeInput}></input>
                    <small className="form-text text-muted labelbox">We'll never share your email with anyone else.</small>
                </div>
                
                <div className="form-group">
                    <label className="labelbox"> Password</label>
                    <input name="password" type="password" value={user.password} className="form-control"  placeholder="Password"  autoComplete="on" onChange={onChangeInput}></input>
                </div>
                
                <button type="submit" className="btn btn-primary" >Register</button>
                <div className="row">
                
                <Link to="/Login">Login</Link>
            </div>
            </form>


        </div>
    )
}

export default Register
