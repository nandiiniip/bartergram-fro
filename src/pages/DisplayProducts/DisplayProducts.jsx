import React, {useContext} from "react";
import "./DisplayProducts.css";
import img1 from "../../assets/jpg/img1.jpg";
import { AuthContext } from "../../utils/UserContext";

const DisplayProducts = () => {
    const { authState } = useContext(AuthContext);
  return (
    <>
      <div className="display__container">
        <div className="display__products">
        <div className="display__product">
        <h1>Welcome, {authState.username}!</h1>
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
