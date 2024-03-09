import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, getAdminProductaction, getParticularproduct, productDeleteAction, productEditAction } from '../../actions/ProductAction';
import { DataGrid } from "@material-ui/data-grid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spellcheck } from '@mui/icons-material'
import CategoryIcon from '@mui/icons-material/Category';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { Button } from "@material-ui/core";
import Title from "../design/TitleData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {toast} from 'react-toastify';


const ProductEdit = () => {
    const categories = [
        "Grocery",
       "phone",
        "Fashion",
       "Laptop",
      "Appliances",
       "Home&Furniture",
       "Computer"
     ];
      const dispatch=useDispatch();
      const {particularproduct,loading}=useSelector((state)=>state.particularproduct)
      const {error,success}=useSelector((state)=>state.editProduct)

      const nav=useNavigate()
      const {id}=useParams()
    const[name,setName]=useState(particularproduct.name)
    const[description,setDescription]=useState(particularproduct.description)
    const[images,setImages]=useState([particularproduct.images])
    const[price,setPrice]=useState(particularproduct.price)
    const[category,setCategory]=useState(  particularproduct.category)
    const[stock,setStock]=useState(particularproduct.stock)
    const[imagesPreview,setImagesPreview]=useState([])

    const handleSubmit=async(e)=>{
        e.preventDefault();
       
        const formData = new FormData();
      
        formData.set("name", name);
        formData.set("description", description);
        formData.set("price", price);
        formData.set("category", category);
        formData.set("stock", stock);
        
        // images.forEach((image) => {
        //   // console.log(typeof images)
        //   // console.log(image)
        //   formData.append("images", image);   //yha pe mene set ki jgh append kia
        //                                     //tha isleye 2d array bn rha tha
        // });
        dispatch(productEditAction(id,formData));
    }

    useEffect(()=>{
        dispatch(getParticularproduct(id))
        
        if(error){
            toast.error(error.message);
            dispatch(clearError())
        }
        if(success){
            toast.success("Successfully Updated");
            nav("/admin/products")
            dispatch({type:"RESET_UPDATE_PRODUCT"})
        }
    },[dispatch,error,success])
  return (
    <>
      <Title data={'Edit Product'}/>
      <div className="dashboard">
      {/* <Sidebar/> */}
        <div className="newProductContainer">

        <form className='createProductForm' encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>
                  <Spellcheck />
                  <input
                    type="text"
                    placeholder='New Product Name'
                    name='Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div>
                  <CurrencyRupeeIcon />
                  <input
                    type="number"
                    placeholder='New Price'
                    name='price'
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                  />
                </div>
                <div className="entername">
                  <DescriptionIcon />
                  <textarea
                    cols="30"
                    rows="1"
                    placeholder='New Description'
                    name='description'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                  >
                  </textarea>
                </div>
                <div>
                  <CategoryIcon />

                    <select onChange={(e)=>setCategory(e.target.value)}>
                      <option value="">Choose New category</option>
                      
                      {categories.map((cat)=>(
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                </div>
                <div>
                  <WarehouseIcon />
                  <input
                    type="number"
                    min="0"
                    placeholder='New Stock Count'
                    name='stock'
                    value={stock}
                    onChange={(e)=>setStock(e.target.value)}
                  />
                </div>
                <div id="createProductFormFile">
                  
                  <input
                    type="file"
                    name="files"
                    accept="image/*"
                    // onChange={}
                    multiple
                  />
                </div>

                <div id="createProductFormImage">
                  
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                  ))}
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading?true:false}
                >
                Update
                </Button>
              </form>
        </div>

      </div>

    </>
  )
}

export default ProductEdit
