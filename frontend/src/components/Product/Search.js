import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./searchh.css"
import TitleData from '../design/TitleData';
const Search = () => {
  const [data, setData] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const inputValue = event.target.value;
    setData(inputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (data.trim()) {
      navigate(`/products/${data}`);
    }
    else{
      navigate("/products")
    }
  };

  return (
    <>
      <TitleData data={"Search a Product--Flipzone"}/>
      <div className='xyz'>
      <input type="text" placeholder="Enter Product Name" name="title" onChange={handleSearch} />
      <button type="submit" onClick={handleSubmit}>Search</button>
      </div>
    </>
  );
};

export default Search;
