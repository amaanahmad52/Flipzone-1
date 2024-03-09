import { useEffect } from "react";
import "./Home.css";
import Spinner from "../Spinner"
import Featured from "./Featured";
import TitleData from "../design/TitleData";
import {useAlert} from "react-alert"
import { useSelector,useDispatch} from "react-redux";
import { getproduct } from "../../actions/ProductAction";  //imported the action to call it



const Home = () => {

  const dispatch=useDispatch()  //this will help to call the desired action
  const{loading,error,products,productsCount}=useSelector((state)=>state.products)//ye data mil gya store se  (products<-- name whi hai jo combine reducer pe diya tha)
  const alert=useAlert()
  useEffect(()=>{   
    if(error){
      return alert.error(error) 
    }     
    dispatch(getproduct())
  },[dispatch,error])

//  console.log("hi")
//  console.log(products)
  
  
  
  //   useEffect: This is the hook that allows you to perform side effects in functional components. It takes two arguments: a callback function and a dependency array.
  
  // () => { dispatch(getproduct()); }: This is the callback function that gets executed when the component mounts or when the dispatch function changes. It dispatches the action getproduct().
  
  // [dispatch]: This is the dependency array. It tells React that the effect depends on the value of dispatch. When any value in the dependency array changes, the effect will re-run. If the dependency array is empty ([]),

  return (
    <>
    {loading? <Spinner/> :<>
      <TitleData data="FlipZone"/>
      <div className="headTop">
        <span>Your shopping is as unique as you are</span>
        <p>Empowering Shoppers, Enriching Lives. </p>
        <h1><button type="button" class="btn btn-dark">Shop Now</button></h1>

        <a href="/">
        
        </a>
      </div>
      <h2 className="homeHeading">BEST OF FLIPZONE EXCLUSIVE BRANDS</h2>

      <div className="container">
        <div className="row ">
          
        
        {products && products.length>0? (products.map((product) => (
                <Featured key={product._id} product={product} />
              ))) :(<p>Loading...</p>)}
          

        </div>
      </div>
    </>}
    </>
  );
};

export default Home;
