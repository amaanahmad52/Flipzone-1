import React from 'react'
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import TitleData from "./design/TitleData"
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <>
        <TitleData data={'About Us'}/>
      <div className="emptyCart">
        <WbTwilightIcon />

        <Typography component="h1">Flipzone Pvt Ltd.</Typography>
        {/* <Link to="/admin/dashboard">  Dashboard</Link> */}
      </div>
    </>
  )
}

export default About
