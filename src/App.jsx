import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, UserRegister, CreateProduct, DisplayProduct } from "./pages";
import "./App.css";

const App = () => {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/explore" element={<DisplayProduct />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
