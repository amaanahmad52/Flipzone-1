import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, myOrdersAction } from '../../actions/OrderAction'
import { DataGrid } from "@material-ui/data-grid";
import { Link } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import TitleData from "../design/TitleData"
import "./MyOrders.css"
import LaunchIcon from "@material-ui/icons/Launch";
import {toast} from 'react-toastify';
const MyOrders = () => {

    const dispatch = useDispatch()
    const {loading,error,orders}=useSelector((S)=>S.myorders)
    const {user}=useSelector((S)=>S.users)
    // console.log(orders)
    useEffect(()=>{
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
        dispatch(myOrdersAction())
    },[dispatch,error])
    //for table
    
    
    
    
    
    const columns = [ //for givign heading of row
        { field: 'id', headerName: 'Order Id', minWidth: 300, flex: 1 },
        { field: 'status', headerName: 'Status', minWidth: 150,flex: 0.5,cellClassName: (params) => {return params.getValue(params.id, 'status') === 'Delivered' ? 'GreenColor' : 'RedColor'; },},
        { field: 'quantity', headerName: 'Quantity', type: 'number', minWidth: 150, flex: 0.3 },
        { field: 'amount', headerName: 'Amount', type: 'number', minWidth: 270, flex: 0.5 },
        {
          field: 'clickme',
          flex: 0.3,
          headerName: 'Click me',
          minWidth: 150,
          type: 'number',
          sortable: false,
          renderCell: (params) => {
            return (         
              <Link to={`/order/details/${params.getValue(params.id, 'id')}`}>
                <LaunchIcon />
              </Link>
            );
          },
        },
      ];
      
      const rows = [];
   
      orders &&  //for givign data of rows
        orders.forEach((item, index) => {
          rows.push({
            quantity: item.OrderDetails.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
          });
        });
    
  return (
    <>
   <TitleData data={`${user.name}'s orders`} />

    {orders.length===0?(
        <div className="emptyCart">
        <RemoveShoppingCartIcon />

        <Typography>No Orders </Typography>
        <Link to="/products">Explore Products</Link>
      </div>
    ):<>
    
    <>
      <div className='myOrdersPage'>
       
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      </div>
    </>
</>}
    </>
  )
  
}

export default MyOrders
