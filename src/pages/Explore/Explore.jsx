import React, { useState } from "react";
import "./Explore.css";
import axios from "axios";
import { useQuery } from "react-query";
import baseUrl from "../../utils/urls";
import { Navbar } from "../../components";
import DisplayCard from "../DisplayCard/DisplayCard";

const Explore = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store the selected product

  const { data, error, isLoading } = useQuery("userProducts", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${baseUrl}/products/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Ensure this matches the actual response structure
  });

  if (isLoading) {
    return (
      <div className="display__container">
        <div className="loading__message">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="display__container">
        <div className="error__message">
          {error.message === "No authentication token found"
            ? "Please login to view the products"
            : "Error loading products"}
        </div>
      </div>
    );
  }

  const products = Array.isArray(data) ? data : [];

  if (selectedProduct) {
    // Render DisplayCard only when a product is selected
    return <DisplayCard product={selectedProduct} />;
  }

  return (
    <>
      <div className="explore__container">
        <Navbar />
        <div className="explore__contents">
          <div className="explore__heading">
            <h1>Explore Products</h1>
          </div>
          <div className="display__products">
            {products.length === 0 ? (
              <div className="no__products">No products found</div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="display__product"
                  onClick={() => setSelectedProduct(product)} // Set selected product
                >
                  {product.image_base64 && (
                    <img
                      src={`data:image/jpeg;base64,${product.image_base64[0]}`}
                      alt={product.name}
                    />
                  )}
                  <p className="prod__name">{product.name}</p>
                  <p className="prod__username">
                    Posted by: <span>{product.username}</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
