const mongoose = require("mongoose");
const productModel = require("../../models/productModel");
const fs = require("fs");

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Read JSON files
const snacksAndDrinks = JSON.parse(
  fs.readFileSync("./data/SnacksAndDrinks.json", "utf-8")
);
const groceryAndKitchen = JSON.parse(
  fs.readFileSync("./data/GroceryAndKitchen.json", "utf-8")
);

// Function to upload products
const uploadProduct = async (req, res) => {
  try {
    // Your product upload logic here
    res
      .status(200)
      .json({ success: true, message: "Product uploaded successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error uploading product", error });
  }
};

module.exports = uploadProduct;
