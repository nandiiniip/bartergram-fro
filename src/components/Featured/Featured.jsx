import React, { useState, useEffect } from "react";
import "./Featured.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../utils/urls";

const Featured = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Fetch products from the API
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/products/`);
                const fetchedProducts = response.data.map((product) => ({
                    id: product.id,
                    name: product.name,
                    img: `data:image/jpeg;base64,${product.image_base64[0]}`,
                    user_id: product.user_id,
                }));
                setProducts(fetchedProducts);
                console.log("Products Data:", fetchedProducts); // Debug 1
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - 3 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 3 : prevIndex - 1
        );
    };

      const handleChat = async (productId) => {
            if (!productId) {
                console.error("Product ID is undefined or invalid.");
                return;
            }

            try {
                // Fetch product details from the backend
                const response = await axios.get(`${baseUrl}/products/${productId}`);
                const { username } = response.data;


                // Navigate to the chat page with the username as params
                  navigate(`/chat?username=${username}`);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
    };

    return (
        <div className="featured__container">
            <div className="featured__title" data-aos="zoom-in">
                <h1>Featured Trades</h1>
            </div>
            <div className="carousel">
                <button className="prev__button" onClick={handlePrev} data-aos="zoom-in">
                    &lt; {/* Left Arrow */}
                </button>
                <div className="carousel__viewport"  data-aos="zoom-in">
                    {products.slice(currentIndex, currentIndex + 3).map((product, index) => {
                        return (
                            <div key={index} className="featured__product">
                                <img src={product.img} alt={product.name} />
                                <p className="prod__name">{product.name}</p>
                                <button
                                    className="chat__button"
                                    onClick={() => handleChat(product.id)}
                                >
                                    Chat Now
                                </button>
                            </div>
                        );
                    })}
                </div>
                <button className="next__button" onClick={handleNext} data-aos="zoom-in">
                    &gt; {/* Right Arrow */}
                </button>
            </div>
        </div>
    );
};

export default Featured;