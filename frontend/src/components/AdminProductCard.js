import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdDelete, MdEdit } from "react-icons/md";
import { format } from "date-fns";
import ReactDOM from "react-dom";
import displayINRCurrency from "../helpers/displayCurrency";
import AdminEditProduct from "./AdminEditProduct";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

const handleDeleteProduct = async () => {
  try {
    const response = await fetch(
      `${SummaryApi.deleteProduct.url}/${data._id}`, // Use data._id
      {
        method: SummaryApi.deleteProduct.method,
        credentials: "include",
      }
    );

    console.log("Product ID:", data._id); // Log the product ID
    const responseText = await response.text();
    console.log("Response Text:", responseText);

    let responseData = responseText ? JSON.parse(responseText) : {};

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to delete product");
    }

    alert("Product deleted successfully");
    fetchdata(); // Refresh the product list
  } catch (error) {
    console.error("Delete error:", error);
    alert(`Error deleting product: ${error.message}`);
  }
};

  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative">
      {/* Header Section */}
      <div className="flex justify-between items-center p-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-600">
            {data.category}
          </span>
          <span className="bg-blue-100 px-2 py-1 rounded text-xs font-medium text-blue-600">
            {data.subCategory}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Edit product"
            className="p-2 bg-green-100 hover:bg-green-600 rounded-full transition-colors"
            onClick={() => setEditProduct(true)}
          >
            <MdEdit className="text-lg hover:text-white" aria-hidden="true" />
          </button>
          <button
            aria-label="Delete product"
            className="p-2 bg-red-100 hover:bg-red-600 rounded-full transition-colors"
            onClick={handleDeleteProduct}
          >
            <MdDelete className="text-lg hover:text-white" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-48 p-4 flex items-center justify-center bg-gray-50">
        {!imageError ? (
          <img
            src={data.imageUrl}
            alt={data.name}
            className={`max-h-[160px] w-full object-contain ${
              imageLoaded ? "visible" : "invisible"
            }`}
            onLoad={() => {
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-xs text-gray-500">Image failed to load</span>
          </div>
        )}
        {data.ecoDeal && (
          <span className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            ECO Deal
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {data.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-green-800">
            {data.price.discounted >= 0
              ? displayINRCurrency(data.price.discounted)
              : "Invalid Price"}
          </span>
          {data.price.original > data.price.discounted && (
            <span className="text-gray-500 line-through text-sm">
              {displayINRCurrency(data.price.original)}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-gray-600">
            Stock: {data.stock} {data.unit}
          </span>
          <span
            className={`font-medium ${
              data.stock > 10
                ? "text-green-600"
                : data.stock > 0
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {data.stock > 10
              ? "In Stock"
              : data.stock > 0
              ? "Low Stock"
              : "Out of Stock"}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-4 line-clamp-3">
          {data.description}
        </div>

        <div className="text-xs text-gray-500">
          Expiry:{" "}
          {data.expd ? format(new Date(data.expd), "MMM dd, yyyy") : "N/A"}
        </div>
      </div>

      {/* Edit Product Modal Portal */}
      {editProduct &&
        ReactDOM.createPortal(
          <AdminEditProduct
            productData={data}
            onClose={() => setEditProduct(false)}
            fetchdata={fetchdata}
          />,
          document.body
        )}
    </div>
  );
};

AdminProductCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    subCategory: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.shape({
      original: PropTypes.number.isRequired,
      discounted: PropTypes.number.isRequired,
    }).isRequired,
    stock: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    expd: PropTypes.string,
    description: PropTypes.string.isRequired,
    ecoDeal: PropTypes.bool,
  }).isRequired,
  fetchdata: PropTypes.func.isRequired,
};

export default AdminProductCard;
