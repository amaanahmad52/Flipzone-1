import React, { useEffect, useState,useRef } from 'react'
import "./Products.css"
import "./Pagi.css"
import Spinner from "../Spinner"
import Featured from '../Home/Featured';
import TitleData from "../design/TitleData";
import { useSelector,useDispatch} from "react-redux";
import { useParams } from 'react-router-dom';
import { getproduct,clearError } from "../../actions/ProductAction";  //imported the action to call it

import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import Typography from "@mui/material/Typography"
import { CallEnd } from '@mui/icons-material';

const categories = [
   "Grocery",
  "phone",
   "Fashion",
  "Laptop",
 "Appliances",
  "Home&Furniture",
];
const Products = () => {
  
  const {keyword}=useParams() //curly braces are must here ,, this i used when product is searched from search page
  const dispatch=useDispatch()

  //for pagination npm 
  const[currentpage,setCurrentPage]=useState(1);

  const setCurrentPageNumber=(e)=>{
    setCurrentPage(e);
  }
   
  
  //slider 
  const[price,SetPrice]=useState([0,100000]); //range betwen 0 to 25000 intially , yhi hum dispatch pe bhej dege

  const handleSliderChange=(e,value)=>{
    SetPrice(value)
  }
 //for category
  const[category,SetCategory]=useState("");


  const{loading,products,errors,productCount,kitnaperpage,filteredProductsCount}=useSelector((s)=>s.products) //product is name of state
  console.log(keyword)
  useEffect(()=>{
    dispatch(getproduct(keyword,currentpage,price,category))
  },[dispatch,keyword,currentpage,price,category]) //jab jab price change hogi, tab tab component re-render hoga, aur ye price array har baar jaega aur get product ko call krega redux store se

  
  return (
    <>
     {loading?<Spinner/>:
     (
      <>
      <TitleData data="Products--FlipZone"/>
        {filteredProductsCount>0 && <h1>products</h1>}
      <div className="container" style={{margin:"0px  200px",minHeight:"60vh"}}>
      <div className="row" style={{ display:"flex",flexWrap:"wrap",padding:"0.5vmax",justifyContent:"center"}}> {/* Add justify-content-center */}
        {products && products.length > 0 ? (
          products.map((product) => (
            <Featured key={product._id} product={product} />
          ))
        ) : (
          <Typography className='visitAgain' >Visit Again !</Typography>
        )}
      </div>
  
    </div>
     {/* i have used npm package of pagination  */}
     {kitnaperpage<filteredProductsCount &&  //if filtered are not adjusting in one page
     <div className='pagi'>
     <Pagination   
       activePage={currentpage}
       itemsCountPerPage={kitnaperpage}
       totalItemsCount={productCount}
      
       onChange={setCurrentPageNumber}
       firstPageText="First"
       prevPageText="Prev"
       nextPageText="Next"
     
       lastPageText="Last"
       itemClass="page-item"
       linkClass="page-link"    //yaha se items ko class milegi, tbhi css lga  payege.. u can see it in inspect
       activeclass="pageItemActive"
       activeLinkclass="pageLinkActive"
     />
   </div>}
      {/* //now adding filters */}
      <div className="filterbox">
        <Typography  >
          price
        </Typography>
        <Slider 
          value={price}
          min={0}
          max={1e5}
          onChange={handleSliderChange}
          aria-labelledby='range-slider'
          valueLabelDisplay="auto"
          
        />

        {/* adding categories */}
        <Typography>Categories</Typography>
          
              
          <ul className="categoryBox">
           {categories.map((cat)=>(
               <li 
               className="category-link"
               key={cat}
               onClick={()=>SetCategory(cat)}
               >
                {cat}
               </li>
           ))}

         </ul>
      </div>
                     
      </>
     )}
   
    </>
  )
}

export default Products
