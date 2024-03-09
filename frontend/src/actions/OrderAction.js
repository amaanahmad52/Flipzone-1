import axios from "axios"
import {ORDER_REQUEST,ORDER_SUCCESS, ORDER_FAIL,CLEAR_ERRORS,
    MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL,
    ORDER_DETAILS_FAIL,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_REQUEST} from "../constants/OrderConstant"

//for placing order
export const orderAction=(orderDetails)=>async (dispatch) => {
    try {
        dispatch({type:ORDER_REQUEST})

        const {data}=await axios.post("/api/v1/order/create",orderDetails,
        {headers: {'Content-Type': 'application/json'}})

        dispatch({type:ORDER_SUCCESS,payloadData:data.neworder})
    } catch (error) {
        dispatch({
            type:ORDER_FAIL,
            payloadData:error.response.data.message
        })
    }
}
//for getting all orders
export const myOrdersAction=()=>async (dispatch) => {
    try {
        dispatch({type:MY_ORDER_REQUEST})

        const {data}=await axios.get("/api/v1/order/myorders")

        dispatch({type:MY_ORDER_SUCCESS,payloadData:data.order})
    } catch (error) {
        dispatch({
            type:MY_ORDER_FAIL,
            payloadData:error.response.data.message
        })
    }
}

// Get Order Details
export const ParticularOrderDetailsAction = (id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/order/details/${id}`);
        console.log(data);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payloadData: data.foundorder });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payloadData: error.response.data.message,
      });
    }
  };

  //get all orders ->admin

  export const getAllOrdersAction=()=>async (dispatch) => {
    try {
        dispatch({type:"ALL_ORDERS_REQUEST"})

        const {data}=await axios.get("/api/v1/admin/order/allOrders")

        dispatch({type:"ALL_ORDERS_SUCCESS",payloadData:data})
    } catch (error) {
        dispatch({
            type:"ALL_ORDERS_FAIL",
            payloadData:error.response.data.message
        })
    }
}
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS })
}