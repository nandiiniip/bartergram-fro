import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import "./DisplayProducts.css";
import baseUrl from "../../utils/urls";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";

const DisplayProducts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch products
  const { data, error, isLoading } = useQuery("userProducts", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${baseUrl}/MyProducts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

  // Delete product mutation
  const deleteProductMutation = useMutation(
    async (productId) => {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        // Refetch products or update the state to remove the deleted product
        queryClient.invalidateQueries("userProducts");
      },
    }
  );

  const handleDeleteProduct = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      deleteProductMutation.mutate(productId);
    }
  };

  const handleClick = () => {
    navigate("/create");
  };

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
            ? "Please login to view your products"
            : "Error loading products"}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="display__container">
        <Navbar />
        <div className="display__content">
          <div className="header">
            <h1>My Products</h1>
            <div className="prod__sub">
              <button className="prod__button" onClick={handleClick}>
                Create Product
              </button>
            </div>
          </div>

          <div className="display__products">
            {data?.products?.length === 0 ? (
              <div className="no__products">No products found</div>
            ) : (
              data?.products?.map((product) => (
                <div key={product.product_id} className="display__product">
                  {product.images[0] && (
                    <img
                      src={`data:image/jpeg;base64,${product.images[0]}`}
                      alt={product.product_name}
                      onClick={() => setSelectedImage(product.images[0])}
                    />
                  )}
                  <p className="prod__name">{product.product_name}</p>
                  <p className="image__count">Images: {product.image_count}</p>
                  <button
                    className="chat__button"
                    onClick={() => handleDeleteProduct(product.product_id)}
                  >
                    Delete Product
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="modal__overlay"
              onClick={() => setSelectedImage(null)}
            >
              <div className="modal__content">
                <img
                  src={`data:image/jpeg;base64,${selectedImage}`}
                  alt="Selected product"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayProducts;
