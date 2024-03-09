import React from "react";
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>FLIPZONE</h1>
        <p>Let`s Shop It !</p>

        <p>Copyrights 2023 &copy; Amaan</p>
      </div>

      <div className="rightFooter">
        <h4>Get in touch</h4>
        <a target="_blank" href="https://www.instagram.com/amaanin2u_/"><i target="_blank" href="https://www.instagram.com/amaanin2u_/" class="fa-brands fa-instagram" rel="noreferrer"> </i></a>
        
        
        <a target="_blank"href="https://www.facebook.com/amaan.ahmad.5030"><i target="_blank"href="https://www.facebook.com/amaan.ahmad.5030" class="fa-brands fa-facebook" rel="noreferrer"></i></a>
        
      </div>
    </footer>
  );
};

export default Footer;