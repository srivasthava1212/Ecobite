import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import VerticalCard from "../components/VerticalCard";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // State to track active tab
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    fetchCategoryWiseProduct(category).then(setData);
  }, [category]);

  // Filter products based on the active tab
  const filteredData =
    activeTab === "all"
      ? data
      : data.filter((item) => item.ecoDeal === (activeTab === "eco"));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Heading */}
      <h2 className="text-4xl font-bold text-center mb-6 text-gray-800 uppercase border-b-2 border-gray-200 pb-4">
        {category}
      </h2>

      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "all"
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Products
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "fresh"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("fresh")}
        >
          Fresh Picks
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "eco"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("eco")}
        >
          EcoDeals
        </button>
      </div>

      {/* Render Products */}
      <VerticalCard data={filteredData} />
    </div>
  );
};

export default CategoryProduct;
