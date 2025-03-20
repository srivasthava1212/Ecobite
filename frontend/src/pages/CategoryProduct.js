import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import VerticalCard from "../components/VerticalCard";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    fetchCategoryWiseProduct(category).then(setData);
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Styled h2 Tag */}
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 uppercase border-b-2 border-gray-200 pb-4">
        {category}
      </h2>

      {/* VerticalCard Component */}
      <VerticalCard data={data} />
    </div>
  );
};

export default CategoryProduct;
