import { ADD_TO_CART, SAVE_SHIPPING_INFO } from "../constants/CartConstant";


export const HandleCartReducer=(state={cartItems:[],shippingInfo:{}},action)=>{
    switch(action.type){
      
        
        case ADD_TO_CART:
            const item = action.payload;
            

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                ...state,
                cartItems: state.cartItems.map((i) =>
                    i.product === isItemExist.product ? item : i
                ),
                };
            } else {
                return {
                ...state,
                cartItems: [...state.cartItems, item],
                };
            }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                //payload pe id hai removed product ki
                cartItems: state.cartItems.filter((i) => i.product !== action.payloadData),
            };
        
        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo:action.payloadData
            }
         default:
            return state
       
    }
}