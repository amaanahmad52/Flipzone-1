import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import ParticularProduct from '../Product/ParticularProduct';
const Featured = ({product}) => {
    const options={
        count: 5,
        value:product.ratings,
        size: window.innerWidth < 600 ? 20:25,
        isHalf: true,
        emptyIcon: "<i className=\"far fa-star\"></i>",
        halfIcon: "<i className=\"fa fa-star-half-alt\"></i>",
        fullIcon: "<i className=\"fa fa-star\"></i>",
        activeColor: "#ffd700",
        edit:false,
    }
  return (
    <>
     <div className="col-md-3 my-2">
  <Link to={`/product/${product._id}`} className="featured" style={{ height: "100%" }}>
    <div className="card" style={{ width: "100%", height: "100%" }}>
      <img
        src={product.images[0].url}
        className="card-img-top"
        alt="..."
        style={{ height: "100%" }}
      />
      <div  className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{product.name}</h5>
        <div className="d-flex">
          <ReactStars {...options} />
          <span className="mt-2" style={{ fontFamily: "Roboto", marginLeft: "5px" }}>
            ( {product.numOfReviews} reviews)
          </span>
        </div>
        <p  className="card-text" style={{color: "#c53a44", fontWeight: "bolder", fontFamily: "Roboto" }}>
          ₹{product.price}
        </p>
      </div>
    </div>
  </Link>
</div>

    </>
  )
}

export default Featured
