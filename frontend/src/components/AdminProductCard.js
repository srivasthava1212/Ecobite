import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import displayINRCurrency from "../helpers/displayCurrency";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Card Content */}
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
          {/* Edit Button */}
          <div
            className="p-2 bg-green-100 hover:bg-green-600 rounded-full cursor-pointer transition-colors"
            onClick={() => setEditProduct(true)}
          >
            <MdEdit className="text-lg hover:text-white" />
          </div>

          {/* Delete Button */}
          <div
            className="p-2 bg-red-100 hover:bg-red-600 rounded-full cursor-pointer transition-colors"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this product?")
              ) {
                // Add your delete logic here
              }
            }}
          >
            <MdDelete className="text-lg hover:text-white" />
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative h-48 p-4 flex items-center justify-center bg-gray-50">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="max-h-[160px] w-full object-contain"
        />
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
            {displayINRCurrency(data.price.discounted)}
          </span>
          <span className="text-gray-500 line-through text-sm">
            {displayINRCurrency(data.price.original)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-gray-600">
            Stock: {data.stock} {data.unit}
          </span>
          <span
            className={`font-medium ${
              data.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {data.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-4 line-clamp-3">
          {data.description}
        </div>

        <div className="text-xs text-gray-500">Expiry: {data.expd}</div>
      </div>

      {/* Edit Product Modal */}
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
