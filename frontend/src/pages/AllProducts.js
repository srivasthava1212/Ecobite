import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
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
      if (!response.ok) throw new Error("Failed to fetch products");
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
      {/* Header Section */}
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
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-3 rounded-full transition-colors"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
            <UploadProduct
              onClose={() => setOpenUploadProduct(false)}
              fetchData={fetchAllProducts}
            />
          </div>,
          document.body
        )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Loading products...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          <p>Error: {error}</p>
          <button
            onClick={fetchAllProducts}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Product Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 col-span-full">
              No products found
            </div>
          ) : (
            allProducts.map((product) => (
              <AdminProductCard
                key={product._id}
                data={product}
                fetchdata={fetchAllProducts}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
