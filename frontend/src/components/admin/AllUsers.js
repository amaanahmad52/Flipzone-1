import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DataGrid } from "@material-ui/data-grid";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@material-ui/core";
import Title from "../design/TitleData";

import DeleteIcon from "@material-ui/icons/Delete";
import {toast} from 'react-toastify';
import Sidebar from './Sidebar';
import "./AllProducts.css"
import InfoIcon from '@mui/icons-material/Info';
import {getAllUsersAction, clearErrors, UserDeleteByAdminAction } from "../../actions/userAction"
const AllProducts = () => {
  
     const dispatch=useDispatch();
     const {error,UsersDetails}=useSelector((state)=>state.getAllusers)
     const {error:deleteError,success,message}=useSelector((state)=>state.deleteUser)
    //  console.log(products)
    const nav=useNavigate()
    const handleDelete=(id)=>{
     
      dispatch(UserDeleteByAdminAction(id))
      
    }
   

    
    useEffect(()=>{
      dispatch(getAllUsersAction())

      if(error){
        toast.error(error.message)
        dispatch(clearErrors())
      }
      if(deleteError){
        toast.error(deleteError.message)
        dispatch(clearErrors())
      }
      
      if(success){
        toast.success(message)
      }
     
    },[dispatch,error,deleteError,success,message]);
  

    //rows and columns of datagrid material ui 

    const columns = [
        {field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
        {field: "name",headerName: "Name",minWidth: 200,flex: 0.4},
        {field: "email",headerName: "E-mail",minWidth: 350,flex: 1},
        {field: "role",headerName: "Role",minWidth: 100,flex: 0.3,cellClassName: (params) => {return params.getValue(params.id, 'role') === 'admin' ? 'RedColor' : 'GreenColor'; },},
    
        {field: "action",flex: 0.3,headerName: "Action",minWidth: 150,sortable: false,
         renderCell: (params) => {
            return (
              <>
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                  <InfoIcon />
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

      UsersDetails && UsersDetails.forEach((item) => {
          rows.push({id: item._id,name: item.name,email: item.email,role: item.role});
        });
  return (
    <>
     <Title data={'All Users'}/>
      <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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
