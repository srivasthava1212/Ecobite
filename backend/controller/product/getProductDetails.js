const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        error: true,
        success: false,
      });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    res.json({
      data: product,
      message: "Ok",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = getProductDetails;
