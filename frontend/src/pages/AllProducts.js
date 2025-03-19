import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const dataResponse = await response.json();
      setAllProducts(dataResponse.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <h2 className="font-bold text-lg">All Products</h2>
      <div className="grid grid-cols-3 gap-5 py-4">
        {allProducts.map((product) => (
          <AdminProductCard
            key={product.id}
            data={product}
            fetchData={fetchAllProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
