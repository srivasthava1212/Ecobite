import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import productCategory from "../helpers/productCategory"; // Import predefined categories

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]); // Store filtered categories
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(9).fill(null); // Matches category count

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      const dataResponse = await response.json();

      console.log("Fetched category data (Full API Response):", dataResponse);

      // Create a lookup for category images
      const productImageLookup = {};
      dataResponse?.data?.forEach((product) => {
        productImageLookup[product.category] = product.imageUrl || "";
      });

      // Filter predefined categories and attach images
      const filteredCategories = productCategory.map((category) => ({
        name: category.label,
        value: category.value,
        imageUrl: productImageLookup[category.value] || "", // Use DB image if available
      }));

      console.log("Filtered Categories for Frontend:", filteredCategories);
      setCategoryList(filteredCategories);
    } catch (error) {
      console.error("Error fetching category data:", error);
      setCategoryList([]); // Set empty array on error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* ✅ Apply Grid Layout with 9 columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                className="h-20 w-20 md:h-24 md:w-24 rounded-md bg-slate-200 animate-pulse"
                key={"categoryLoading" + index}
              ></div>
            ))
          : categoryList.map((category, index) => (
              <Link
                to={`/product-category?category=${encodeURIComponent(
                  category.value
                )}`}
                className="cursor-pointer flex flex-col items-center gap-2"
                key={index} // 🔹 Added missing key prop
              >
                {/* ✅ Ensuring category text stays inside the container */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center">
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="h-full w-full object-contain mix-blend-multiply hover:scale-110 transition-all"
                    />
                  ) : (
                    <p className="text-xs text-gray-500">No Image</p>
                  )}
                </div>
                {/* ✅ Ensure text stays inside and centered */}
                <p className="text-center text-xs md:text-sm font-medium w-full truncate">
                  {category.name || "Unknown"}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
