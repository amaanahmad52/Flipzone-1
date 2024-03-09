import {ORDER_REQUEST,ORDER_SUCCESS, ORDER_FAIL, CLEAR_ERRORS,
    MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL,
    ORDER_DETAILS_FAIL,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_REQUEST} from "../constants/OrderConstant"

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

export const myOrderDetailsReducer=(state={orders:[]},action)=>{

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


//get all orders->admin

export const getAllOrdersReducer=(state={orders:[]},action)=>{

    switch (action.type) {
        case "ALL_ORDERS_REQUEST":
            return{
                ...state,
                loading:true,
               
            }
        case "ALL_ORDERS_SUCCESS":
            return{
                ...state,
                loading:false,
                orders:action.payloadData.order,
                total:action.payloadData.total

            }  

        case "ALL_ORDERS_FAIL":
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