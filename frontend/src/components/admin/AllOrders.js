import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DataGrid } from "@material-ui/data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Title from "../design/TitleData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {toast} from 'react-toastify';
import Sidebar from './Sidebar';
import { clearErrors, getAllOrdersAction, orderDeleteAction } from '../../actions/OrderAction';


const AllOrders = () => {
  const dispatch=useDispatch();
  const{error,orders,success}=useSelector((state)=>state.getAllOrders)  //first thing is this to get all orders in state
 const {error:deleteerror,success:deletesuccess}=useSelector((state)=>state.ordersdelete)
 //  console.log(products)
 const nav=useNavigate()
 const handleDelete=(id)=>{
  
   dispatch(orderDeleteAction(id))
   
 }

 
 useEffect(()=>{
   if(error){
     toast.error(error.message)
     dispatch(clearErrors())
   }
  
   if(deleteerror){
     toast.error(error.message)
     dispatch(clearErrors())
     
   }  
   if(deletesuccess){
     toast.success("Order Deleted Successfully");
     nav('/admin/orders')
     dispatch({type:"DELETE_ORDERS_RESET"})
   }
   // console.log("Success:", success);
   // console.log("Message:", msg);
   dispatch(getAllOrdersAction())
 },[dispatch,error,success,deletesuccess,deleteerror]);



    
   //rows and columns of datagrid material ui 

   const columns = [
    { field: 'id', headerName: 'Order Id', minWidth: 300, flex: 1 },
    { field: 'status', headerName: 'Status', minWidth: 150,flex: 0.5,cellClassName: (params) => {return params.getValue(params.id, 'status') === 'Delivered' ? 'GreenColor' : 'RedColor'; },},
    { field: 'quantity', headerName: 'Quantity', type: 'number', minWidth: 150, flex: 0.5 },
    { field: 'amount', headerName: 'Amount', type: 'number', minWidth: 270, flex: 0.5 },
    {field: "Click me",flex: 0.3,headerName: "Click me",minWidth: 150,type: "number",sortable: false,
     renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button onClick={()=>{handleDelete(params.getValue(params.id, "id"))}}>
              <DeleteIcon />
            </Button>
          </> 
        );
      },
    },
  ];

  const rows = [];

  orders && orders.forEach((item) => {
      rows.push({id: item._id,status: item.orderStatus,quantity: item.OrderDetails.length,amount: item.totalPrice});
    });
  return (
    <>
    <Title data={'All orders -Admin'}/>

    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
    </div>
      
    </>
  )
}

export default AllOrders
