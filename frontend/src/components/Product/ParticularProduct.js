import React, { useState, useEffect } from "react";
import "./ParticularProduct.css";
import "./ReviewCard.css";
import TitleData from "../design/TitleData";
import { useParams } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import Spinner from "../Spinner";
import Reviewcard from "../Product/ReviewCard";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from 'react-redux';
import { AddToCartAction } from "../../actions/CartAction";
import {toast} from 'react-toastify';
const ParticularProduct = () => {
  const { id } = useParams();
  const dispatch=useDispatch();

  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/product/${id}`);
        setProd(response.data.fetchedProduct[0]);
        setLoading(false);
        console.log(response.data.fetchedProduct[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const images =
    prod && prod.images
      ? prod.images.map((itemimg) => ({ url: itemimg.url }))
      : [
          {
            url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
          },
        ];

  const options = {
    count: 5,
    value: prod ? prod.ratings : 0, // Set a default value or handle it as needed
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
    emptyIcon: '<i className="far fa-star"></i>',
    halfIcon: '<i className="fa fa-star-half-alt"></i>',
    fullIcon: '<i className="fa fa-star"></i>',
    activeColor: "#ffd700",
    edit: false,
  };
  let revi=false;

  const[quantity,setQuantity] =useState(1);
  const handledecrease=()=>{
    const x=quantity-1;
    if(x<=0)return;
    setQuantity(x)
  }
  const handleincrease=()=>{
    const x=quantity+1;
    if(x>prod.stock)return;
    setQuantity(x)
  }

  
  const handlecartadd=()=>{
    
    dispatch(AddToCartAction(id,quantity))
    toast.success("Item added successfully")
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TitleData data={`${prod.name}--FlipZone` }/>
          <div className="ProductDetails">
            <div className="container" style={{ marginTop: "3vmax" }}>
              {images.length > 0 ? (
                <SimpleImageSlider
                  width={450}
                  height={400}
                  images={images}
                  showBullets={true}
                  showNavs={true}
                  slideDuration={0.5}
                  bgColor="white"
                  navSize={20}
                  autoPlay={true}
                  useGPURender={true}
                  autoPlayDelay={2}
                />
              ) : (
                <p>No images available.</p>
              )}
            </div>
            <div>
              <div>
                <div className="detailsBlock-1">
                  <h2>{prod.name}</h2>
                  <p>Product # {prod._id}</p>
                </div>
              </div>
              <div className="detailsBlock-2">
                {prod && <ReactStars {...options} />}
                <span> ({prod ? prod.numOfReviews : 0} Reviews) </span>
              </div>
              <div className="detailsBlock-3">
                <h1>Rs{prod.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button on onClick={handledecrease}>-</button>
                    <input readOnly  value={quantity} type="number" />
                    <button on onClick={handleincrease}>+</button>
                  </div>
                  <button disabled={prod.stock<1?true:false}onClick={handlecartadd}>Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={prod.stock < 1 ? "redColor" : "greenColor"}>
                    {prod.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{prod.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          {prod && prod.numOfReviews>0? <h2 className="reviews">REVIEWS</h2>:(
                revi=true
              )}
          <div className="container">
            <div className="row">
              {prod && prod.numOfReviews > 0 && prod.reviews.length > 0 ? (
                prod.reviews.map((review) => (
                  <Reviewcard key={review._id} rev={review} />
                ))
              ): (revi && <p className="reviews">No Reviews Yet</p>)}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ParticularProduct;
