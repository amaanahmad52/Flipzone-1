import React from 'react'
import { Link } from 'react-router-dom'
import "./CartCard.css"
import { deleteCartItemsAction } from '../../actions/CartAction'
import { useDispatch } from 'react-redux'
const CartCard = ({items}) => {
  const dispatch=useDispatch()
  return (
    <>
  <div className="CartItemCard">
      <img src={items.image} alt=""/>
      <div>
        <Link to={`/product/${items.product}`}>{items.name}</Link>
        <span>{`Price: ₹${items.price}`}</span>
        <p onClick={() => dispatch(deleteCartItemsAction(items.product))}>Remove</p>
      </div>
    </div>
    
    </>
  )
}

export default CartCard
