import React, { useEffect } from "react";
import "./Landing.css";
import logo from "../../assets/png/bartergram-logo.png";
import handshake from "../../assets/png/hand-shake.png";
import Aos from "aos";

const Landing = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <div className="mainpage__container">
        <div className="landing__container" data-aos="flip-left">
          <img src={logo} className="logo__image"></img>
          <div className="handshake__part">
            <img src={handshake} className="handshake__img"></img>
            <button className="explore__button">
              <span />
              <span />
              <span />
              <span />
              Explore
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
