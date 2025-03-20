import React, { useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import VerticalCard from "./VerticalCard";

const CategoryWiseProductDisplay = ({ category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCategoryWiseProduct(category).then(setData);
  }, [category]);

  return <VerticalCard data={data} category={category} />;
};

export default CategoryWiseProductDisplay;
