
import './App.css';

import {BrowserRouter ,Routes,Route,Navigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import Webfont from "webfontloader"
import Header from './components/design/Header/Header';
import Footer from './components/design/Footer/Footer';
// import About from './components/About';
import Home from './components/Home/Home';
import LoadingBar from 'react-top-loading-bar'
import Products from './components/Product/Products';
import ParticularProduct from './components/Product/ParticularProduct';
import Search from './components/Product/Search';
import LoginSignUp from './components/user/LoginSignUp';
import Account from './components/user/Account';
import { useDispatch, useSelector } from 'react-redux';
import UserOptions from "./components/user/UserOptions"
import UpdateProfile from './components/user/UpdateProfile';
import ResetPassword from './components/user/ResetPassword';
import ForgotPassword from './components/user/ForgotPassword';
import EmailResetPassword from "./components/user/EmailResetPassword"
import Cart from "./components/Cart/Cart"
import Shipping from './components/Cart/Shipping';
import axios from "axios"
import { loadUser } from './actions/userAction';
import Checkout from './components/Cart/Checkout';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Success from './components/Cart/Success';
import MyOrders from './components/Orders/MyOrders'
import OrderDetails from "./components/Orders/OrderDetails"
import ProtectedRoute from './ProtectedRoute';
import AdminProtectedRoute from "./AdminProtectedRoute"
import Dashboard from './components/admin/Dashboard';
import AllProducts from './components/admin/AllProducts';

import store from "./store"//mast method to call an action :
import NewProduct from './components/admin/NewProduct';
import ProductEdit from './components/admin/ProductEdit';

import AllOrders from './components/admin/AllOrders';

function App() {
  //now if user is autheticated then a  speed dialer will appear
  const dispatch =useDispatch()
  const {isAuthenticated,user,loading}=useSelector((state)=>state.users)  //<---------------------------
   
  //for getting stripe key(i added this at end)
  const[stripeKey,setStripeKey] =useState("")
  //getting key from backend call api

  const getkey=async()=>{
    const { data } = await axios.get(`/api/v1/publishableKey`);
    setStripeKey(data.key)
  }
  //we call it in use effect, as it is out of react scope thing to call api
  

 useEffect(()=>{  //this will run as our site loads, this file is main of react app
  Webfont.load({
    google:{
      families:["Roboto","Poppins"]
    }
    
  }) 
   store.dispatch(loadUser()) //jese hi koi page khulega , state pe user aa jaega (if logged in)as its root parent component
    // dispatch(loadUser())
    getkey()
    
},[]);
//jgjg
  // user&& console.log(user.role);
  return (
    <>
    
  
   

    <BrowserRouter>
    <Header/>
    <LoadingBar
        color='#f11946'
        progress='100'
        
      />
          {/* for speed dial */}
        
          {isAuthenticated===true && user && <UserOptions user={user}/>}
      <Routes>
        
        <Route  exact path='/'  element={<Home/>}></Route>
        <Route  exact path='/product/:id'  element={<ParticularProduct/>}></Route>
        <Route  exact path='/products'  element={<Products/>}></Route>
        <Route  path='/products/:keyword'  element={<Products/>}></Route>
        <Route  exact path='/search'  element={<Search/>}></Route>
        <Route  exact path='/login'  element={<LoginSignUp/>}></Route>
        <Route  exact path='/password/forgot'  element={<ForgotPassword/>}></Route>

        {/* //conditional routing */}
        
        <Route element={<ProtectedRoute/>}>
             
              <Route path='/account' element={<Account/>} />
              <Route path='/me/update' element={<UpdateProfile/>} />
              <Route path='/password/update' element={<ResetPassword/>} />
             
              <Route path='/shipping' element={<Shipping/>} />
              <Route path='/order/confirm' element={<ConfirmOrder/>} />
              <Route path='/order/details/:pid' element={<OrderDetails/>} />
              <Route path='/success' element={<Success/>} />
              <Route path='/orders' element={<MyOrders/>} />
              <Route path='/payment' element={ <Elements stripe={loadStripe(stripeKey)}>
                <Payment />
              </Elements>} />

              

        </Route>
       
       
        
        {/* <Route exact path="/me/update"element={isAuthenticated ? (<UpdateProfile/>) : (<Navigate replace to={"/"} />)}/>
        <Route exact path="/password/update"element={isAuthenticated ? (<ResetPassword/>) : (<Navigate replace to={"/"} />)}/>
         */}
         
        <Route exact path='/user/resetPassword/:token'  element={<EmailResetPassword/>}></Route>

        <Route  exact path='/cart'  element={<Cart/>}></Route>
        
       {/* related to admin */}


       <Route element={<AdminProtectedRoute isAdmin={true}/>}>
          <Route  exact path='/admin/Dashboard'  element={<Dashboard/>}></Route>
      </Route>
      
      <Route element={<AdminProtectedRoute isAdmin={true}/>}>
          <Route  exact path='/admin/products'  element={<AllProducts/>}></Route>
      </Route>
      <Route element={<AdminProtectedRoute isAdmin={true}/>}>
          <Route  exact path='/admin/product'  element={<NewProduct/>}></Route>
      </Route>
      <Route element={<AdminProtectedRoute isAdmin={true}/>}>
          <Route  exact path='/admin/product/:id'  element={<ProductEdit/>}></Route>
      </Route>
      <Route element={<AdminProtectedRoute isAdmin={true}/>}>
          <Route  exact path='/admin/orders/'  element={<AllOrders/>}></Route>
      </Route>













        {/* <Route exact path="/shipping"element={isAuthenticated && loading===false? (<Shipping/>) : (<Navigate replace to={"/"} />)}/>
        <Route exact path="/order/confirm"element={isAuthenticated ? (<ConfirmOrder/>) : (<Navigate replace to={"/"} />)}/> */}
       
        {/* <Elements stripe={loadStripe(stripeKey)}>
        <Route exact path="/payment"element={isAuthenticated ? (<Payment/>) : (<Navigate replace to={"/"} />)}/>
        </Elements> */}

        {/* {stripeKey && (
          <Elements stripe={loadStripe(stripeKey)}>
            <Route exact path="/payment"element={isAuthenticated ? (<Payment/>) : (<Navigate replace to={"/"} />)}/>
          </Elements>
        )} */}

        {/* {stripeKey && (
          <Route
            path="/payment" 
            element={isAuthenticated?(
              <Elements stripe={loadStripe(stripeKey)}>
                <Payment />
              </Elements>
            ): (<Navigate replace to={"/"} />)}
          />
        )} */}
        {/* <Route exact path="/success"element={isAuthenticated ? (<Success/>) : (<Navigate replace to={"/"} />)}/>
        <Route exact path="/orders"element={isAuthenticated ? (<MyOrders/>) : (<Navigate replace to={"/"} />)}/> */}
        {/* <Route exact path="/order/details/:pid"element={isAuthenticated===true ? (<OrderDetails/>) : (<Navigate replace to={"/"} />)}/> */}
        



      </Routes>

              {/* add protected route feature as state is updating immediately so no reload working */}

      <Footer/>
    </BrowserRouter>
    
    </>
    
  );
}

export default App;

