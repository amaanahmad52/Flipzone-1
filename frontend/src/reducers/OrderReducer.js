import {ORDER_REQUEST,ORDER_SUCCESS, ORDER_FAIL, CLEAR_ERRORS,
    MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL,
    ORDER_DETAILS_FAIL,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_REQUEST,
    ALL_ORDERS_FAIL,ALL_ORDERS_SUCCESS,ALL_ORDERS_REQUEST,
    ORDERS_DELETE_REQUEST,ORDERS_DELETE_SUCCESS,ORDERS_DELETE_FAIL,
    ORDERS_EDIT_REQUEST,ORDERS_EDIT_SUCCESS,ORDERS_EDIT_FAIL,
} from "../constants/OrderConstant"

export const orderhandleReducer=(state={},action)=>{

    switch (action.type) {
        case ORDER_REQUEST:
            return{
                ...state,
                loading:true,
               
            }
        case ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                order:action.payloadData,

            }  

        case ORDER_FAIL:
            return{
                loading:false,
                error:action.payloadData
            }   
            
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        default:
           return state;
    }
}

export const myOrderDetailsReducer=(state={orders:[]},action)=>{ //will show only orders of a logined user

    switch (action.type) {
        case MY_ORDER_REQUEST:
            return{
                ...state,
                loading:true,
               
            }
        case MY_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                orders:action.payloadData,

            }  

        case MY_ORDER_FAIL:
            return{
                loading:false,
                error:action.payloadData
            }   
            
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        default:
           return state;
    }
}

export const ParticularOrderDetailsReducer=(state={order:{}, loading: false, error: null},action)=>{

    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return{
                ...state,
                loading:true,
               
            }
        case ORDER_DETAILS_SUCCESS:
            return{
                ...state,
                loading:false,
                order:action.payloadData,

            }  

        case ORDER_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payloadData
            }   
            
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        default:
           return state;
    }
}


//get all orders and delete a order->admin 

export const getAllOrdersReducer=(state={orders:[]},action)=>{

    switch (action.type) {
        case ALL_ORDERS_REQUEST:
        case ORDERS_DELETE_REQUEST:
            return{
                ...state,
                loading:true,
               
            }
        case ALL_ORDERS_SUCCESS:
        case ORDERS_DELETE_SUCCESS:
            return{
                ...state,
                loading:false,
                orders:action.payloadData.order,
               success:action.payloadData.success,

            }  

        case ALL_ORDERS_FAIL:
        case ORDERS_DELETE_FAIL:
            return{
                loading:false,
                error:action.payloadData
            }   
        case "DELETE_ORDERS_RESET":
            return{
                ...state,
                success:false
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        default:
           return state;
    }
}
export const ordersDeleteReducer=(state={},action)=>{

    switch (action.type) {
        
        case ORDERS_DELETE_REQUEST:
            return{
                ...state,
                loading:true,
               
            }
        
        case ORDERS_DELETE_SUCCESS:
            return{
                ...state,
                loading:false,
               success:action.payloadData,

            }  

    
        case ORDERS_DELETE_FAIL:
            return{
                loading:false,
                error:action.payloadData
            }   
        case "DELETE_ORDERS_RESET":
            return{
                ...state,
                success:false
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        default:
           return state;
    }
}
export const ordersUpdateReducer=(state={},action)=>{

    switch (action.type) {
        case ORDERS_EDIT_REQUEST:
        
            return{
                ...state,
                loading:true,
               
            }
        case ORDERS_EDIT_SUCCESS:
        
            return{
                ...state,
                loading:false,
               success:action.payloadData,

            }  

        case ORDERS_DELETE_FAIL:
            return{
                loading:false,
                error:action.payloadData
            }   
   
        case "UPDATE_ORDERS_RESET":
            return{
                ...state,
                success:false
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        default:
           return state;
    }
}