import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import env from "../environment"
const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message,setMessage]=useState("")
  const navigate=useNavigate()
  const setVal = (e) => {
    setEmail(e.target.value)
  };

  const sendLink = async(e) => {
    e.preventDefault()
    const res=await fetch(`${env.apiurl}/users/sendpasswordLink`,{ 
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email})
    })
    const data=await res.json()
    if(data.status===201){
        setEmail("")
        setMessage(true)

        setTimeout(()=>{
            navigate("/login")
    
        },3000)
    }
    else{
        toast.error("Invalid user")
    }
  };
  return (
    <>
    <div className="emailwrapper">
    <div className="reset-wrapper">
        <div style={{marginTop:"50px"}}>
        <h1>Enter your email here</h1>
        </div>
        <div>
        {message ? <p style={{color:"green",textDecoration:"bold"}}>Password reset link sent successfully</p>:""}
        </div>
        
      </div>
     
      <div className="reset-main-wrappper">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={setVal}
            />
          </Form.Group>
          <Button variant="success" onClick={sendLink}>
            Generate Link
          </Button>
        </Form>
      </div>
    </div>
      
    </>
  );
};
export default PasswordReset;
