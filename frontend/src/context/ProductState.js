import ProductContext from "./productContext";

import { useState } from "react";



const ProductState = (props) => {
    const host = "http://localhost:5000";
    const [pro, setPro] = useState([]);
    const getParticularProduct = async (id) => {
        const url = `${host}/api/v1/product/${id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const data = await response.json(); // Wait for the response to be parsed as JSON
        // notesInitial.concat(data); // Push the parsed data into the array
        console.log(data);
        setPro(data.fetchedProduct);
      };
  return (
    <>
      <ProductContext.Provider
      value={{
        pro,
        getParticularProduct
      }}
    >
      {props.children}
    </ProductContext.Provider>
    </>
  )
}

export default ProductState
