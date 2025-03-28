const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body._id;

    const deleteProduct = await addToCartModel.deleteOne({
      _id: addToCartProductId,
      userId: currentUserId, // Ensure only the owner can delete
    });

    if (deleteProduct.deletedCount === 0) {
      return res.json({
        message: "Product not found or unauthorized",
        error: true,
        success: false,
      });
    }

    res.json({
      message: "Product Deleted From Cart",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteAddToCartProduct;
