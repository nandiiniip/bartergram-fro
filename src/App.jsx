import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  MainPage,
  UserRegister,
  CreateProduct,
  DisplayProduct,
  Login,
  ChatPage,
} from "./pages";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <DisplayProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
