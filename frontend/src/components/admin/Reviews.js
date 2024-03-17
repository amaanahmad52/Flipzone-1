import React from 'react'
import UpcomingIcon from '@mui/icons-material/Upcoming';
import TitleData from "../design/TitleData"
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
const Reviews = () => {
  return (
    <>
        <TitleData data={'Reviews'}/>
      <div className="emptyCart">
        <UpcomingIcon />

        <Typography>Coming Soon..</Typography>
        <Link to="/admin/dashboard">  Dashboard</Link>
      </div>
    </>
  )
}

export default Reviews
