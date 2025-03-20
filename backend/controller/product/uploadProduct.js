const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      return res.status(403).json({
        message: "Permission denied",
        error: true,
        success: false,
      });
    }

    // Validate required fields
    const requiredFields = [
      "name",
      "brand",
      "category",
      "unit",
      "stock",
      "expd",
      "price",
      "imageUrl",
      "subCategory",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
        error: true,
        success: false,
      });
    }

    const uploadProduct = new productModel({
      ...req.body,
      id: Math.floor(Math.random() * 1000000), // Ensure numeric ID
    });

    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Product upload failed",
      error: true,
      success: false,
      validationError: err.name === "ValidationError",
    });
  }
}

module.exports = UploadProductController;
