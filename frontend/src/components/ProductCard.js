import { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ product, setPaused }) => {
  const [quantity, setQuantity] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setQuantity(1);
    pauseScrolling();
  };

  const increaseQuantity = (e) => {
    e.stopPropagation();
    setQuantity(quantity + 1);
    pauseScrolling();
  };

  const decreaseQuantity = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
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
      }, 2000);
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
      {quantity === 0 ? (
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      ) : (
        <div className="quantity-controls">
          <button className="quantity-btn" onClick={decreaseQuantity}>
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button className="quantity-btn" onClick={increaseQuantity}>
            +
          </button>
        </div>
      )}
      <div className="description">{product.description}</div>
    </div>
  );
};

export default ProductCard;
