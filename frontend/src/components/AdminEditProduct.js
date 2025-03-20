import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
    stock: productData?.stock,
    unit: productData?.unit,
    expd: productData?.expd,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Handle nested price object
    if (name.startsWith("price.")) {
      const priceField = name.split(".")[1];
      setData((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [priceField]: value,
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: name === "stock" ? Number(value) : value,
      }));
    }
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert prices to numbers
    const submitData = {
      ...data,
      price: {
        original: Number(data.price.original),
        discounted: Number(data.price.discounted),
      },
      stock: Number(data.stock),
    };

    try {
      const response = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData?.message);
        onClose();
        fetchdata();
      } else {
        toast.error(responseData?.message);
      }
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Edit Product</h2>
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
          {/* Product Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label htmlFor="productName">Product Name:</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={data.productName}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="brandName">Brand Name:</label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  value={data.brandName}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="category">Category:</label>
                <select
                  value={data.category}
                  name="category"
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded w-full"
                  required
                >
                  <option value="">Select Category</option>
                  {productCategory.map((el, index) => (
                    <option value={el.value} key={el.value + index}>
                      {el.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="stock">Stock:</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={data.stock}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded w-full"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label htmlFor="unit">Unit:</label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  value={data.unit}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded w-full"
                  required
                  placeholder="e.g., kg, pieces"
                />
              </div>

              <div>
                <label htmlFor="expd">Expiration Date:</label>
                <input
                  type="date"
                  id="expd"
                  name="expd"
                  value={data.expd}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded w-full"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label htmlFor="price.original">Original Price:</label>
                <input
                  type="number"
                  id="price.original"
                  name="price.original"
                  value={data.price.original}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="price.discounted">Discounted Price:</label>
                <input
                  type="number"
                  id="price.discounted"
                  name="price.discounted"
                  value={data.price.discounted}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-100 border rounded w-full"
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mt-4">
            <label htmlFor="productImage">Product Images:</label>
            <label htmlFor="uploadImageInput" className="block">
              <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                <div className="text-slate-500 flex flex-col items-center gap-2">
                  <FaCloudUploadAlt className="text-4xl" />
                  <p className="text-sm">Upload Product Image</p>
                </div>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                  accept="image/*"
                />
              </div>
            </label>

            <div className="flex flex-wrap gap-2 mt-4">
              {data.productImage.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Product ${index + 1}`}
                    className="w-20 h-20 object-cover border rounded cursor-pointer"
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(img);
                    }}
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteProductImage(index)}
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-4">
            <label htmlFor="description">Description:</label>
            <textarea
              className="w-full h-32 bg-slate-100 border resize-none p-2 rounded"
              placeholder="Enter product description"
              name="description"
              value={data.description}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Update Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
