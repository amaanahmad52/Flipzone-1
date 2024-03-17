
import React from 'react';
import './LoginSignUp.css';
// import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';
import { Link, useNavigate } from 'react-router-dom';
// import PhotoIcon from '@mui/icons-material/Photo';
import initialpic from "../images/profile.png";
import Spinner from "../Spinner";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearErrors, registerUser } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';



const Login = () => {
  
  const nav = useNavigate();
  const dispatch = useDispatch();
  // const [created,setCreated]=useState(false);
  //for giving message of error and clearing the error from redux state....
  const alert = useAlert();
  const { error, isAuthenticated, loading } = useSelector((s) => s.users);

                                     //we get /shipping 
//this is basically url that got hitted when autheticated, one direct is /account and one is called at cart componet at checkout

  // const location=useLocation()
  // const redirecturl=location.search ? location.search.split("=")[1] : "/account";

  //oth index is before question mark part and 1st index is querystring part ->split use kia
  useEffect(() => {
    if (error) {
      // alert.error(error);
      toast.error(`${error}`)
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
  
      nav("/account");
      toast.info("Welcome Back!")  
     
    }
  }, [dispatch, alert, error, isAuthenticated]);

  //for sign up and login toggle by ref
  const switcher = useRef(null);
  const formsreflogin = useRef(null);
  const formsrefregister = useRef(null);

  const switchTab = (e, val) => {
    if (val === "login") {
      switcher.current.classList.add("front");
      switcher.current.classList.remove("shiftToRight");
      formsrefregister.current.classList.remove("formfront");
      formsreflogin.current.classList.remove("shiftToLeft");
    }
    if (val === "register") {
      switcher.current.classList.add("shiftToRight");
      switcher.current.classList.remove("front");
      formsrefregister.current.classList.add("formfront");
      formsreflogin.current.classList.add("shiftToLeft");
    }
  };

  //for login form
  const [loginemail, setLoginemail] = useState("");
  const [loginpwd, setLoginpwd] = useState("");

  const setUserEmail = (e) => {
    setLoginemail(e.target.value);
  };

  const setUserPwd = (e) => {
    setLoginpwd(e.target.value);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginemail, loginpwd));
    
  };

  //for form register
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const [avatar, setAvatar] = useState(initialpic);
  const [avatarpreview, setAvatarpreview] = useState(initialpic);

  const { Name, Password, Email } = user;

  const handleRegister = (e) => {
    if (e.target.name === "avatar") {
      const fileReader = new FileReader();

      fileReader.onload = function (event) {
        if (fileReader.readyState === 2) {
          setAvatar(fileReader.result);
          setAvatarpreview(fileReader.result);
        }
      };

      fileReader.readAsDataURL(e.target.files[0]);
    } else {
      const { name, value } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  // useEffect(() =>{
  //   if(created){
  //     nav("/account")
  //   }
  // },[created])
  const registerSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.set("name", Name);
    formData.set("email", Email);
    formData.set("password", Password);
    formData.set("avatar", avatar);
    
   
    dispatch(registerUser(formData));
     
    //giving error is used with cloudinary, else working
    // try {
    //   const { data } = await axios.post("api/v1/user/register", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   // console.log(data);/
    //   // isAuthenticated = true;
    //   setCreated(true); //this will encounter use effect to redirect to account
    // } catch (error) {
    //   console.error("Error during registration:", error);
    //   // Handle the error, show an alert, etc.
    // }
  
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className='loginSignUpContainer'>
            <div className="loginSignUpBox">
              <div>
                <div className="loginSignUpToggle">
                  <p onClick={(e) => switchTab(e, "login")}>Login</p>
                  <p onClick={(e) => switchTab(e, "register")}>Register</p>
                </div>
                <button ref={switcher}></button>
              </div>
              <form className='LoginForm' ref={formsreflogin} onSubmit={loginSubmit}>
                <div className="enteremail">
                  <EmailIcon />
                  <input
                    type='email'
                    required
                    placeholder='E-mail'
                    name="email"
                    value={loginemail}
                    onChange={setUserEmail}
                  />
                </div>
                <div className="enterpwd">
                  <LockIcon />
                  <input
                    type='password'
                    required
                    placeholder='password'
                    name="password"
                    value={loginpwd}
                    onChange={setUserPwd}
                  />
                </div>
                <Link to="/password/forgot">Forget password?</Link>
                <button type="submit" className='loginbutton'>Login</button>
              </form>
              <form className='SignUpForm' encType="multipart/form-data" ref={formsrefregister} onSubmit={registerSubmit}>
                <div className="entername">
                  <FaceIcon />
                  <input
                    type="text"
                    required
                    placeholder='Your name'
                    name='Name'
                    value={Name}
                    onChange={handleRegister}
                  />
                </div>
                <div className="enternewemail">
                  <EmailIcon />
                  <input
                    type="email"
                    required
                    placeholder='Email address'
                    name='Email'
                    value={Email}
                    onChange={handleRegister}
                  />
                </div>
                <div className="enterpwd">
                  <LockIcon />
                  <input
                    type="password"
                    required
                    placeholder='Password'
                    name='Password'
                    value={Password}
                    onChange={handleRegister}
                  />
                </div>
                <div id="enterImage">
                  <label htmlFor="fileInput" className="label"></label>
                  <img src={avatarpreview} alt="." />
                  <input
                    type="file"
                    name="avatar"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleRegister}
                  />
                </div>
                <button type="submit" className='loginbutton'>Register</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;


































// import React from 'react';
// import './LoginSignUp.css';
// import { useState,useRef,useEffect } from 'react';
// import EmailIcon from '@material-ui/icons/Email';
// import LockIcon from '@material-ui/icons/Lock';
// import FaceIcon from '@material-ui/icons/Face';
// import { Link, useNavigate } from 'react-router-dom';
// import PhotoIcon from '@mui/icons-material/Photo';
// import initialpic from "../images/profile.png";
// import Spinner from "../Spinner"
// import { useDispatch,useSelector } from 'react-redux';
// import { loginUser,clearErrors,registerUser } from '../../actions/userAction';
// import { useAlert } from 'react-alert';
// import { InputTwoTone } from '@mui/icons-material';

// const Login = () => {
//   const nav=useNavigate()
//   const dispatch =useDispatch()

//   //for giving message of error and clearing the error from redux state....
//   const alert=useAlert();
//   const{error,isAuthenticated,loading}=useSelector((s)=>s.users)

//   useEffect(()=>{
//     if(error){ //this will come from login_fail event of reducer
//       alert.error(error)  // a method of alert class to display the text in error message
//       dispatch(clearErrors());  //calling error clearing action

//     }
//     //now if user is already logged in then do not display the login page,display his profile instead
//     if(isAuthenticated){ //its a boolean in reducer
//       nav("/account")
//     }
//   },[dispatch,alert,error,isAuthenticated]);

// // ...........

//   //for sign up and login toggle by ref
//   const switcher = useRef(null);
//   const formsreflogin=useRef(null);
//   const formsrefregister=useRef(null);



//   const switchTab=(e,val)=>{
//     if (val === "login") {
//       switcher.current.classList.add("front"); //neutral means at center
//       switcher.current.classList.remove("shiftToRight");

//       formsrefregister.current.classList.remove("formfront"); //register htaao
//       formsreflogin.current.classList.remove("shiftToLeft"); //taaki login beech me aa ske
//     }
//     if (val === "register") {
//       switcher.current.classList.add("shiftToRight"); 
//       switcher.current.classList.remove("front"); //it was at centre of login, so remove

//       formsrefregister.current.classList.add("formfront"); //it will be at centre in register page
//       formsreflogin.current.classList.add("shiftToLeft"); //send login left side
//     }
//   }


//   //for login form

  

//   const[loginemail,SetLoginemail]=useState(""); //ye dono values jese jese user likkhega to update hoti rhegi
//   const[loginpwd,SetLoginpwd]=useState("");
 

   
//   const setUserEmail = (e) => {
//     SetLoginemail(e.target.value);
//   };

//   const setUserPwd = (e) => {
//     SetLoginpwd(e.target.value);
//   };
 
//   const loginSubmit=(e)=>{

//     e.preventDefault()
    
//     // react se baahar kaam nhi ho rh, WE Are not getting data instead Sending, so no need of useeffeect
//     dispatch(loginUser(loginemail,loginpwd))
 

//    }

 
//   //for form register...........................

//   const [user,SetUser]=useState({ 
//     Name: "",
//     Email:"",
//     Password:"",
//   });
//   const[avatar, SetAvatar]=useState(); //this will get the photo upload in server
//   const[avatarpreview,SetAvatarpreview]=useState(initialpic); //this is for a side image to confirm the uploading process


//   const{Name,Password,Email}=user;  //this given to input tag values
 
//   const handleRegister=(e)=>{
      
//     if(e.target.name==="avatar"){
      
//       const fileReader=new FileReader();

//       fileReader.onload=function (event) {
//         // Instructions for when the reader finishes reading
//         if(fileReader.readyState===2){ //means finished  (it has 3 states 0 1 2 )
//           console.log("hi")
//           SetAvatar(fileReader.result);
//           SetAvatarpreview(fileReader.result);   
//           //so photo gets uploaded from local files to page 

//         }

      

//       };
//       fileReader.readAsDataURL(e.target.files[0]);
//     }
//     else{
//       SetUser(e.target.value);
//     }
//   }

  
//    const registerSubmit = (e) => {
//     e.preventDefault();
//      //forrmdata is inbuilt object (map) of js used to send form data to server
//      //benefit is ki data bhejne pe page reload nhi hoga(as we r using prevent default ),  edit krna easy hota compared to normal html form submit
//      const myForm = new FormData();
//     console.log(Name,Email,Password)
//      myForm.set("name", Name);
//      myForm.set("email", Email);
//      myForm.set("password", Password);
//      myForm.set("avatar", avatar);
    
//     dispatch(registerUser(myForm));
//   };
  

  
   
  
//   return (
//     <>
//     {loading?<Spinner/>:(
//       <>
//       <div className='loginSignUpContainer'>
//         <div className="loginSignUpBox">
//           <div>
//           <div className="loginSignUpToggle">  {/* this div is at top, which show toggling */}
//               <p onClick={(e)=>switchTab(e,"login")}>Login</p>
//               <p onClick={(e)=>switchTab(e,"register")}>Register</p>
//           </div>
//           <button ref={switcher}></button> {/* this button is a horizontal strip that will be at bottom of current login or signup */}
//           </div>
//           <form className='LoginForm' ref={formsreflogin} onSubmit={loginSubmit}>
  
//             <div className="enteremail">
//               <EmailIcon/>
//               <input 
//               type='email'  required
//               placeholder='E-mail'
              
//                 name="email"
//                 value={loginemail}
//                 onChange={setUserEmail}
//               />
//             </div>
  
//             <div className="enterpwd">
//               <LockIcon/>
//               <input 
//               type='password'  required
//                 placeholder='password'
               
//                 name="password"
//                 value={loginpwd}
//                 onChange={setUserPwd}
//               />
//             </div>
//               <Link to ="/password/forgot">Forget password?</Link>
//               <button type="submit" className='loginbutton'>Login</button>
  
  
//           </form>
  
//         {/* register form from here */}
          
//           <form className='SignUpForm' encType="multipart/form-data" ref={formsrefregister} onSubmit={registerSubmit}>
            
//               <div className="entername">
//                 <FaceIcon />
//                 <input type="text" required 
//                   placeholder='Your name'
//                   name='Name'
//                   value={Name}
//                   onChange={handleRegister}
//                 />
//               </div>
//               <div className="enternewemail">
//                 <EmailIcon/>
//                 <input type="email" required 
//                   placeholder='Email address'
//                   name='email'
//                   value={Email}
//                   onChange={handleRegister}
//                 />
//               </div>
//               <div className="enterpwd">
//                 <LockIcon/>
//                 <input type="password" required 
//                   placeholder='Password'
//                   name='password'
//                   value={Password}
//                   onChange={handleRegister}
//                 />
//               </div>
//               <div id="enterImage">
//               <label htmlFor="fileInput" className="label">
//                 {/* <PhotoIcon/> */}
//             </label>
//                     <img src={avatarpreview} alt="." />
//                     <input
//                       type="file"
//                       name="avatar"
//                       id="fileInput"
//                       accept="image/*"
                    
//                       onChange={handleRegister}
//                     />
//               </div>
//               <button type="submit" className='loginbutton'>Register</button>
                
            
            
//             </form>
//         </div>
//       </div>
//       </>
//     )}
//     </>
//   );
// };

// export default Login;
