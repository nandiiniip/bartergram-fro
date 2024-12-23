import React, { useState } from "react";
import axios from "axios";
import "./DisplayProducts.css";
import baseUrl from "../../utils/urls";
import { useNavigate } from "react-router-dom";

const DisplayProducts = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hardcoded credentials for testing
  const TEST_CREDENTIALS = {
    username: "admin123",
    password: "tadmin123"
  };

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/login`, {
        username: TEST_CREDENTIALS.username,
        password: TEST_CREDENTIALS.password
      });

      const token = response.data.access_token;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      fetchProducts(token);
    } catch (err) {
      setError("Login failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/MyProducts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data.products || []);
    } catch (err) {
      setError("Failed to fetch products: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Auto-login when component mounts
  React.useEffect(() => {
    login();
  }, []);

  if (loading) {
    return (
      <div className="display__container">
        <div className="loading__message">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="display__container">
        <div className="error__message">{error}</div>
        <button onClick={login} className="retry__button">Retry</button>
      </div>
    );
  }

  return (
    <div className="display__container">
      <div className="display__products">
        {products.length === 0 ? (
          <div className="no__products">No products found</div>
        ) : (
          products.map((product) => (
            <div key={product.product_id} className="display__product">
              {product.images[0] && (
                <img
                  src={`data:image/jpeg;base64,${product.images[0]}`}
                  alt={product.product_name}
                />
              )}
              <p className="prod__name">{product.product_name}</p>
              <p>{product.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayProducts;