import React, { useState } from "react";
import "./Connect.css";
import img1 from "../../assets/jpg/connect1.jpg";
import img2 from "../../assets/jpg/connect2.jpg";
import img3 from "../../assets/jpg/connect3.jpg";
import img4 from "../../assets/jpg/connect4.jpg";
import img5 from "../../assets/jpg/connect5.jpg";
import img6 from "../../assets/jpg/connect6.jpg";
import img7 from "../../assets/jpg/connect7.jpg";
import { RiFacebookFill, RiInstagramLine } from "react-icons/ri";

const Connect = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = 0; i < 4; i++) {
      visibleImages.push(images[(currentIndex + i) % images.length]);
    }
    return visibleImages;
  };

  return (
    <div className="footer__container">
      <div className="footer__contents">
        <div className="text__contents">
          <h4>Connect with us</h4>
          <h1>@bartergram</h1>
        </div>
        <div className="carousel__connect">
          <button className="carousel__button prev" onClick={handlePrev}>
            &#8249;
          </button>
          <div className="carousel__images">
            {getVisibleImages().map((image, index) => (
              <div key={index} className="carousel__image-container">
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <button className="carousel__button next" onClick={handleNext}>
            &#8250;
          </button>
        </div>
        <div className="social__icons_content">
          <a
            href="https://www.instagram.com/terawecorp/"
            target="_blank"
            rel="noreferrer"
          >
            <RiInstagramLine />
          </a>
          <a
            href="https://www.facebook.com/terawetech/"
            target="_blank"
            rel="noreferrer"
          >
            <RiFacebookFill />
          </a>
        </div>
        <p>&copy; 2024 by Pyrates. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Connect;
