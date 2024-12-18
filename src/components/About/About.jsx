import React from "react";
import "./About.css";
import icon1 from "../../assets/png/icon_1.png";
import icon2 from "../../assets/png/icon_2.png";
import icon3 from "../../assets/png/icon_3.png";
import icon4 from "../../assets/png/icon_4.png";
import icon5 from "../../assets/png/icon_5.png";

const About = () => {
  return (
    <>
      <div className="mainpage__container">
        <div className="heading__title">
          <h1>Our Mission</h1>
        </div>
        <div className="about__content">
          <p>
            We believe in a sustainable and equitable trading system. Our
            platform encourages users to exchange items without the involvement
            of money, fostering a community based on mutual benefit and shared
            values.
          </p>
        </div>
        <div className="icons__container">
          <div className="icon__content">
            <img src={icon1}></img>
            <p>Barter System</p>
          </div>
          <div className="icon__content">
            <img src={icon2}></img>
            <p>Community-Centric</p>
          </div>
          <div className="icon__content">
            <img src={icon3}></img>
            <p>Sustainable</p>
          </div>
          <div className="icon__content">
            <img src={icon4}></img>
            <p>Ethical</p>
          </div>
          <div className="icon__content">
            <img src={icon5}></img>
            <p>Empowering</p>
          </div>
        </div>
        <div className="about__small_content">
          <p>
            Our platform is designed to facilitate meaningful trades and
            connections between individuals. We are committed to providing a
            safe and reliable space for barter transactions that promote
            sustainability and reduce waste. Join us in shaping a sharing
            economy for a better future.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
