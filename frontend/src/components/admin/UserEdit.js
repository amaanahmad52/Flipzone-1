import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core';
import Spinner from "../Spinner"
import TitleData from '../design/TitleData';
import { UserDetailsByAdminAction, makeAdminUserAction, makeUserAdminAction } from '../../actions/userAction';
import { useParams } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import {toast} from 'react-toastify';
const UserEdit = () => {
    const dispatch=useDispatch();
    const {user,error,success,loading}=useSelector((s)=>s.userDetailsByAdmin)
    const {error:alterError,success:alterSuccess,kisko}=useSelector((s)=>s.makeAdminNUser)
    
    const {id}=useParams()
    useEffect(()=>{
        dispatch(UserDetailsByAdminAction(id))
        console.log(user && closed)
        if(user && user.role==="admin"){
          setClosed(prevClosed => false);
        }
        else{
          setClosed(prevClosed => true);
        }

        if(error){
            toast.error(error.message)
        }
        if(alterError){
            toast.error(alterError.message)
        }
        if(alterSuccess){
            toast.success(`${user.name} is now ${user.role=="admin" ? "user" :"admin"}`)
        }
    },[id,dispatch,alterSuccess,kisko])

    const[closed ,setClosed]=useState()

    const handleChange=()=>{
      // setClosed(prevClosed => !prevClosed);
        if(user && user.role==='user'){
            dispatch(makeUserAdminAction(id))
        }
        else if(user && user.role==='admin'){
            dispatch(makeAdminUserAction(id))
        }
    }
  return (
    <>
      {loading?<Spinner/>:(
      <>
        <TitleData data={"Edit User"} />
        <div className="orderDetailsPage"></div>
          <div className="orderDetailsContainer">
           <Typography component="h1">
                user#{user&& user._id}
              </Typography>
              <Typography>User Info</Typography>
         
        <div className="orderDetailsContainerBox">

              <div>
                <p>Name:</p>
                <span>{user && user.name}</span>
              </div>

              <div>
                <p>Joined on:</p>
                <span>
                  {user && String(user.createdAt).slice(0, 10)}
                </span>
              </div>

               <div>
                  <p>Role:</p>
                  <span>
                    {user && user.role}
                  </span>
                </div>
                <div>
                    <p>MAKE {user&&user.role==="admin"?"USER":"ADMIN"}:</p>
                    <Switch
                        // style={{marginTop:"-10px"}}
                        checked={closed}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
              </div>
          </div>
         
        </div>   
            
        </>
     
        )}
    </>
  )
}
export default UserEdit
