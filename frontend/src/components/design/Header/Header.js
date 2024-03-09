import React from 'react'
import {ReactNavbar}from "overlay-navbar"
import { FaUserAlt, FaSearch,FaShoppingCart} from "react-icons/fa";
import logo from  "../../images/logo.png"
const Header = () => {
   
      
  return (
    <>
      
      <ReactNavbar

    burgerColorHover="#eb4034"
    logo={logo}
    logowidth="20vmax"
    navColor1= "#611c66"
    logoHoverSize="5px"
    logoHeight="300px"
    logoWidth="300px"
    logoHoverColor="#eb4034"
    link1Text="Home"
    link2Text="Products"
    link3Text="Contact"
    link4Text="About"
    link1Url="/"
    link2Url="/products"
    link1Family="Poppins"
    link2Family="Poppins"
    link3Family="Poppins"
    link4Family="Poppins"
    link3Url="/contact"
    link4Url="/about"
    link1Size="1.3vmax"
    link1Color="rgba(35, 35, 35,0.8)"
    navijustifyContent="flex-end"
    nav2justifyContent="flex-end"
    nav3justifyContent="flex-start"
    nav4justifyContent="flex-start"
    link1ColorHover="#eb4034"
    link1Margin="1vmax"
    profileIcon={true}
   
    ProfileIconElement={FaUserAlt}
    profileIconUrl="/login"
    profileIconColor="rgba(35, 35, 35,0.8)"
    profileIconMargin="20px"
    searchIcon={true}
    SearchIconElement={FaSearch}
    searchIconSize="2.3vmax"
    searchIconMargin="20px"

    searchIconColor="rgba(35, 35, 35,0.8)"
    cartIcon={true}
    CartIconElement={FaShoppingCart}
    cartIconColor="rgba(35, 35, 35,0.8)"
    profileIconColorHover="#eb4034"
    searchIconColorHover="#eb4034"
    cartIconColorHover="#eb4034"
    cartIconMargin="ivmax"
    cartIconSize="2.3vmax"

            
          

       
      />
      
    </>
  )
}
 
export default Header
