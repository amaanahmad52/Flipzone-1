import React, { useEffect, useState } from 'react'
import InsertEmoticonSharpIcon from '@mui/icons-material/InsertEmoticonSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import { useNavigate } from 'react-router-dom';
import initialpic from "../images/profile.png"
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExploreIcon from '@material-ui/icons/Explore';
const UserOptions = ({user}) => {
    // console.log("hi",user)
    const nav=useNavigate();
    const dispatch=useDispatch()
    const alert = useAlert();
   const [Logout,setLogout]=useState(false)
   
   const {cartItems} =useSelector((s)=>s.cart)
    const actions = [
        { icon:  <InsertEmoticonSharpIcon />, name: 'Profile',func:account },
        { icon: <ExploreIcon />, name: 'Orders' ,func:orders},
        { icon: <ShoppingBasketIcon  style={{color:cartItems.length>0?"tomato":"unset"}}/> , name: `Cart(${cartItems.length})`,func:cart },
        { icon: <LogoutIcon />, name: 'LogOut' ,func:home},
        
      ];
    if(user.role === 'admin'){
        actions.unshift({ icon: <SpaceDashboardIcon />, name: 'Dashboard',func:dashboard })
    }

    function account(){
        nav("/account")
    }
    function orders(){
        nav("/orders")
    }
    function dashboard(){
        nav("/admin/dashboard")
    }
    function cart(){
        nav("/cart")
    }
    function home(){
        dispatch(logout())
        // alert.success("Logout Successfully");
        setLogout(true);
        nav("/")
    }
    useEffect(()=>{
      if(Logout===true){
        toast.success("Logout Successfully");
      }
    },[Logout])

    const[open,Setopen]=useState(false)
    return (
    <>
    <Backdrop open={open} style={{"zIndex":"9"}} />

    <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        onOpen={()=>Setopen(true)}
        onClose={()=>Setopen(false)}
        open={open}
        
        //If you use onOpen={setopen(true)}, setopen(true) will be executed immediately when the component renders,
        //which gibve undefine error
        direction="down"
        style={{ "position": "fixed",
            "right": "3vmax",
            "top": "3vmax",
            "zIndex":"10"}}

        icon={
          
           
            <img src={ user?.avatar.url ? user.avatar.url : {initialpic}} className="speedDialIcon" 
                style={{"width": "56px",
                    "height": "56px",
                    "border-radius": "100%"}}
            />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            tooltipOpen={window.innerWidth<=600?true:false} //phone pe bada bada dikega speeedial text
          />
        ))}
      </SpeedDial>

      
    </>
  )
}

export default UserOptions
