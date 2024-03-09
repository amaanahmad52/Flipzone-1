import React, { useEffect, useState } from 'react'
import Spinner from "../Spinner";
import KeyIcon from '@mui/icons-material/Key';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import NewPasswordIcon from '@mui/icons-material/EnhancedEncryption';
import "./Resetpassword.css"
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import {  clearErrors, ResetPasswordAction } from '../../actions/userAction';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = { position: "bottom-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
}
const ResetPassword = () => {
   
    const dispatch=useDispatch()
    const alert = useAlert()
   const nav=useNavigate()
    
   
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    
 
 
      
    const updatesubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
      
       
        formData.set("oldPassword", oldPassword);
        formData.set("newPassword", newPassword);
        formData.set("confirmPassword", confirmPassword);
        
        dispatch(ResetPasswordAction(formData));
      };    

     //to set the  state before and after successfull update

     const {isUpdated,error,loading}=useSelector((s)=>s.usersUpdate)

     useEffect(()=>{

      if(error){
        // alert.error(error);
        toast.error(`${error}`, {options});
        dispatch(clearErrors())
      }
      if(isUpdated){
        // alert.success("Password Updated !")
        toast('Password Updated !', {options});
       dispatch({
        type:"PASSWORD_RESET"  //this will set isupdated=false  
       })
      }
    },[dispatch,isUpdated,error,alert])

  return (
    
      <>{loading?<Spinner/>:(
      <>
        <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={updatesubmit}
              >
                
                <div className="loginPassword">
                  <KeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    name="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <NewPasswordIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword
