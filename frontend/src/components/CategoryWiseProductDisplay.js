import React, { useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import VerticalCard from "./VerticalCard";

const CategoryWiseProductDisplay = ({ category }) => {
  const [data, setData] = useState([]);

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

export default CategoryWiseProductDisplay;
