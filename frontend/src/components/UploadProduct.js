import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import productSubCategory from "../helpers/productSubCategory";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    unit: "",
    stock: "",
    expd: "",
    price: {
      original: "",
      discounted: "",
    },
    imageUrl: "",
    description: "",
    subCategory: "",
  });

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  useEffect(() => {
    if (data.category) {
      const filtered = productSubCategory.filter(
        (subCat) => subCat.category === data.category
      );
      setFilteredSubCategories(filtered);
      setData((prev) => ({ ...prev, subCategory: "" }));
    }
  }, [data.category]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("price.")) {
      const priceField = name.split(".")[1];
      setData((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [priceField]: Number(value),
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: name === "stock" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...data,
      id: Math.floor(Math.random() * 1000000), // Numeric ID
    };

    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      toast.success(responseData.message);
      onClose(); // Close the modal

      // Check if fetchData is a function before calling it
      if (typeof fetchData === "function") {
        fetchData(); // Refresh the product list
      } else {
        console.warn("fetchData is not a function");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          {/* Product Name */}
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter product name"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {/* Brand */}
          <label htmlFor="brand" className="mt-3">
            Brand:
          </label>
          <input
            type="text"
            id="brand"
            placeholder="Enter brand"
            value={data.brand}
            name="brand"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {/* Category */}
          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="">Select Category</option>
            {productCategory.map((el) => (
              <option value={el.value} key={el.id}>
                {el.label}
              </option>
            ))}
          </select>

          {/* Sub Category */}
          {data.category && (
            <>
              <label htmlFor="subCategory" className="mt-3">
                Sub Category:
              </label>
              <select
                required
                value={data.subCategory}
                name="subCategory"
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded"
              >
                <option value="">Select Sub Category</option>
                {filteredSubCategories.map((subCat) => (
                  <option value={subCat.value} key={subCat.id}>
                    {subCat.label}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Unit */}
          <label htmlFor="unit" className="mt-3">
            Unit:
          </label>
          <input
            type="text"
            id="unit"
            placeholder="Enter unit (e.g., kg, liter)"
            value={data.unit}
            name="unit"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {/* Stock */}
          <label htmlFor="stock" className="mt-3">
            Stock:
          </label>
          <input
            type="number"
            id="stock"
            placeholder="Enter stock quantity"
            value={data.stock}
            name="stock"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {/* Expiration Date */}
          <label htmlFor="expd" className="mt-3">
            Expiration Date:
          </label>
          <input
            type="date"
            id="expd"
            name="expd"
            value={data.expd}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
            min={new Date().toISOString().split("T")[0]}
          />

          {/* Price - Original */}
          <label htmlFor="price.original" className="mt-3">
            Original Price:
          </label>
          <input
            type="number"
            id="price.original"
            placeholder="Enter original price"
            value={data.price.original}
            name="price.original"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {/* Price - Discounted */}
          <label htmlFor="price.discounted" className="mt-3">
            Discounted Price:
          </label>
          <input
            type="number"
            id="price.discounted"
            placeholder="Enter discounted price"
            value={data.price.discounted}
            name="price.discounted"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {/* Image URL */}
          <label htmlFor="imageUrl" className="mt-3">
            Product Image URL:
          </label>
          <input
            type="url"
            id="imageUrl"
            placeholder="Enter image URL"
            name="imageUrl"
            value={data.imageUrl}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {data.imageUrl && (
            <div className="mt-2">
              <img
                src={data.imageUrl}
                alt="Product Preview"
                className="h-20 w-20 object-cover rounded border"
              />
              <p className="text-xs text-gray-500 mt-1">Image Preview</p>
            </div>
          )}

          {/* Description */}
          <label htmlFor="description" className="mt-3">
            Description:
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter product description"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
            required
          ></textarea>

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
