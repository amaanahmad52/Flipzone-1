import React, { Component } from 'react'
import loading from '../Spinnergif.gif'
const Spin= ()=> {
  
    return (
    <div className="d-flex justify-content-center">
        <img  src={loading} alt="loading" style={{placeItems:"center"}} />
    </div>
      
      
    )
  
}

export default Spin
