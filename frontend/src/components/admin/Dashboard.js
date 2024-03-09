import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

import "./Dashboard.css"

import { Typography } from '@material-ui/core'
import { Doughnut, Line } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProductaction } from '../../actions/ProductAction';
import { getAllOrdersAction } from '../../actions/OrderAction';
import { getAllUsersAction } from '../../actions/userAction';
const Dashboard = () => {


  const dispatch=useDispatch();
  const {products}=useSelector((state)=>state.adminProducts)
  const {orders,total}=useSelector((state)=>state.getAllOrders)
  const {UsersDetails}=useSelector((state)=>state.getAllusers)
  // console.log(users)

    //to get out of stocks count
    let outOfStock=0
    products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  
    //to get full amount count
    // let total = 0;
    // orders &&
    //   orders.forEach((item) => {
    //     total += item.totalPrice;
    // });


  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, total],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  

 useEffect(()=>{
     dispatch(getAdminProductaction())
     dispatch(getAllOrdersAction())
     dispatch(getAllUsersAction())
 },[dispatch]);
  return (
    <>
      <div className="dashboard">
            {/* sidebar */}
          <Sidebar/>
        {/* dashboard at right */}
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummary">
             <div>
              <p>
                Total Amount <br /> ₹{total}
              </p>
              </div>
              <div className="dashboardSummaryBox2">
                <Link to="/admin/products">
                  <p>Product</p>
                  <p>{products && products.length}</p>
                </Link>
                <Link to="/admin/orders">
                  <p>Orders</p>
                  <p>{orders && orders.length}</p>
                </Link>
                <Link to="/admin/users">
                  <p>Users</p>
                  <p>{UsersDetails && UsersDetails.length}</p>
                </Link>
              </div>
           
          </div>

          <div className="lineChart">
          <Line data={lineState} />
        </div>   

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
        </div>
      </div>

      
    </>
  )
}

export default Dashboard
