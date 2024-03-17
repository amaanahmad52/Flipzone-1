import React, { Fragment, useEffect, useState } from "react";
import TitleData from "../design/TitleData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";

import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner"

import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";

import "./OrderEdit.css";
import { ParticularOrderDetailsAction, clearErrors, myOrdersAction, orderUpdateAction } from "../../actions/OrderAction";
import {toast} from 'react-toastify';

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.particularOrder);
  const { error: updateError, success:updated } = useSelector((state) => state.editProduct);
     const {id}=useParams()

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(orderUpdateAction(id, myForm));
  };

  const dispatch = useDispatch();
  

  const [status, setStatus] = useState("");  //only thing tha need to be updated in this page

  useEffect(() => {
    console.log(updated)
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (updated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: "UPDATE_ORDERS_RESET" });
    }

    dispatch(ParticularOrderDetailsAction(id));
  }, [dispatch, error,id, updated, updateError]);

  return (
    <>
      <TitleData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Spinner />
          ) : (
            // this div will not appear if status is already delivered  
            <div  
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",  //to poora block lelo tum beech waale div , grid pe mat rho
              }}
            >
              <div>
                <div className="confirmshippingArea">
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
                      {/* <p>Address:</p> */}
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
                        className={
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

                <div className="confirmCartItems">
                  <Typography>Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.OrderDetails &&
                      order.OrderDetails.map((item) => (
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
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
