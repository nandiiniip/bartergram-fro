import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import "./UserRegister.css";
import baseUrl from "../../utils/urls";

const UserRegister = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  // Mutation to handle user registration
  const registerMutation = useMutation(
    (data) =>
      axios.post(`${baseUrl}/register`, data, {
        headers: { "Content-Type": "application/json" },
      }),
    {
      onSuccess: (response) => {
        setMessage({ type: "success", text: response.data.msg });
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.detail || "Registration failed";
        setMessage({ type: "error", text: errorMessage });
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <>
      <div className="register__container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={registerMutation.isLoading}>
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
      </div>
    </>
  );
};

export default UserRegister;
