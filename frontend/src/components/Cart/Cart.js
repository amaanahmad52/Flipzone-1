import React, { useState } from 'react'
import "./Cart.css"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartCard from './CartCard'
import { AddToCartAction, deleteCartItemsAction } from '../../actions/CartAction'
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import {toast} from 'react-toastify';
import TitleData from "../design/TitleData"
const Cart = () => {

   
    const dispatch=useDispatch()
    const nav=useNavigate()
    const{cartItems}=useSelector((s)=>s.cart)  
    const {isAuthenticated}=useSelector((s)=>s.users)
    //for updating quantity realtime in state
  
    
    
    const handledecrease=(id,quantity)=>{
        const x=quantity-1;
        if(x<=0){
            dispatch(deleteCartItemsAction(id))
            return;
        };
       
        dispatch(AddToCartAction(id,x))
    }
    const handleincrease=(id,stock,quantity)=>{
        const x=quantity+1;
        if(x>stock){
            toast.info("Ah ! No more stock!")
            return;
        }
        
        dispatch(AddToCartAction(id,x))
    }  
    const checkoutHandler=()=>{
        if(!isAuthenticated){
            nav('/login')
         } else{
            nav('/shipping')
         }
        // console.log(isAuthenticated)
    }
  return (
    <>
     <TitleData data={'Cart'}/>
    {cartItems.length===0?(
        <div className="emptyCart">
        <RemoveShoppingCartIcon />

        <Typography>No Product in Your Cart</Typography>
        <Link to="/products">View Products</Link>
      </div>
    ):<>
    
     <h1 style={{marginBottom:"0px",marginTop:"0px"}}>YOUR CART</h1>
    <div className='cartPage'>
       
        <div className="header">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
        </div>

        {cartItems && cartItems.map((i) => (
            <div className="cartContainer" key={i.product}>
                <CartCard items={i} />

                <div className="cartInput">
                    <button onClick={() => handledecrease(i.product, i.quantity)}>-</button>
                    <input readOnly value={i.quantity} type="number" />
                    <button onClick={() => handleincrease(i.product, i.stock, i.quantity)}>+</button>
                </div>

                <p className="cartSubtotal">{`₹${i.price * i.quantity}`}</p>
            </div>
        ))}

        <div className="cartGrossProfit">

            <div></div>
            <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce((total, item) => total + item.quantity*item.price, 0)}`}</p>

                

            </div>
            <div></div>
            <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
            </div>

        </div>

    </div>      
</>}
    </>
  )
}

export default Cart
