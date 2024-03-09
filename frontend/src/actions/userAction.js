
import{LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS,REGISTER_SUCCESS,
    REGISTER_FAIL,REGISTER_REQUEST,LOAD_REQUEST,LOAD_SUCCESS,LOAD_FAIL,LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UserUpdate_SUCCESS, UserUpdate_FAIL,UserUpdate_REQUEST,
    RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL,
    FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_REQUEST,
    EMAILRESET_PASSWORD_REQUEST,EMAILRESET_PASSWORD_SUCCESS,EMAILRESET_PASSWORD_FAIL} from "../constants/userConstants"

import axios from "axios"
//dispatch by name of action function from component , action does its work  then dispatvh from action to reducer then reducer save in store
//use selector to get state from reducer ,

export const loginUser=(em,pass)=>async(dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST})  //for loader to reducer
  
        const {data}=await axios.post(`api/v1/user/login`,{

            email:em,
            password:pass,
            headers: { "Content-Type": "application/json" }
        });
            
        
                                                       
        dispatch({type:  LOGIN_SUCCESS,  payloadData:data.success}) //sent to reducer, so that it can update
        // console.log(data)
        
    } catch (error) {
        dispatch({
          type:LOGIN_FAIL,
          payloadData:error.response.data.message //The expression error.response.data.message is commonly used when handling errors from API responses in JavaScript applications, especially when using libraries like Axios for making HTTP requests.
        })
    }
}

export const registerUser=(myForm)=>async(dispatch)=>{
    try {
        dispatch({type:REGISTER_REQUEST})

       
        
        
        const { data } = await axios.post(`api/v1/user/register`, myForm, {
            headers: { "Content-Type": "multipart/form-data" }
        });
          
        
        
        dispatch({type:REGISTER_SUCCESS,payloadData:data.userdetails});
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payloadData:error.response.data.message //The expression error.response.data.message is commonly used when handling errors from API responses in JavaScript applications, especially when using libraries like Axios for making HTTP requests.
          })
    }
}

//to load a user
export const loadUser=()=>async(dispatch)=>{
    try {
        dispatch({type:LOAD_REQUEST})  //for loader to reducer
  
        const {data}=await axios.get(`/api/v1/user/me`);
            
        
                                                
        dispatch({type:  LOAD_SUCCESS,  payloadData:data.user}) //sent to reducer, so that it can update
        // console.log(data)
        
    } catch (error) {
        dispatch({
          type:LOAD_FAIL,
          payloadData:error.response.data.message //The expression error.response.data.message is commonly used when handling errors from API responses in JavaScript applications, especially when using libraries like Axios for making HTTP requests.
        })
    }
}

//logout
export const logout=()=>async(dispatch)=>{
    try {
       
        await axios.get(`api/v1/user/logout`)

          
        
                                                       
        dispatch({type:  LOGOUT_SUCCESS}) //sent to reducer, so that it can update
       
        
    } catch (error) {
        dispatch({
          type:LOGOUT_FAIL,
          payloadData:error.response.data.message //The expression error.response.data.message is commonly used when handling errors from API responses in JavaScript applications, especially when using libraries like Axios for making HTTP requests.
        })
    }
}

//profile update
export const UpdateUser=(myForm)=>async(dispatch)=>{
    try {
        dispatch({type:UserUpdate_REQUEST})

        
        
        const { data } = await axios.put(`/api/v1/user/profileUpdate`, myForm, {
            headers: { "Content-Type": "multipart/form-data" }
        });
          
        console.log(data);
        
        dispatch({type:UserUpdate_SUCCESS,payloadData:data.success});
    } catch (error) {
        dispatch({
            type:UserUpdate_FAIL,
            payloadData:error.response.data.message //The expression error.response.data.message is commonly used when handling errors from API responses in JavaScript applications, especially when using libraries like Axios for making HTTP requests.
          })
    }
}
//sending reset link to mail action
export const ResetPasswordAction=(myForm)=>async(dispatch)=>{
    try {
        dispatch({type:RESET_PASSWORD_REQUEST})

        
        
        const { data } = await axios.put(`/api/v1/user/changePassword`, myForm, {
            headers: { "Content-Type": "application/json" }
        });
          
        
        
        dispatch({type:RESET_PASSWORD_SUCCESS,payloadData:data.success});
    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payloadData:error.response.data.message //The expression error.response.data.message is commonly used when handling errors from API responses in JavaScript applications, especially when using libraries like Axios for making HTTP requests.
          })
    }
}

//for sending mail
export const forgotPasswordAction=(myForm)=>async(dispatch)=>{
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST})

        
        
        const { data } = await axios.post(`/api/v1/user/forgotPassword`, myForm, {
            headers: { "Content-Type": "application/json" }
        });
          
        
        
        dispatch({type:FORGOT_PASSWORD_SUCCESS,payloadData:data.message});
    } catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payloadData:error.response.data.message //The expression error.response.data.message is commonly used when handling errors from API responses in JavaScript applications, especially when using libraries like Axios for making HTTP requests.
          })
    }
}

//for resetting password from mail link
export const EmailResetPasswordAction=(myForm,token)=>async(dispatch)=>{
    try {
        dispatch({type:EMAILRESET_PASSWORD_REQUEST})

        const { data } = await axios.put(`/api/v1/user/resetPassword/${token}`, myForm, {
            headers: { "Content-Type": "application/json" }
        });
          
         
           
        dispatch({type:EMAILRESET_PASSWORD_SUCCESS,payloadData:data.success});
    } catch (error) {
        dispatch({
            type:EMAILRESET_PASSWORD_FAIL,
            payloadData:error.response.data.message //The expression error.response.data.message is commonly used when handling errors from API responses in JavaScript applications, especially when using libraries like Axios for making HTTP requests.
          })
    }
}

//get all users->admin

export const getAllUsersAction=()=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_USERS_REQUEST"})

        const { data } = await axios.get(`/api/v1/admin/user/getAllUsers`);
          
         
        // console.log(data.all);
           
        dispatch({type:"ALL_USERS_SUCCESS",payloadData:data.all});
    } catch (error) {
        dispatch({
            type:"ALL_USERS_FAIL",
            payloadData:error.response.data.message //The expression error.response.data.message is commonly used when handling errors from API responses in JavaScript applications, especially when using libraries like Axios for making HTTP requests.
          })
    }
}

export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS })
}