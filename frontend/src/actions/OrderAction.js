import axios from "axios"
import {ORDER_REQUEST,ORDER_SUCCESS, ORDER_FAIL,CLEAR_ERRORS,
    MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL,
    ORDER_DETAILS_FAIL,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_REQUEST,
    ALL_ORDERS_FAIL,ALL_ORDERS_SUCCESS,ALL_ORDERS_REQUEST,
    ORDERS_DELETE_REQUEST,ORDERS_DELETE_SUCCESS,ORDERS_DELETE_FAIL,
    ORDERS_EDIT_REQUEST,ORDERS_EDIT_SUCCESS,ORDERS_EDIT_FAIL,
} from "../constants/OrderConstant"

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
//for getting all orders by user (jo usne kiye honge)
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

// Get Order Details by user
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

  //get all orders ->admin  (saare order of flipzone)

  export const getAllOrdersAction=()=>async (dispatch) => {
    try {
        dispatch({type:ALL_ORDERS_REQUEST})

        const {data}=await axios.get("/api/v1/admin/order/allOrders")

        dispatch({type:ALL_ORDERS_SUCCESS,payloadData:data})
    } catch (error) {
        dispatch({
            type:ALL_ORDERS_FAIL,
            payloadData:error.response.data.message
        })
    }
}
  //DELETE  orders  

  export const orderDeleteAction=(id)=>async (dispatch) => {
    try {
        dispatch({type:ORDERS_DELETE_REQUEST})

        const {data}=await axios.delete(`/api/v1/order/cancelOrder/${id}`)

        dispatch({type:ORDERS_DELETE_SUCCESS,payloadData:data.success})
    } catch (error) {
        dispatch({
            type:ORDERS_DELETE_FAIL,
            payloadData:error.response.data.message
        })
    }
}
  //Update orders ->admin  

  export const orderUpdateAction=(id,dataform)=>async (dispatch) => {
    try {
        dispatch({type:ORDERS_EDIT_REQUEST})

        const {data}=await axios.put(`/api/v1/admin/order/update/${id}`,dataform,
        {headers:{'Content-Type': 'application/json'}})

        dispatch({type:ORDERS_EDIT_SUCCESS,payloadData:data.success})
    } catch (error) {
        dispatch({
            type:ORDERS_EDIT_FAIL,
            payloadData:error.response.data.message
        })
    }
}


export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS })
}