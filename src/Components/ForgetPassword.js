import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer,toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import env from "../environment"
const ForgetPassword = () => {
  const { id, token } = useParams();
  const history = useNavigate();
  const [password,setPassword]=useState("")
  const [message,setMessage]=useState(false)
  const userValid = async () => {
    const res = await fetch(
      `${env.apiurl}/users/forgetpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (data.status === 201) {
      console.log("User Valid");
    } else {
      history("*");
    }
  };
 const setVal=(e)=>{
    setPassword(e.target.value)

 }

 const sendPassword=async(e)=>{
    e.preventDefault()
    const res = await fetch(`${env.apiurl}/users/newpass/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({password})
        }
      );
      const data = await res.json();
    if (data.status === 201) {
    setPassword("")
    setMessage(true)
    setTimeout(()=>{
        history("/login")

    },3000)
    } else {
        toast.error("! Token expired  generate new Link")
      
    }
 }
  useEffect(() => {
    userValid();
  }, []);
  return (
    <>
      <div className="reset-wrapper">
        <h1>Enter your new password</h1>
      </div>

      <div className="reset-main-wrappper">
        <Form>
            {message ? <p style={{color:"red"}}>Password changed succesfully</p> :""}
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={setVal}
            />
          </Form.Group>
          <Button variant="success" onClick={sendPassword}>send</Button>
        </Form>
        <ToastContainer/>
      </div>
    </>
  );
};

export default ForgetPassword;
