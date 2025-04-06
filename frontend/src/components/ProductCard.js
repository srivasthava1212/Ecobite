import { useState } from "react";
import "./ProductCard.css";
import React, { useContext } from "react";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductCard = ({ product, setPaused }) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    pauseScrolling();
  };

  const pauseScrolling = () => {
    if (setPaused) {
      setPaused(true);
      setIsInteracting(true);
      setTimeout(() => {
        if (!isInteracting) {
          setPaused(false);
        }
      }, 1000);
    }
  };

  const handleMouseEnter = () => {
    setIsInteracting(true);
    if (setPaused) setPaused(true);
  };

  const handleMouseLeave = () => {
    setIsInteracting(false);
    if (setPaused) setPaused(false);
  };

  return (
    <div
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {product.ecoDeal && <span className="eco-deal-label">Eco Deal</span>}
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="weight">Quantity: {product.unit}</p>
      {product.ecoDeal && <p>Expires on: {product.expd}</p>}
      <div className="price">
        {product.ecoDeal ? (
          <>
            <span className="old-price">₹{product.price.original}</span>
            <span className="new-price">₹{product.price.discounted}</span>
          </>
        ) : (
          <span className="new-price">₹{product.price.original}</span>
        )}
      </div>
      <button
        className="add-to-cart"
        onClick={(e) => handleAddToCart(e, product._id)}
      >
        Add to Cart
      </button>
      <div className="description">{product.description}</div>
    </div>
  );
};

export default ProductCard;
