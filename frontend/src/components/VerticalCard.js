import React from "react";
import { Link } from "react-router-dom";

const VerticalCard = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((product) => (
        <Link
          to={`/product/${product.id}`}
          key={product.id}
          className="p-4 bg-white shadow"
        >
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Price: {product.price.discounted}</p>
        </Link>
      ))}
    </div>
  );
};

export default VerticalCard;
