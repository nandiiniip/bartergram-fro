import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  MainPage,
  UserRegister,
  CreateProduct,
  DisplayProduct,
  Login,
  ChatPage,
  Explore,
  ChatList, 
  DisplayCard
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
          path="/display"
          element={
            <PrivateRoute>
              <DisplayProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <DisplayCard />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <ChatList />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/chat/:receiverUsername"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <Explore />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
