import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";
import axios from "axios";
import { AuthContext } from "../../utils/UserContext";
import baseUrl from "../../utils/urls";
import { Navbar } from "../../components";
import { useQueryClient } from "react-query";

const CreateProduct = () => {
  const { authState } = useContext(AuthContext); // To access the token
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Access queryClient

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, images: e.target.files }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      for (let i = 0; i < formData.images.length; i++) {
        data.append("images", formData.images[i]);
      }

      await axios.post(`${baseUrl}/upload/`, data, {
        headers: {
          Authorization: `Bearer ${authState.token}`, // Pass the token
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Product uploaded successfully!");
      queryClient.invalidateQueries("userProducts"); // Invalidate the cache
      navigate("/explore"); // Navigate to Explore
    } catch (err) {
      console.error("Error uploading product:", err);
      setError(err.response?.data?.detail || "Failed to upload product");
    }
  };

  return (
    <div className="createprod__container">
      <Navbar />
      <div className="createprod__content">
        <div className="createprod__heading">
          <h1>Create Product</h1>
        </div>
        <form onSubmit={handleSubmit} className="form__content">
          <div className="form__field">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="description">Product Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="50"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="images">Upload Image</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="submit__button">
            Submit
          </button>
        </form>
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default CreateProduct;
