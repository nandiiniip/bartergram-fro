import React from "react";
import "./MainPage.css";
import { Landing, About, Featured, Navbar } from "../../components";

const MainPage = () => {
  return (
    <>
      <div className="mainpage__container">
        <Navbar />
        <Landing />
        <Featured />
        <About />
      </div>
    </>
  );
};

export default MainPage;
