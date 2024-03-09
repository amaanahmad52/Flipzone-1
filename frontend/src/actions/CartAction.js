import { ADD_TO_CART,SAVE_SHIPPING_INFO } from "../constants/CartConstant";
import axios from "axios";
export const AddToCartAction=(id,quantity)=>async(dispatch,getState)=>{
     //Allows access to the current state via getState();
 

        const { data } = await axios.get(`/api/v1/product/${id}`);
        // console.log(data)
        dispatch({
         type: ADD_TO_CART,
         payload: {
           product: data.fetchedProduct[0]._id,
           name: data.fetchedProduct[0].name,
           price: data.fetchedProduct[0].price,
           image: data.fetchedProduct[0].images[0].url,
           stock: data.fetchedProduct[0].stock,
           quantity,
         },
       });
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); //reload krne pe cart khaali na ho
        
    
    
}

export const deleteCartItemsAction = (id)=>(dispatch,getState) => {

  dispatch({
    type: "REMOVE_FROM_CART",
    payloadData:id
  });
   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); //reload krne pe cart khaali na ho
   
}

export const saveShippingInfoAction = (userdata)=>(dispatch) => {

  dispatch({
    type: SAVE_SHIPPING_INFO,
    payloadData:userdata
  });
   localStorage.setItem("shippingInfo", JSON.stringify(userdata)); //reload krne pe cart khaali na ho
   
}