import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import env from "../environment"
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate,NavLink } from "react-router-dom";
const Login=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")
    const [toggle,setToggle]=useState(false)
    const navigate=useNavigate()
    const handleLogin=async()=>{
      setToggle(true)
        let res=await axios.post(`${env.apiurl}/users/signin`,{
            email,
            password
        })
       if(res.data.statusCode===200){
        setToggle(false)
        sessionStorage.setItem("token",res.data.token)
        navigate("/dashboard")
       }
       else{
        setToggle(false)
        setMessage(res.data.message)
        setTimeout(()=>{
          setMessage("")
        },3000)

       }
    }
    return <>
    <div className="login-wrapper">
    
    <div className="login">
      <h1>Login</h1>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
      
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
     <div className="button-wrapper">
      <div>
      <Button className="btn-login" variant="primary" onClick={()=>handleLogin()}>
      Login
      </Button>
      </div>
     
      <div className="signupmargin">
      <p>Didn't have an account <NavLink to="/signup">SignUp</NavLink></p>
      </div>
      
     <div>
     <p>Forget password <NavLink to="/password-reset">Click here</NavLink></p>
     </div>
      
     
      
      </div>
    </Form>
    {toggle?<Spinner animation="border" variant="primary" />:<></>}
    {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
    </div>
    </div>
    </>
}

export default Login