import React from 'react'
import TitleData from '../design/TitleData'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./Success.css"
const Success = () => {
  return (
    <div className='orderSuccess'>
    <TitleData title={"Success"}></TitleData>
      <CheckCircleIcon />
      <Typography>YaY ! Order Placed </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default Success
