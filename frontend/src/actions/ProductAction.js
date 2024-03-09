import {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  PARTICULAR_PRODUCT_FAIL,
  PARTICULAR_PRODUCT_REQUEST,
  PARTICULAR_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS,NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAIL,
  PRODUCT_EDIT_REQUEST,PRODUCT_EDIT_SUCCESS,PRODUCT_EDIT_FAIL,
  
  CLEAR_ERRORS,
} from "../constants/ProductConstants";
import axios from "axios"



//note we used an inner function inside main
// When called, it returns an inner async function that performs an API call and dispatches actions accordingly.
//closure method in js (like decorator in python)
                                              //already we`ve given initial as 0 100000 in product comp, but koi ni yha bhi de diya
export const getproduct=(keyword="",currentpage=1,price=[0,100000],cateory="")=>async(dispatch)=>{ //if keyword kuxh na mile toh by default search fo all

    try {
        dispatch({type:ALL_PRODUCT_REQUEST})  //for loader
        let linkss=`/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}` //(with filtered mongo query)
        if(cateory!=""){
          linkss=`/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${cateory}`
        }
        const { data } = await axios.get(linkss); //from backend , 

        // console.log(data)

        dispatch({type:ALL_PRODUCT_SUCCESS,  payloadamaandata:data}) //sent to reducer, so that it can update
        
    } catch (error) {
        dispatch({
          type:ALL_PRODUCT_FAIL,
          payloadamaandata:error.response.data.message //The expression error.response.data.message is commonly used when handling errors from API responses in JavaScript applications, especially when using libraries like Axios for making HTTP requests.
        })
    }
};

//for particular product reducer
export const getParticularproduct=(id)=>async(dispatch)=>{

  try {
      dispatch({type:PARTICULAR_PRODUCT_REQUEST})  //for loader

      const {data}=await axios.get(`/api/v1/product/${id}`)  //from backend
      
      dispatch({type:  PARTICULAR_PRODUCT_SUCCESS,  payloadamaandata:data.fetchedProduct}) //sent to reducer, so that it can update
      // console.log(data.fetchedProduct,"amaan")
      
  } catch (error) {
      dispatch({
        type:PARTICULAR_PRODUCT_FAIL,
        payloadamaandata:error.response.data.message //The expression error.response.data.message is commonly used when handling errors from API responses in JavaScript applications, especially when using libraries like Axios for making HTTP requests.
      })
  }
};

//get all products (admin)

export const getAdminProductaction=()=>async(dispatch)=>{

  try {
    dispatch({type:ADMIN_PRODUCT_REQUEST})

    const {data}=await axios.get(`/api/v1/admin/products`)
    //  console.log(data)
    dispatch({type:ADMIN_PRODUCT_SUCCESS,payloadamaandata:data.products})
  } catch (error) {
    dispatch({type:ADMIN_PRODUCT_FAIL,
      payloadamaandata:error.response.data.message})
  }
}


//CREATING NEW PRODUCT-->ADMIN

export const newProductCreateAction=(productDetails)=>async(dispatch)=>{
  try {
    dispatch({type:NEW_PRODUCT_REQUEST})
    
    const {data}=await axios.post(`/api/v1/admin/products/create`,productDetails,
      {headers: {'Content-Type': 'application/json'}})
    //  console.log(data)
    dispatch({type:NEW_PRODUCT_SUCCESS,payloadamaandata:data})
  } catch (error) {
    dispatch({type:NEW_PRODUCT_FAIL,
      payloadamaandata:error.response.data.message})
  }
}

//DELETE A PRODUCT
export const productDeleteAction=(id)=>async(dispatch)=>{

  try {
    dispatch({type:PRODUCT_DELETE_REQUEST})

    const {data}=await axios.delete(`/api/v1/admin/products/delete/${id}`)
    //  console.log(data)
    dispatch({type:PRODUCT_DELETE_SUCCESS,payloadamaandata:data})
  } catch (error) {
    dispatch({type:PRODUCT_DELETE_FAIL,
      payloadamaandata:error.response.data.message})
  }
}
//EDIT A PRODUCT
export const productEditAction=(id,updateData)=>async(dispatch)=>{

  try {
    dispatch({type:PRODUCT_EDIT_REQUEST})

    const {data}=await axios.put(`/api/v1/admin/products/update/${id}`,updateData,{
      headers: { "Content-Type": "application/json" }
    })
    //  console.log(data)
    dispatch({type:PRODUCT_EDIT_SUCCESS,payloadamaandata:data})
  } catch (error) {
    dispatch({type:PRODUCT_EDIT_FAIL,
      payloadamaandata:error.response.data.message})
  }
}


//makes all error null. if any occured in store
export const clearError=()=>async(dispatch)=>{
  dispatch({type:CLEAR_ERRORS})
};