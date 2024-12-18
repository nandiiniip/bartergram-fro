import React from "react";
import "./DisplayProducts.css";
import img1 from "../../assets/jpg/img1.jpg";

const DisplayProducts = () => {
    
  return (
    <>
      <div className="display__container">
        <div className="display__products">
        <div className="display__product">
          <img src={img1}/>
          <p className="prod__name">Product name</p>
          <p>Product Description</p>
        </div>
        </div>
      </div>
    </>
  );
};

export default DisplayProducts;
