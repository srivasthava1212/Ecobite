import React, { useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import VerticalCard from "../components/VerticalCard";

const VerticalCardProduct = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // Default tab is "All Products"

  // useEffect(() => {
  //   fetchCategoryWiseProduct().then(setData);
  // }, []);
  useEffect(() => {
    fetchCategoryWiseProduct().then((response) => {
      console.log("Fetched Data:", response);
      setData(response);
    });
  }, []);

  // Filter products based on selected tab
  const filteredData =
    activeTab === "all"
      ? data
      : data.filter((item) => item.ecoDeal === (activeTab === "eco"));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Heading */}
      <h2 className="text-4xl font-bold text-center mb-6 text-gray-800 uppercase border-b-2 border-gray-200 pb-4">
        Products
      </h2>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 uppercase col-span-full">
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

      {/* Render Filtered Products */}
      <VerticalCard data={filteredData} />
    </div>
  );
};

export default VerticalCardProduct;
