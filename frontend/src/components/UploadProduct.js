import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import productSubCategory from "../helpers/productSubCategory";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: "",
    description: "",
    price: "",
    sellingPrice: "",
    subCategory: "",
    expDate: "",
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
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
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
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter brand name"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

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

          <label htmlFor="productImage" className="mt-3">
            Product Image URL:
          </label>
          <input
            type="url"
            id="productImage"
            placeholder="Enter image URL"
            name="productImage"
            value={data.productImage}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {data.productImage && (
            <div className="mt-2">
              <img
                src={data.productImage}
                alt="Product Preview"
                className="h-20 w-20 object-cover rounded border"
              />
              <p className="text-xs text-gray-500 mt-1">Image Preview</p>
            </div>
          )}

          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter selling price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="expDate" className="mt-3">
            Expiration Date:
          </label>
          <input
            type="date"
            id="expDate"
            name="expDate"
            value={data.expDate}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
            min={new Date().toISOString().split("T")[0]}
          />

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
