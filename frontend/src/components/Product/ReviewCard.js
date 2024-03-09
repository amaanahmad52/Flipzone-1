import React from 'react'
import ReactStars from "react-rating-stars-component";
import "./ReviewCard.css";
const ReviewCard = ({rev}) => {
    const options={
        count: 5,
        value:rev.rating,
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
     



        <div className="col-md-3 my-2 " >
        {/* //optional div  below */}
              <div className="d-flex flex-row mb-3">  
                <div className="card">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png" //will be updaated later 
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{rev.name}</h5>
                    <div className='d-flex'><ReactStars {...options}/> <span className='mt-2' style={{fontFamily:"Roboto", marginLeft:"5px"}}>(  {rev.rating} reviews)</span></div>
                    
                    <p className="card-text" style={{color:"#c53a44" , fontWeight:"bolder",fontFamily:"Roboto"}}>{rev.comment}</p>
                  </div>
                </div>
              </div>
           
          </div>
    </>
  )
}

export default ReviewCard













// <div className="d-flex flex-row mb-3" style={{display: "flex", alignItems:"center"}}>
// <div className="card" style={{margin:"0px 450px 20px 450px"}}>
//   <img
//     src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
//     className="card-img-top"
//     alt="..."
//     style={{width:"135px"}}
//   />
//   <div className="card-body">
//     <h5 className="card-title">{rev.name}</h5>
//     <div className='d-flex'><ReactStars {...options}/> <span className='mt-2' style={{fontFamily:"Roboto", marginLeft:"5px"}}>( {rev.rating} reviews)</span></div>
    
//     {/* <p className="card-text" style={{color:"#c53a44" , fontWeight:"bolder",fontFamily:"Roboto"}}>₹{rev.Fuser}</p> */}
//   </div>
// </div>
// </div>
// </div>