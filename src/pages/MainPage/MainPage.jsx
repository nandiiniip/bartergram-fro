import React from "react";
import "./MainPage.css";
import { Landing, About, Featured } from "../../components";

const MainPage = () => {
  return (
    <>
      <div className="mainpage__container">
        <Landing />
        <Featured />
        <About />
      </div>
    </>
  );
};

export default MainPage;
