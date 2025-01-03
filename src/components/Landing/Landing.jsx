import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import logo from "../../assets/png/bartergram-logo.png";
import handshake from "../../assets/png/hand-shake.png";
import Aos from "aos";

const Landing = () => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate("/explore");
      };
    
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <div className="mainpage__container">
        <div className="landing__container" data-aos="zoom-in">
        <img src={logo} className="logo__image"></img>
            <div className="text__part">
          <p>A social platform where users list items and suggest equivalent trades.</p>
          <p className="text__area">NO MONEY INVOLVED!</p>
          <p>List your treasures and swap with fellow barter fans. Let's normalize exchanging products.</p>
          </div>
          <div className="handshake__part">
            <img src={handshake} className="handshake__img"></img>
            <button className="explore__button" onClick={handleButton}>
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
