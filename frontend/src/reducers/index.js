
import {combineReducers} from "redux"
import { AdminproductReducer, newProductCreateReducer, particularProductDetailReducer, productDeleteReducer, productEditReducer, productReducer } from './ProductsReducer'
import { UpdateUserReducer, forgotandupdatePasswordReducer, getAllUsersReducer, userReducer } from "./userReducer"
import { HandleCartReducer } from "./CartReducer"
import { ParticularOrderDetailsReducer, getAllOrdersReducer, myOrderDetailsReducer, orderhandleReducer } from "./OrderReducer"

export const rootReducer=combineReducers({
    //pass all the reducers here
    // productReducerYahaSeHandle:productReducer  //-->it has state named products
    products:productReducer , //-->it has state named products
    particularproduct:particularProductDetailReducer  ,
    users:userReducer ,
    usersUpdate:UpdateUserReducer,
    forgotPassword:forgotandupdatePasswordReducer,
    cart:HandleCartReducer,
    orders:orderhandleReducer,
    myorders:myOrderDetailsReducer,
    particularOrder:ParticularOrderDetailsReducer,
    adminProducts:AdminproductReducer,
    getAllusers:getAllUsersReducer,
    getAllOrders:getAllOrdersReducer,
    newProductCreate:newProductCreateReducer,
    deleteProduct:productDeleteReducer,
    editProduct:productEditReducer
})


//these names will be given in redux dev tool, not real state name which are defined in reducer
//yhi naam use selector pe use kiye jaayenge