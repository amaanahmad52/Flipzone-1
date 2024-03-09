import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, getAdminProductaction, productDeleteAction } from '../../actions/ProductAction';
import { DataGrid } from "@material-ui/data-grid";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@material-ui/core";
import Title from "../design/TitleData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {toast} from 'react-toastify';
import Sidebar from './Sidebar';
import "./AllProducts.css"
import ProductEdit from './ProductEdit';
const AllProducts = () => {
  
     const dispatch=useDispatch();
     const {error,products}=useSelector((state)=>state.adminProducts)
     const {deleteerror,success,msg}=useSelector((state)=>state.deleteProduct)
    //  console.log(products)
    const nav=useNavigate()
    const handleDelete=(id)=>{
     
      dispatch(productDeleteAction(id))
      
    }

    
    useEffect(()=>{
      if(error){
        toast.error(error.message)
        dispatch(clearError())
      }
      //these are not working
      if(deleteerror){
        toast.error(deleteerror.message)
        dispatch(clearError())
        
      }
      if(success){
        toast.success(msg);
        nav('/admin/dashboard')
        dispatch({type:"DELETE_PRODUCT_RESET"})
      }
      // console.log("Success:", success);
      // console.log("Message:", msg);
      dispatch(getAdminProductaction())
    },[dispatch,error,deleteerror,success,msg]);
  

    //rows and columns of datagrid material ui 

    const columns = [
        {field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        {field: "name",headerName: "Name",minWidth: 350,flex: 1},
        {field: "stock",headerName: "Stock",type: "number",minWidth: 150,flex: 0.3},
        {field: "price",headerName: "Price",type: "number",minWidth: 270,flex: 0.5,},
    
        {field: "Click me",flex: 0.3,headerName: "Click me",minWidth: 150,type: "number",sortable: false,
         renderCell: (params) => {
            return (
              <>
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
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

      products && products.forEach((item) => {
          rows.push({id: item._id,stock: item.stock,price: item.price,name: item.name});
        });
  return (
    <>
     <Title data={'All Products'}/>
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

export default AllProducts
