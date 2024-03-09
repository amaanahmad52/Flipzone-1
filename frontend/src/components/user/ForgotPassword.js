import React, { useEffect, useState } from 'react'
import Spinner from "../Spinner";
import EmailIcon from '@material-ui/icons/Email';
import "./Resetpassword.css"
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import {  clearErrors, forgotPasswordAction, ResetPasswordAction } from '../../actions/userAction';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const options = { 
position: "bottom-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
}
const ForgotPassword = () => {
    const dispatch=useDispatch()
    const alert = useAlert()
   const nav=useNavigate()
    
   
    const [email, setEmail] = useState("");
   
    
    
 
 
      
    const updatesubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
      
       
        formData.set("email", email);
        console.log(email)
        
        dispatch(forgotPasswordAction(formData));
      };    

     //to set the  state before and after successfull update

     const {message,error,loading}=useSelector((s)=>s.forgotPassword)

     useEffect(()=>{

      if(error){
        // alert.error(error);
        toast.error(`${error}`, {options});
        dispatch(clearErrors())
      }
      if(message){
        // alert.success("Password Updated !")
        toast.success(`${message}`, {options});
      
      }
    },[dispatch,message,error])

  return (
    
      <>{loading?<Spinner/>:(
      <>
        <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Reset Password</h2>

              <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={updatesubmit}
              >
                
                <div className="ForgotEmail">
                  <EmailIcon />
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
               
                <input
                  type="submit"
                  value="Send Mail"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
    </>
    )}
    </>
  )
}

export default ForgotPassword
