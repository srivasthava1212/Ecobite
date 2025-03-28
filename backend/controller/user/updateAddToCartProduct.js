const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body._id;
    const qty = req.body.quantity;

    const updateProduct = await addToCartModel.updateOne(
      { _id: addToCartProductId, userId: currentUserId }, // Ensure the user owns it
      { $set: { quantity: qty } }
    );

    if (updateProduct.modifiedCount === 0) {
      return res.json({
        message: "Product not found or unauthorized",
        error: true,
        success: false,
      });
    }

    res.json({
      message: "Product Updated",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddToCartProduct;
