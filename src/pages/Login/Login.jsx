import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useMutation } from "react-query";
import axios from "axios";
import baseUrl from "../../utils/urls";
import { AuthContext } from "../../utils/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleClose = () => {
    navigate("/");
  };

  const loginMutation = useMutation(
    (data) =>
      axios.post(`${baseUrl}/login`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }),
    {
        onSuccess: (response) => {
            console.log("API Response:", response.data); // Debugging API response
            const { access_token, username, token_type, expires_at } = response.data; // Destructure the full response
            if (!access_token || !username) {
              setMessage({ type: "error", text: "Login failed: Missing data from API" });
              return;
            }
            login(access_token, username); // Pass token and username to context
            setMessage({ type: "success", text: "Login successful!" });
            setTimeout(() => navigate("/explore"), 1000);
          },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.detail || "Invalid username or password";
        setMessage({ type: "error", text: errorMessage });
      },
    }
  );

  useEffect(() => {
    setFormData({ username: "", password: "" });
    setMessage("");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataEncoded = new URLSearchParams();
    formDataEncoded.append("username", formData.username);
    formDataEncoded.append("password", formData.password);
    loginMutation.mutate(formDataEncoded);
  };

  return (
    <div className="login__container">
      <div className="form__container">
        <div className="close__icon" onClick={handleClose}>
          <IoMdCloseCircleOutline />
        </div>
        <div className="login__heading">
          <h1>Login</h1>
        </div>
        <div className="login__contents">
          <form className="login__form" onSubmit={handleSubmit} autoComplete="off">
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
              disabled={loginMutation.isLoading}
            >
              {loginMutation.isLoading ? "Signing in..." : "Log In"}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
