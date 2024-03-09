import React from 'react'
import { Link } from 'react-router-dom'
import "./profile.css"
import { useSelector } from 'react-redux'
import initialpic from "../images/profile.png"
import TitleData from "../design/TitleData"
import Spinner from "../Spinner"
const Account = () => {
  const {user,isAuthenticated,loading}=useSelector((state)=>state.users)
  return (
    <>{user==null && loading?<Spinner/>:(
      <>
    
      <TitleData data={`${user.name}'s Profile`}/>
    <div className='profileContainer'>
      <div >  
        <h1 className='name'>My Profile</h1>
        <img style={{ width: "20vmax",cursor:"pointer",borderRadius: "100%",marginBottom:"15px",marginLeft:"4vmax", height:"25vmax",width:"20vmax",transition:"all 0.5sec", display:"flex"}} src={user.avatar.url?user.avatar.url:{initialpic}} alt={initialpic} />
        <Link to="/me/update"> Update Profile</Link>
      </div>

      <div >

        <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
            </div>
            <div>
            <h4>Email</h4>
            <p>{user.email}</p>
           </div>
           <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).slice(0, 10)}</p>

              </div>

           <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
          </div>
      </div>
    </div>
    </>
    )}</>
  )
}

export default Account
