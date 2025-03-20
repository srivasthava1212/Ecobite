const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;

    if (!category) {
      console.log("❌ No category provided");
      return res.status(400).json({
        message: "Category is required",
        error: true,
        success: false,
      });
    }

    console.log(`🔍 Searching for category: ${category}`);

    // Normalize category name for better matching
    const normalizedCategory = category.trim().toLowerCase();

    const products = await productModel.find({
      category: { $regex: new RegExp(`^${normalizedCategory}$`, "i") },
    });

    console.log(`✅ Found products: ${products.length} products`);

    res.json({
      data: products,
      message: "Products retrieved successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.log("❌ Error fetching products:", err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryWiseProduct;
