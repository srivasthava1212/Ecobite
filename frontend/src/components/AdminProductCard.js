import React, { useState, useRef, useEffect } from "react";
import { MdDelete, MdEdit, MdClose } from "react-icons/md";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";

const AdminProductCard = ({ data, fetchdata }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    ...data,
    productName: data.productName,
    brandName: data.brandName,
    category: data.category,
    price: data.price,
    sellingPrice: data.sellingPrice,
    description: data.description,
  });
  const modalRef = useRef(null);

  // Handle outside clicks to close the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  // Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle product update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/products/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedProduct),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        setIsEditing(false);
        fetchdata(); // Refresh the product list
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update product");
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products/${data.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("Product deleted successfully");
          fetchdata(); // Refresh the product list
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <div className="w-72 bg-white rounded-lg shadow-md transition-all duration-200 m-4 relative overflow-hidden group">
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
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <MdEdit className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-600 transition-colors"
          >
            <MdDelete className="w-5 h-5" />
          </button>
        </div>
      </div>

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

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Edit Product</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={editedProduct.productName}
                    onChange={handleOnChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    value={editedProduct.brandName}
                    onChange={handleOnChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleOnChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleOnChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={editedProduct.sellingPrice}
                    onChange={handleOnChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editedProduct.description}
                    onChange={handleOnChange}
                    className="w-full p-2 border rounded resize-none"
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductCard;
