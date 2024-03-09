import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from "./Sidebar"
import { Spellcheck } from '@mui/icons-material'
import CategoryIcon from '@mui/icons-material/Category';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import {toast} from 'react-toastify';
import { clearError, newProductCreateAction } from '../../actions/ProductAction';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/ProductConstants';
import { Button } from '@material-ui/core';
import Title from "../design/TitleData";
import "./NewProduct.css"
const NewProduct = () => {
  const categories = [
    "Grocery",
   "phone",
    "Fashion",
   "Laptop",
  "Appliances",
   "Home&Furniture",
 ];
  const dispatch=useDispatch();
  const {loading,error,success}=useSelector((state)=>state.newProductCreate)
  const nav=useNavigate()
 
  useEffect(()=>{
    if(error){
      toast.error(error.message)
      dispatch(clearError())
    }
    if(success){
      toast.success("Product Created Successfully")
      nav('/admin/dashboard')
      dispatch({type:NEW_PRODUCT_RESET})  //dobara wrna product bna nhi skte. kyuki state pe success hai. so again intialize create product state
    }                                     //this will make success=false
   
  },[dispatch,success,error])
   
      const[name,setName]=useState("")
      const[description,setDescription]=useState("")
      const[images,setImages]=useState([])
      const[price,setPrice]=useState(0)
      const[category,setCategory]=useState("")
      const[stock,setStock]=useState(0)
      const[imagesPreview,setImagesPreview]=useState([])


    const handleFileAdd=(e)=>{
        // const AddedImages=Array.from(e.target.files) //will create an array of images from entered images

        // //read all images

        // //make these empty and now one by one push images into them
        // setImages([])
        // setImagesPreview([])  

        // AddedImages.forEach((file)=>{
        //   //read all one by one and inser in state array
        //   const readerSingh=new FileReader();

        //     readerSingh.onload=()=>{
        //         if(readerSingh.readyState===2){ //means reading completed
        //           // setImage((already) => already.concat(readerSingh.result));   //2 methods written
        //           setImagesPreview((already)=>[...already,readerSingh.result])
        //           setImages((already)=>[...already,readerSingh.result])
        //         }
        //     }
         
        //   readerSingh.readAsDataURL(file)  //reads in form of base 16 url
        // })


        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
        

    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
      
        formData.set("name", name);
        formData.set("description", description);
        formData.set("price", price);
        formData.set("category", category);
        formData.set("stock", stock);
        
        images.forEach((image) => {
          // console.log(typeof images)
          // console.log(image)
          formData.append("images", image);   //yha pe mene set ki jgh append kia
                                            //tha isleye 2d array bn rha tha
        });
        
        
        dispatch(newProductCreateAction(formData));
         
       
      
    };

  return (
    <>
  <Title data={'Create Product'}/>
      <div className="dashboard">
      <Sidebar/>
        <div className="newProductContainer">

        <form className='createProductForm' encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>
                  <Spellcheck />
                  <input
                    type="text"
                    required
                    placeholder='Enter Product name'
                    name='Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div>
                  <CurrencyRupeeIcon />
                  <input
                    type="number"
                    required
                    placeholder='price'
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
                    placeholder='Description'
                    name='description'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                  >
                  </textarea>
                </div>
                <div>
                  <CategoryIcon />
                    <select onChange={(e)=>setCategory(e.target.value)}>
                      <option value="">Choose category</option>
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
                    required
                    placeholder='Stock Available'
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
                    onChange={handleFileAdd}
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
                Create
                </Button>
              </form>
        </div>

      </div>
    </>
  )
}

export default NewProduct
