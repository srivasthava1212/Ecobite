import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]); // Ensure it's an array
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse?.data || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching category data:", error);
      setCategoryProduct([]); // Set empty array on error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                key={"categoryLoading" + index}
              ></div>
            ))
          : (categoryProduct || []).map((product, index) => (
              <Link
                to={`/product-category?category=${product?.category}`}
                className="cursor-pointer"
                key={index}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                  {product?.productImage && product?.productImage.length > 0 ? (
                    <img
                      src={product.productImage[0]}
                      alt={product.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  ) : (
                    <p className="text-xs text-gray-500">No Image</p>
                  )}
                </div>
                <p className="text-center text-sm md:text-base capitalize">
                  {product?.category || "Unknown"}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
