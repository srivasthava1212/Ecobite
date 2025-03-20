import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      {/* Use the correct categories from your database */}
      <HorizontalCardProduct
        category={"Dairy"}
        heading={"Fresh Dairy Products"}
      />
      <HorizontalCardProduct
        category={"Snacks"}
        heading={"Best Selling Snacks"}
      />

      <VerticalCardProduct
        category={"Drinks"}
        heading={"Refreshing Beverages"}
      />
      <VerticalCardProduct
        category={"Packaged Food"}
        heading={"Instant & Packaged Foods"}
      />
      <VerticalCardProduct category={"Eggs"} heading={"Eggs & Poultry"} />
      <VerticalCardProduct category={"Masala"} heading={"Spices & Masala"} />
      <VerticalCardProduct
        category={"Atta, Rice, Oil & Dals"}
        heading={"Kitchen Essentials"}
      />
      <VerticalCardProduct
        category={"Dry Fruits"}
        heading={"Healthy Dry Fruits & Nuts"}
      />
      <VerticalCardProduct
        category={"Breads"}
        heading={"Freshly Baked Breads"}
      />
    </div>
  );
};

export default Home;
