import React, { useEffect, useRef } from 'react'
import Checkout from './Checkout'
import TitleData from '../design/TitleData'

import { Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
   CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearErrors, orderAction } from '../../actions/OrderAction';

const Payment = () => {
  const dispatch=useDispatch()


  const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"))
  // const shippingInfo=JSON.parse(localStorage.getItem("shippingInfo"))
  const {cartItems,shippingInfo}=useSelector((s)=>s.cart)
  const{error}=useSelector((s)=>s.orders)
  
  const orderDetailsobject = {
    DeliveryAddress:shippingInfo,
    OrderDetails:cartItems,
    //payment object from stripe
    itemPrice:orderInfo.subtotal,
    taxPrice:orderInfo.tax,
    totalPrice:orderInfo.totalPrice,
    shippingPrice:orderInfo. shippingCharges,
  }

  
  
  
  //stripe related
  const elements = useElements();
  const stripe=useStripe()
  const paybtn=useRef(null)

  const{user}=useSelector((s)=>s.users)
  const nav=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    paybtn.current.Disabled=true

  try {

    const paymentData={
      amount:(orderInfo.totalPrice*100), //stripe consider in paisa
    }
    const { data } = await axios.post(`/api/v1/process/payment`, paymentData, {
      headers: { 
        
        "Content-Type": "application/json" }
    });

    const client_secret=data.client_secret

    if(!stripe || !elements)return;
    
    const result = await stripe.confirmCardPayment(client_secret,{
      payment_method:{
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: user.name,
          email: user.email,
          address: {
            line1: shippingInfo.address,
            postal_code: shippingInfo.pinCode,
            city: shippingInfo.city,
            state: shippingInfo.state,
            country: shippingInfo.country,
          },
        },
      },
    });
      if(result.error){
        paybtn.current.Disabled=false
        toast.error(result.error.message);
      }
      else{
        if(result.paymentIntent.status==="succeeded"){
          orderDetailsobject.PaymentDetails = {////
            pid: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(orderAction(orderDetailsobject))  //order placed
        nav("/success")
        }
        else{
          toast.error("Some Error occurred")
        }
        
      }
  } catch (error) {
    paybtn.current.Disabled=false
    toast.error(error.response.data.message)
  }


  
}


//if order krte waqt koi error aya


useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }
}, [dispatch, error]);

  return (
    <div>
        <TitleData data={"Payment"}/>
        <Checkout konsaActive={2} />
        
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e)=>handleSubmit(e)}>
            <Typography >Payment Details</Typography>
              <div >
                    <CreditCardIcon />
                    <CardNumberElement className='paymentInput'/>
              </div>
              <div >
                    <EventIcon />
                    <CardExpiryElement className='paymentInput'/>
              </div>
              <div >
                    <VpnKeyIcon />
                    <CardCvcElement className='paymentInput'/>
              </div>
            <input 
            type="submit" 
            className='paymentFormBtn'
              value={`Pay- ₹${orderInfo && orderInfo.totalPrice}/-`}
              ref={paybtn}
            />
          </form>
        </div>

     
    </div>
  )
}

export default Payment


//publishable key se token bnaya gya react dwaara, then api call kri react ne 
//there in backend a payment intent created and a client secret key is responde
//with this key and all the details of user payment is confirmed


// Front end:

// Creates a paymentmethod with a given card or saved card.
// Sends POST /pay API to backend
// Backend:

// Receives API (validates if user is auth or not - in our case)

// Creates a payment intent to be sent to stripe with paymentmethodID from frontend AND customerID gotten from our backend (Stripe's customer id that we created beforehand) Stripe returns us the paymentmethod with status.