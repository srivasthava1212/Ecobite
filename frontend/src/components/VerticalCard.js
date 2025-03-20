import React from "react";
import { Link } from "react-router-dom";

const VerticalCard = ({ data, category }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Parent Container Heading */}
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 uppercase">
        {category}
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative transform hover:-translate-y-2"
          >
            {/* Eco Deal Label */}
            {product.ecoDeal && (
              <span className="eco-deal-label bg-green-600 text-white text-xs px-3 py-1 rounded-full absolute top-3 left-3 z-10">
                Eco Deal
              </span>
            )}

            {/* Product Image */}
            <div className="h-56 flex items-center justify-center bg-slate-100 relative overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-contain h-full w-full mix-blend-multiply transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Product Details */}
            <div className="p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Quantity: {product.unit}
              </p>
              {product.ecoDeal && (
                <p className="text-sm text-gray-600 mb-3">
                  Expires on: {product.expd}
                </p>
              )}

              {/* Price Section */}
              <div className="price flex items-center gap-3 mb-4">
                {product.ecoDeal ? (
                  <>
                    <span className="text-red-600 font-bold text-xl">
                      ₹{product.price.discounted}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      ₹{product.price.original}
                    </span>
                  </>
                ) : (
                  <span className="text-red-600 font-bold text-xl">
                    ₹{product.price.original}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold">
                Add to Cart
              </button>

              {/* Product Description */}
              <div className="description text-sm text-gray-600 mt-4">
                {product.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCard;
