import React from "react";
import "./DisplayCard.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";

const DisplayCard = ({ product }) => {
    const navigate = useNavigate();
    const handleChat = () => {
        navigate(`/chat?username=${product.username}`);
    };
  return (
    <div className="card__container">
        <Navbar />
      <div className="card__contents">
        <div className="card__heading">
          <h1>{product.name}</h1>
        </div>
        <div className="product__details">
          <img
            src={`data:image/jpeg;base64,${product.image_base64}`}
            alt={product.name}
          />
          <p className="owner__details">
            Owner: <span>{product.username}</span>
          </p>
          <p className="description__content">{product.description}</p>
          <button onClick={handleChat} className="chat__button">Chat Now</button>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
