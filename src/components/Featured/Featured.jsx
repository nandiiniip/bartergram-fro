import React from 'react';
import './Featured.css';
import prodimg from "../../assets/jpg/img2.jpg";

const Featured = () => {
  return (
    <>
    <div className='featured__container'>
      <div className='featured__title'>
        <h1>Featured Trades</h1>
      </div>
      <div className='featured__contents'>
        <div className='featured__product'>
            <img src={prodimg}></img>
            <p className='prod__name'>Eco Glass</p>
            <button className='chat__button'>Chat Now</button>
        </div>
        <div className='featured__product'>
            <img src={prodimg}></img>
            <p className='prod__name'>Stainless Steel Bottle</p>
            <button className='chat__button'>Chat Now</button>
        </div>
        <div className='featured__product'>
            <img src={prodimg}></img>
            <p className='prod__name'>Wooden Brush</p>
            <button className='chat__button'>Chat Now</button>
        </div>
        <div className='featured__product'>
            <img src={prodimg}></img>
            <p className='prod__name'>Organic Cotton Mesh Bag</p>
            <button className='chat__button'>Chat Now</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Featured
