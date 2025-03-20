import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import GroceryCarousel from "../components/carousel";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const categories = [
          "Dairy",
          "Breads",
          "Eggs",
          "Atta, Rice, Oil & Dals",
          "Masala",
          "Dry Fruits",
          "Packaged Food",
          "Snacks",
          "Drinks",
        ];
        let allFetchedProducts = [];

        for (const category of categories) {
          const products = await fetchCategoryWiseProduct(category);
          allFetchedProducts = [...allFetchedProducts, ...products];
        }

        setAllProducts(allFetchedProducts);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div>
      <CategoryList />
      <BannerProduct />

      {/* ✅ Pass products to GroceryCarousel */}
      <GroceryCarousel products={allProducts} />

      <HorizontalCardProduct
        category={"Dairy"}
        heading={"Fresh Dairy Products"}
      />
      <HorizontalCardProduct
        category={"Snacks"}
        heading={"Best Selling Snacks"}
      />
      <HorizontalCardProduct
        category={"Drinks"}
        heading={"Refreshing Beverages"}
      />
      <HorizontalCardProduct
        category={"Packaged Food"}
        heading={"Instant & Packaged Foods"}
      />
      <HorizontalCardProduct category={"Eggs"} heading={"Eggs & Poultry"} />
      <HorizontalCardProduct category={"Masala"} heading={"Spices & Masala"} />
      <HorizontalCardProduct
        category={"Atta, Rice, Oil & Dals"}
        heading={"Kitchen Essentials"}
      />
      <HorizontalCardProduct
        category={"Dry Fruits"}
        heading={"Healthy Dry Fruits & Nuts"}
      />
      <HorizontalCardProduct
        category={"Breads"}
        heading={"Freshly Baked Breads"}
      />
    </div>
  );
};

export default Home;
