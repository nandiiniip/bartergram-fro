import React from "react";
import "./MainPage.css";
import { Landing, About, Featured, Navbar, Connect } from "../../components";

const MainPage = () => {
  return (
    <>
      <div className="mainpage__container">
        <Navbar />
        <Landing />
        <Featured />
        <About />
        <Connect />
      </div>
    </>
  );
};

export default MainPage;
