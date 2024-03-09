import React, { useState } from 'react'
import "./Shipping.css"
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import CIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStation from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from 'react-redux';
import PinDrop from '@material-ui/icons/PinDrop';
import {toast} from 'react-toastify';
import TitleData from "../design/TitleData"
import { saveShippingInfoAction } from '../../actions/CartAction';
import { useNavigate } from 'react-router-dom';
import Checkout from './Checkout';
const Shipping = () => {

    const dispatch=useDispatch()
    const {shippingInfo}=useSelector((s)=>s.cart) //initially is given by local storage to store 

    const [Address, setAddress] = useState(shippingInfo.Address);
    const [City, setCity] = useState(shippingInfo.City);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [Pincode, setPincode] = useState(shippingInfo.Pincode);
    const [PhoneNumber, setPhoneNumber] = useState(shippingInfo.PhoneNumber);
    const nav=useNavigate()

    const handleSubmit=(e)=>{
      e.preventDefault();
      if(PhoneNumber.length<10){
        toast.error("Please enter a valid phone number")
        return;
      }
    


      dispatch(saveShippingInfoAction({Address,City,Pincode,PhoneNumber,country,state}))
      nav("/order/confirm")
    }
  return (
    <>
     <TitleData data={"Shipping Details"}/>
     <Checkout konsaActive={0}/>
     <div className="shippingContainer">
        <div className="shippingBox">
        <h2 className="shippingHeading">Shipping Details</h2>
        <form className='shippingForm' onSubmit={handleSubmit}>
                <div className="enterAddress">
                  <HomeIcon />
                  <input
                    type='text'
                    required
                    placeholder='Address'
                    name="Address"
                    value={Address}
                    onChange={(e)=>setAddress(e.target.value)}
                  />
                </div>
                <div className="enterCity">
                  <LocationCityIcon/>
                  <input
                    type='text'
                    required
                    placeholder='City'
                    name="City"
                    value={City}
                    onChange={(e)=>setCity(e.target.value)}
                  />
                </div>
                <div className="enterPincode">
                  <PinDrop />
                  <input
                     type='text'
                     required
                     placeholder='PinCode'
                     name="pincode"
                     value={Pincode}
                     onChange={(e)=>setPincode(e.target.value)}
                  />
                </div>
                <div className="enterphone">
                  <PhoneIcon/>
                  <input
                    type='text'
                    required
                    placeholder='Phone'
                    name="phone"
                    value={PhoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="entercountry">
                  <CIcon />
                  <select
                    required
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}
                  >
                  <option value="">Country</option>
                  {Country.getAllCountries().map((item) =>(<option key={item.isoCode} value={item.isoCode}>{item.name}</option>))}
                  </select>

                </div>
                <div className="enterstate">
                  < TransferWithinAStation/>
                  <select
                    required
                    value={state}
                    onChange={(e)=>setState(e.target.value)}
                  >
                    <option value="">State</option>
                  {country &&State.getStatesOfCountry(country).map((item) =>(<option key={item.isoCode} value={item.isoCode}>{item.name}</option>))}
                  </select>
                 
                </div>
                {/* disabled={state ? false : true} */}
                <button type="submit" className='shippingBtn'>Continue   </button>
              </form>
        </div>
     </div>
    </>
  )
}

export default Shipping
