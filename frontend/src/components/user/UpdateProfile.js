import React from 'react';
import "./UpdateProfile.css"

import { useState, useEffect } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';
import { Link, useNavigate } from 'react-router-dom';
// import PhotoIcon from '@mui/icons-material/Photo';
import initialpic from "../images/profile.png";
import Spinner from "../Spinner";
import { useDispatch, useSelector } from 'react-redux';
import {  clearErrors, UpdateUser, loadUser } from '../../actions/userAction';
import { useAlert } from 'react-alert';

const UpdateProfile = () => {
    const{user}=useSelector((s)=>s.users)
    const dispatch=useDispatch();
    const alert = useAlert()
   const nav=useNavigate()
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarpreview, setAvatarpreview] = useState(initialpic);
    
 
    
    const handleupdate = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarpreview(reader.result);
            setAvatar(reader.result);
          }
        };

        reader.readAsDataURL(e.target.files[0]);
        
    };
    
      
      const updatesubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
      
        formData.set("name", name);
        formData.set("email", email);
        formData.set("avatar", avatar);
        
        // console.log(formData)
        
        dispatch(UpdateUser(formData));
      };    

     //to set the  state before and after successfull update

     const {isUpdated,error,loading}=useSelector((s)=>s.usersUpdate)
     useEffect(()=>{

      if(user){ //this one is for setting hte userdata initially, jo phle naam tha usse, baad mein to target.value se save kr hi rhe
        setName(user.name);
        setEmail(user.email);
        // setAvatar(user.avatar.url);
        setAvatarpreview(user.avatar.url)
      }
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      if(isUpdated){
        alert.success("Updated Successfully")
        nav("/account")
        dispatch(loadUser())
       dispatch({
        type:"USER_RESET"  //this will set isupdated=false  , if this not done then ek baar if update krdi and dobaara krna chaahoge to nhi hoga, as isupdated now became true, so need to be
       })
      }
    },[nav,dispatch,isUpdated,error,user,alert])
  return (
    <>{loading?<Spinner/>:(
      <>
        <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updatesubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name} //yhi display hoga box pe
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <EmailIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarpreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleupdate}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
    </>
    )}</>
  )
}

export default UpdateProfile
