import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import productSubCategory from "../helpers/productSubCategory";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ productData, onClose, fetchData }) => {
  const [data, setData] = useState({
    name: productData.name,
    brand: productData.brand,
    category: productData.category,
    subCategory: productData.subCategory,
    unit: productData.unit,
    stock: productData.stock,
    expd: productData.expd,
    price: {
      original: productData.price.original,
      discounted: productData.price.discounted,
    },
    imageUrl: productData.imageUrl,
    description: productData.description,
  });

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [errors, setErrors] = useState({});

  // Filter subcategories based on selected category
  useEffect(() => {
    if (data.category) {
      const filtered = productSubCategory.filter(
        (subCat) => subCat.category === data.category
      );
      setFilteredSubCategories(filtered);
    }
  }, [data.category]);

  // Handle input changes
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

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = "Product name is required";
    if (!data.brand.trim()) newErrors.brand = "Brand is required";
    if (!data.category) newErrors.category = "Category is required";
    if (!data.subCategory) newErrors.subCategory = "Subcategory is required";
    if (!data.unit) newErrors.unit = "Unit is required";
    if (data.stock <= 0) newErrors.stock = "Stock must be greater than 0";
    if (!data.expd) newErrors.expd = "Expiration date is required";
    if (data.price.original <= 0)
      newErrors["price.original"] = "Original price must be greater than 0";
    if (data.price.discounted <= 0)
      newErrors["price.discounted"] = "Discounted price must be greater than 0";
    if (data.price.discounted > data.price.original)
      newErrors["price.discounted"] =
        "Discounted price cannot be greater than original price";
    if (!data.imageUrl.trim()) newErrors.imageUrl = "Image URL is required";
    if (!data.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const response = await fetch(
        `${SummaryApi.updateProduct.url}/${productData._id}`,
        {
          method: SummaryApi.updateProduct.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      toast.success("Product updated successfully!");
      onClose(); // Close the modal

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
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b">
          <h2 className="font-bold text-lg">Edit Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        {/* Form Section */}
        <form className="grid p-4 gap-2" onSubmit={handleSubmit}>
          {/* Product Name */}
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter product name"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            className={`p-2 bg-slate-100 border rounded ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

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
            className={`p-2 bg-slate-100 border rounded ${
              errors.brand ? "border-red-500" : ""
            }`}
          />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand}</p>
          )}

          {/* Category */}
          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className={`p-2 bg-slate-100 border rounded ${
              errors.category ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Category</option>
            {productCategory.map((el) => (
              <option value={el.value} key={el.id}>
                {el.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}

          {/* Sub Category */}
          {data.category && (
            <>
              <label htmlFor="subCategory" className="mt-3">
                Sub Category:
              </label>
              <select
                value={data.subCategory}
                name="subCategory"
                onChange={handleOnChange}
                className={`p-2 bg-slate-100 border rounded ${
                  errors.subCategory ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Sub Category</option>
                {filteredSubCategories.map((subCat) => (
                  <option value={subCat.value} key={subCat.id}>
                    {subCat.label}
                  </option>
                ))}
              </select>
              {errors.subCategory && (
                <p className="text-red-500 text-sm">{errors.subCategory}</p>
              )}
            </>
          )}

          {/* Unit */}
          <label htmlFor="unit" className="mt-3">
            Unit:
          </label>
          <select
            value={data.unit}
            name="unit"
            onChange={handleOnChange}
            className={`p-2 bg-slate-100 border rounded ${
              errors.unit ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Unit</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="g">Gram (g)</option>
            <option value="L">Liter (L)</option>
            <option value="mL">Milliliter (mL)</option>
            <option value="piece">Piece</option>
          </select>
          {errors.unit && <p className="text-red-500 text-sm">{errors.unit}</p>}

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
            className={`p-2 bg-slate-100 border rounded ${
              errors.stock ? "border-red-500" : ""
            }`}
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock}</p>
          )}

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
            className={`p-2 bg-slate-100 border rounded ${
              errors.expd ? "border-red-500" : ""
            }`}
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.expd && <p className="text-red-500 text-sm">{errors.expd}</p>}

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
            className={`p-2 bg-slate-100 border rounded ${
              errors["price.original"] ? "border-red-500" : ""
            }`}
          />
          {errors["price.original"] && (
            <p className="text-red-500 text-sm">{errors["price.original"]}</p>
          )}

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
            className={`p-2 bg-slate-100 border rounded ${
              errors["price.discounted"] ? "border-red-500" : ""
            }`}
          />
          {errors["price.discounted"] && (
            <p className="text-red-500 text-sm">{errors["price.discounted"]}</p>
          )}

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
            className={`p-2 bg-slate-100 border rounded ${
              errors.imageUrl ? "border-red-500" : ""
            }`}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm">{errors.imageUrl}</p>
          )}

          {/* Image Preview */}
          {data.imageUrl && (
            <div className="mt-2 flex justify-center">
              <img
                src={data.imageUrl}
                alt="Product Preview"
                className="max-h-20 max-w-full object-contain rounded border"
              />
            </div>
          )}

          {/* Description */}
          <label htmlFor="description" className="mt-3">
            Description:
          </label>
          <textarea
            className={`h-28 bg-slate-100 border resize-none p-1 ${
              errors.description ? "border-red-500" : ""
            }`}
            placeholder="Enter product description"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="px-3 py-2 bg-red-600 text-white mb-16 hover:bg-red-700"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProduct;
