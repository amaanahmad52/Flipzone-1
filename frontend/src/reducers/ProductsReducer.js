// In Redux, constants are typically used to define action types.
//  Action types are string values that describe the type of action being performed in
//an application. Constants help ensure consistency and avoid typos or errors
//when referring to action types throughout the application.

// Constants are often defined as variables with uppercase names and string values.

// S E E  B O T T O M

import {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PARTICULAR_PRODUCT_FAIL,
  PARTICULAR_PRODUCT_REQUEST,
  PARTICULAR_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS,NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAIL,
  PRODUCT_EDIT_REQUEST,PRODUCT_EDIT_SUCCESS,PRODUCT_EDIT_FAIL,
 
} from "../constants/ProductConstants";

//In a typical Redux application, you should call APIs (server requests) inside action creators and not inside reducers
//. The actions in Redux are responsible for triggering changes to the application state, whereas reducers are
// responsible for handling those changes.

// Reducers are pure functions that specify how the application's state should change in response to dispatched actions.
// They take the current state and an action as inputs and return a new state.

//   REDUCER FOR ALL PRODUCTS to display at home
//initially state has empty array of products
export const productReducer = (state = { products: [] }, action) => {
  switch (
    action.type //according to action type, respective reducer will be called
  ) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      }; //return means save in our store, aur fir store ye saved states ko bhjega components ko

    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payloadamaandata.fetchedProduct, //we get from action
        productCount: action.payloadamaandata.productCount,
        kitnaperpage:action.payloadamaandata.kitnaperpage,
        filteredProductsCount:action.payloadamaandata.filteredProductsCount
      };

    case ALL_PRODUCT_FAIL:
      return {
        loading: true,
        error: action.payloadamaandata,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//REDUCER FOR A PARTICULAR PRODUCT

export const particularProductDetailReducer = (state = { particularproduct: [] }, action) => {
  switch (
    action.type //according to action type, respective reducer will be called
  ) {
    case PARTICULAR_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      }; //return means save in our store, aur fir store ye saved states ko bhjega components ko

    case PARTICULAR_PRODUCT_SUCCESS:
      return {
        loading: false,
        particularproduct: action.payloadamaandata, //we get from action
        
      };

    case PARTICULAR_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payloadamaandata,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


//get all product (from admin dashboard)

export const AdminproductReducer = (state = { products: [] }, action) => {
  switch (
    action.type //according to action type, respective reducer will be called
  ) {
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      }; //return means save in our store, aur fir store ye saved states ko bhjega components ko

    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payloadamaandata, //we get from action
        
      };

    case ADMIN_PRODUCT_FAIL:
      return {
        loading: true,
        error: action.payloadamaandata,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//creating a new product-->Admin

export const newProductCreateReducer=(state={products:{}},action)=>{

  switch(action.type){

      case NEW_PRODUCT_REQUEST:
        return{
          ...state,
          loading: true,

        }
      case NEW_PRODUCT_SUCCESS:
        return{
          loading: false,
          products:action.payloadamaandata.product,
          success:action.payloadamaandata.success
        }
      case NEW_PRODUCT_FAIL:
        return{
          loading: false,
          error: action.payloadamaandata,
        }
      case CLEAR_ERRORS:
        return{
          ...state,
          error: null,
        }
      case NEW_PRODUCT_RESET:
        return{
          ...state,
          success:false,
         
        }
      default:
       return{
        ...state
       }
  }
}

//deleting product
export const productDeleteReducer=(state={},action)=>{

  switch(action.type){
    
      case PRODUCT_DELETE_REQUEST:
        return{
          ...state,
          loading: true,

        }
      case PRODUCT_DELETE_SUCCESS:
        return{
          loading: false,
          msg:action.payloadamaandata.message,
          success:action.payloadamaandata.status
        }
      case PRODUCT_DELETE_FAIL:
        return{
          loading: false,
          deleteerror: action.payloadamaandata,
        }
      case "DELETE_PRODUCT_RESET":
        return{
          ...state,
          success:false
        }
      case CLEAR_ERRORS:
        return{
          ...state,
          deleteerror: null,
        }
      default:
       return{
        ...state
       }
  }
}


//eidt product->ADMIN
export const productEditReducer=(state={},action)=>{

  switch(action.type){
    
      case PRODUCT_EDIT_REQUEST:
        return{
          ...state,
          loading: true,

        }
      case PRODUCT_EDIT_SUCCESS:
        return{
          loading: false,
          success:action.payloadamaandata.success
        }
      case PRODUCT_EDIT_FAIL:
        return{
          loading: false,
          error: action.payloadamaandata,
        }
      case "RESET_UPDATE_PRODUCT":
        return{
          ...state,
          success:false
        }
      case CLEAR_ERRORS:
        return{
          ...state,
          eerror: null,
        }
      default:
       return{
        ...state
       }
  }
}
// what is happening?  --> 1)components asks data from store using dispatch functions and useselectors , dispatch shuru krne ke leye and use selector for getting data
// 2)  action works and do the work of api call and all (jo bhi call kiya gya ho by help of use dispatch)
// 3) reducer is called as per the action(jo action call hua uska reducer chelga) and update the store state
// 4) we finally got the data from the store`s state by use selector
