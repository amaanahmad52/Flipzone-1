import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckIcon from '@mui/icons-material/Check';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Typography } from "@material-ui/core";
const steps = [

    {
        label:<Typography>Shipping Details</Typography>,
        icon:<LocalShippingIcon/>
    },
    {
        label:<Typography>Confirm Order</Typography>,
        icon:<CheckIcon/>
    },
    {
        label:<Typography>Paymet Details</Typography>,
        icon:<AccountBalanceIcon/>
    }
    
  ];
const Checkout = ({konsaActive}) => {
  return (
    <>
            {/* Note->we can also use direct here. but meraa mann mujhe map likhna tha */}
      <Box sx={{ width: '100%' ,marginTop:"1vmax"}}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((item,index)=>(
            <Step key={index} active={konsaActive===index?true:false} completed={konsaActive>=index}>
            <StepLabel icon={item.icon} style={{color:konsaActive>=index? "#611c66":"rgb(0,0,0,0.649"}}>{item.label}</StepLabel>
          </Step>
        ))}
          {/* <Step key={steps[0]} active={konsaActive==0}>
            <StepLabel StepIconComponent={LocalShippingIcon}>{steps[0]}</StepLabel>
          </Step>
     
          <Step key={steps[1]} active={konsaActive==0}>
            <StepLabel StepIconComponent={CheckIcon}>{steps[1]}</StepLabel>
          </Step>
     
          <Step key={steps[2]} active={konsaActive==0}>
            <StepLabel StepIconComponent={AccountBalanceIcon}>{steps[2]}</StepLabel>
          </Step> */}
     
      </Stepper>
    </Box>
    </>
  )
}

export default Checkout
