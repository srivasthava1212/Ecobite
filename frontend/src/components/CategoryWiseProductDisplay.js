import React, { useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import VerticalCard from "./VerticalCard";
import { Link } from "react-router-dom";

const CategoryWiseProductDisplay = ({ category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCategoryWiseProduct(category).then(setData);
  }, [category]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {/* Parent Container Heading */}
      <h2 className="text-3xl mt-16 font-bold text-center mb-8 text-gray-800 uppercase col-span-full">
        Recommended Products
      </h2>

      {/* Cards Display */}
      {data.length > 0 ? (
        data.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow transition-transform hover:shadow-lg hover:-translate-y-1 relative"
          >
            {/* ✅ Eco Deal Label - Always Visible */}
            {product.ecoDeal && (
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full z-10">
                Eco Deal
              </span>
            )}

            {/* ✅ Product Image */}
            <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center relative overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
              />
            </div>

            {/* ✅ Product Details */}
            <div className="p-4 grid gap-3 text-center">
              <h3 className="font-medium text-base md:text-lg text-black">
                {product.name}
              </h3>
              <p className="capitalize text-slate-500">
                Quantity: {product.unit}
              </p>

              {/* ✅ Eco Deal Expiry */}
              {product.ecoDeal && (
                <p className="text-sm text-red-500 font-medium">
                  Expires on: {product.expd}
                </p>
              )}

              {/* ✅ Price Section */}
              <div className="flex justify-center items-center gap-3">
                {product.ecoDeal ? (
                  <>
                    <span className="text-green-600 font-bold text-xl">
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

              {/* ✅ Add to Cart Button */}
              <button className="text-sm bg-[#2f8aeb] hover:bg-[#419ad9] text-white px-3 py-0.5 rounded-md">
                Add to Cart
              </button>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          No products available in this category.
        </p>
      )}
    </div>
  );
};

export default CategoryWiseProductDisplay;
