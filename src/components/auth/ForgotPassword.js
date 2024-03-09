import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react'
import {auth} from "../../firebase"
import "./ForgotPassword.css"
import Button from "../Button"
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const emailVal = e.target.email.value;
        sendPasswordResetEmail(auth, emailVal).then(data=>{
            alert("Reset link sent to email if account exists")
        }).catch(err=>{
            alert(err.code)
        })
    }

  return (
    <div className="Container">
        <h3 className='text'>Forgot Password?</h3>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input name="email" placeholder=" Enter your email" /> <br/>
            <Button id="forgetpasswordbutton" type="submit"> Reset </Button> <br/> <br/>
            <div className="back-button" onClick={() => navigate("/")}> Go Back </div>
        </form>
    </div>
  )
}

export default ForgotPassword;