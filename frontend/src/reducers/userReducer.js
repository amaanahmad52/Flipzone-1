



import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS,REGISTER_REQUEST,REGISTER_SUCCESS,
  REGISTER_FAIL,LOAD_REQUEST,LOAD_SUCCESS,LOAD_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS,UserUpdate_REQUEST,
   UserUpdate_SUCCESS, UserUpdate_FAIL,
   RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL,
   FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_REQUEST,
   EMAILRESET_PASSWORD_REQUEST,EMAILRESET_PASSWORD_SUCCESS,EMAILRESET_PASSWORD_FAIL } from "../constants/userConstants";

// const initialState = {
//   loading: false,
//   isAuthenticated: false,
//   user: null,
//   error: null
// };

export const userReducer = (state = {user:{}}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_REQUEST:
      
      return {
      
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user:action.payloadData
       
      };

      case LOGOUT_SUCCESS:
        return{
          loading: false,
          user:null,
          isAuthenticated: false,
          
          
        }
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        
        loading: false,
        isAuthenticated: false,
        user: null,
        
        error: action.payloadData, // assuming payloadData contains the error message/
        //this error message if detected then we run clear erro from use effect
      };
    case LOAD_FAIL:
      return{  //state nhi chaiye
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      }
      
    case LOGOUT_FAIL:
      return{
        isAuthenticated:true,
        loading: false,
        error: action.payload,
      }
    
    

    


    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// const initialState2 = {
//   loading: false,
//   isUpdated: false,
//   error: null
// };

//we can define these reducers in separate files, but im doing this way
export const UpdateUserReducer=(state={},action)=>{
    switch(action.type){
      case UserUpdate_REQUEST:
      case RESET_PASSWORD_REQUEST:
      
        return{
          ...state,
          loading: true,
        }
      case UserUpdate_SUCCESS:
      case RESET_PASSWORD_SUCCESS:
        return{
          ...state,
          loading:false,
          isUpdated:action.payloadData, // basically a boolean output here, success or failure
                                        
        };
      
      case UserUpdate_FAIL:
      case RESET_PASSWORD_FAIL:
     
        return{
          ...state,
          loading:false,
          error: action.payloadData,
          
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      case "USER_RESET":
      
          return{
            ...state,
            isUpdated:false  //isko call krege at end in component ,otherwise ek se zada baar update nhi krpayege
          }
      default:
        return state;
    }
}

export const forgotandupdatePasswordReducer=(state={}, action)=>{

    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST:
      case EMAILRESET_PASSWORD_REQUEST:
        return{
          ...state,
          loading: true,
          error: null,
        }
      case FORGOT_PASSWORD_SUCCESS:{
        return{
          ...state,
          loading: false,
          message: action.payloadData,
        }
      }
      case EMAILRESET_PASSWORD_SUCCESS:{
        return{
          ...state,
          loading:false,
          isUpdated:action.payloadData
        }
      }
      case FORGOT_PASSWORD_FAIL:
      case EMAILRESET_PASSWORD_FAIL:
        return{
          ...state,
          loading: false,
          error: action.payloadData,
        }
      
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
      default:
        return state;
    }
}




export const getAllUsersReducer=(state={}, action)=>{

  switch (action.type) {
    case "ALL_USERS_REQUEST":
      return{
        ...state,
        loading: true,
      }
    case "ALL_USERS_SUCCESS":{
      return{
        ...state,
        loading: false,
        UsersDetails: action.payloadData,
      }
    }
 
    case "ALL_USERS_FAIL":
      return{
        ...state,
        loading: false,
        error: action.payloadData,
      }
    
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
    default:
      return state;
  }
}

