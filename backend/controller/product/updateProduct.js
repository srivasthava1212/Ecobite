const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
  try {
    // Check permission
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }

    const { id } = req.params; // Get the product ID from the URL
    const { ...resBody } = req.body; // Get the updated data from the request body

    // Validate product ID
    if (!id) {
      throw new Error("Product ID is required");
    }

    // Update the product
    const updateProduct = await productModel.findByIdAndUpdate(id, resBody, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validations
    });

    // Check if the product was found and updated
    if (!updateProduct) {
      throw new Error("Product not found");
    }

    // Send success response
    res.json({
      message: "Product updated successfully",
      data: updateProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    // Send error response
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateProductController;
