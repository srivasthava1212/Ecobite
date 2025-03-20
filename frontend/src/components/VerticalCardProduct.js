import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchUserAddToCart } = useContext(Context);

  // Handle adding to cart
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  // Fetch product data from DB
  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(Array.isArray(categoryProduct) ? categoryProduct : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          <p className="text-center text-gray-500 w-full py-4">
            Loading products...
          </p>
        ) : data.length > 0 ? (
          data.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="w-[320px] h-[500px] bg-white rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 relative"
            >
              {/* ✅ Eco Deal Label */}
              {product.ecoDeal && (
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full z-10">
                  Eco Deal
                </span>
              )}

              <div className="p-4 flex flex-col items-center">
                <img
                  src={product.imageUrl}
                  className="h-72 object-contain"
                  alt={product.name}
                />
                <h2 className="font-medium text-lg">{product.name}</h2>
                <p className="text-slate-500">{product.category}</p>
                {product.ecoDeal && (
                  <p className="text-sm text-red-500 font-medium mt-2">
                    Expires on: {product.expd}
                  </p>
                )}
                <div className="flex gap-3 my-3">
                  <p className="text-red-600 font-bold">
                    {displayINRCurrency(product?.price?.discounted)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {displayINRCurrency(product?.price?.original)}
                  </p>
                </div>
                <button
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
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
    </div>
  );
};

export default VerticalCardProduct;
