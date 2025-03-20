import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import UploadProduct from "../components/UploadProduct";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const fetchAllProducts = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const dataResponse = await response.json();
      setAllProducts(dataResponse.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-2xl">All Products</h2>
          {!isLoading && !error && (
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {allProducts.length}{" "}
              {allProducts.length === 1 ? "product" : "products"}
            </span>
          )}
        </div>
        <button
          className="border-2 border-red-600 text-red-600  hover:bg-red-600 hover:text-white px-4 py-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>
      {
        /* upload product component*/ openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} />
        )
      }
      
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Loading products...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          <p>Error: {error}</p>
          <button
            onClick={fetchAllProducts}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {allProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <AdminProductCard
                  key={product.id}
                  data={product}
                  fetchData={fetchAllProducts}
                />
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default AllProducts;
