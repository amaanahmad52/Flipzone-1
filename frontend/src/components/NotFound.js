import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TitleData from "./design/TitleData"
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
const Reviews = () => {
  return (
    <>
        <TitleData data={'Reviews'}/>
      <div className="emptyCart">
        <ErrorOutlineIcon />

        <Typography>Not Found</Typography>
        <Link to="/">  Home</Link>
      </div>
    </>
  )
}

export default Reviews
