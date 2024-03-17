import React from 'react'
import ContactMailIcon from '@mui/icons-material/ContactMail';
import TitleData from "./components/design/TitleData"
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
const Contact = () => {
  return (
    <>
         <TitleData data={'Contact Us'}/>
      <div className="emptyCart">
        <ContactMailIcon />

        <Typography>Contact Us</Typography>
        <Link to="https://mail.google.com/mail/?view=cm&fs=1&to=amaanahmad52@gmail.com">Go to Gmail </Link>
      </div>
    </>
  )
}

export default Contact
