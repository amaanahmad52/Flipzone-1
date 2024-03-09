import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import { toast } from 'react-toastify';
import TitleData from "../design/TitleData";
import { ParticularOrderDetailsAction, clearErrors } from '../../actions/OrderAction';
import Spinner from "../Spinner"
import "./OrderDetails.css"
const OrderDetails = () => {
  const  {pid}  = useParams(); //name should be same as what u given on backend  pid here
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((s) => s.particularOrder);
   console.log(pid)
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

   
      dispatch(ParticularOrderDetailsAction(pid));
    
  }, [dispatch, error,pid]);

  
  
  return (
    <>
    {loading?<Spinner/>:(
      <>
        <TitleData data={"Order Details"} />
        <div className="orderDetailsPage"></div>
          <div className="orderDetailsContainer">
           <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
         
        <div className="orderDetailsContainerBox">

              <div>
                <p>Name:</p>
                <span>{order.Fuser && order.Fuser.name}</span>
              </div>

              <div>
                <p>Phone:</p>
                <span>
                  {order.DeliveryAddress && order.DeliveryAddress.PhoneNumber}
                </span>
              </div>

               <div>
                  <p>Address:</p>
                  <span>
                    {order.DeliveryAddress &&
                      `${order.DeliveryAddress.Address}, ${order.DeliveryAddress.City}, ${order.DeliveryAddress.state}, ${order.DeliveryAddress.Pincode}, ${order.DeliveryAddress.country}`}
                  </span>
                </div>
          </div>
          <Typography>Payment</Typography>
          <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className ={
                      order.PaymentDetails &&
                      order.PaymentDetails.status === "succeeded"
                        ? "GreenColor"
                        : "RedColor"
                    }
                  >
                    {order.PaymentDetails &&
                    order.PaymentDetails.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "GreenColor"
                        : "RedColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
              </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.OrderDetails&&order.OrderDetails.map((item)=>(
                  <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product}`}>
                    {item.name}
                  </Link>{" "}
                  <span>
                    {item.quantity} X ₹{item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
                ))}
              </div>
            </div>
      </>
     
    )}
     
    </>
  );
};

export default OrderDetails;
