const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();
const path = require("path");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

// Define product schema
const productSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: String,
    imageUrl: String,
    description: String,
    price: {
      original: Number,
      discounted: Number,
    },
    expd: String,
    ecoDeal: Boolean,
    stock: Number,
    unit: String,
    category: String,
    subCategory: String,
    tags: [String],
    brand: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

// Function to read JSON files
const loadJsonData = (filePath) => {
  const fullPath = path.join(__dirname, filePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
};

// Function to extract products from JSON data
const extractProducts = (jsonData) => {
  let products = [];
  jsonData.categories.forEach((category) => {
    category.subcategories.forEach((subCategory) => {
      subCategory.products.forEach((product) => {
        products.push({
          id: product.id.toString(), // Convert to string for consistency
          name: product.name,
          imageUrl: product.imageUrl,
          description: product.description,
          price: product.price,
          expd: product.expd,
          ecoDeal: product.ecoDeal,
          stock: product.stock,
          unit: product.unit,
          category: product.category,
          subCategory: product.subCategory,
          tags: product.tags,
          brand: product.brand,
        });
      });
    });
  });
  return products;
};

// Function to insert products into MongoDB
const insertProducts = async () => {
  await connectDB();

  // Load and extract products from JSON files
  const groceryData = loadJsonData("./data/GroceryAndKitchen.json");
  const snacksData = loadJsonData("./data/SnacksAndDrinks.json");

  const allProducts = [
    ...extractProducts(groceryData),
    ...extractProducts(snacksData),
  ];

  console.log(`Total products extracted: ${allProducts.length}`);

  // Perform bulk update with upsert to prevent duplicates
  const bulkOperations = allProducts.map((product) => ({
    updateOne: {
      filter: { id: product.id },
      update: { $set: product },
      upsert: true,
    },
  }));

  await Product.bulkWrite(bulkOperations);

  console.log("Bulk upload completed successfully!");

  mongoose.connection.close();
};

// Execute the script
insertProducts().catch((err) => console.error("Error in bulk upload:", err));
