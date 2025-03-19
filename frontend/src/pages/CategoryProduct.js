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
    <div>
      <h2>{category} Products</h2>
      <VerticalCard data={data} />
    </div>
  );
};

export default CategoryProduct;
