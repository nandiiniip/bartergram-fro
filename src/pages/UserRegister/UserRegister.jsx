import React, { useState,useEffect } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import "./UserRegister.css";
import baseUrl from "../../utils/urls";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // Redirect to home page
  };

  const handleLogin = () => {
    navigate("/login");
  }

  const registerMutation = useMutation(
    (data) =>
      axios.post(`${baseUrl}/register`, data, {
        headers: { "Content-Type": "application/json" },
      }),
    {
      onSuccess: (response) => {
        setMessage({ type: "success", text: response.data.msg });
        setFormData({ username: "", password: "" });
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.detail || "Registration failed";
        setMessage({ type: "error", text: errorMessage });
      },
    }
  );

  useEffect(() => {
    setFormData({ username: "", password: "" });
    setMessage(""); // Clear any previous messages
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <div className="main__container">
      <div className="form__container">
        <div className="close__icon" onClick={handleClose}>
          <IoMdCloseCircleOutline />
        </div>
        <h1 className="form__title">Sign Up</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="form__button"
            type="submit"
            disabled={registerMutation.isLoading}
          >
            {registerMutation.isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        {message && (
          <div
            className={`message ${
              message.type === "success" ? "message--success" : "message--error"
            }`}
          >
            {message.text}
          </div>
        )}
        <div>
            <p className="text__content">Already a member? <span className="login__text" onClick={handleLogin}>Log In</span></p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
