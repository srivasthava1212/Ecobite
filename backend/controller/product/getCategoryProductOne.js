const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {
    // Fetch distinct categories & subcategories
    const productCategories = await productModel.distinct("category");
    const productSubCategories = await productModel.distinct("subCategory");

    console.log("Categories:", productCategories);
    console.log("Subcategories:", productSubCategories);

    // Array to store one product from each category
    const productByCategory = [];

    for (const category of productCategories) {
      const product = await productModel.findOne({ category });

      if (product) {
        productByCategory.push(product);
      }
    }

    res.json({
      message: "Category product",
      categories: productCategories,
      subCategories: productSubCategories, // ✅ Include subcategories
      data: productByCategory,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryProduct;
