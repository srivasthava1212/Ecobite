const addToCartModel = require("../../models/cartProduct");

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;

    const allProduct = await addToCartModel
      .find({ userId: currentUser })
      .populate({
        path: "productId",
        select: "name imageUrl price category unit brand",
      });

    // console.log("Fetched Cart Products:", allProduct); // Debugging output

    const formattedProducts = allProduct.map((item) => ({
      _id: item._id,
      name: item.productId?.name || "Unknown Product",
      image: item.productId?.imageUrl || "default-image-url.jpg",
      category: item.productId?.category || "Uncategorized",
      brand: item.productId?.brand || "No Brand",
      quantity: item.quantity,
      unit: item.productId?.unit || "",
      price: {
        original: item.productId?.price?.original || 0,
        discounted: item.productId?.price?.discounted || 0,
      },
    }));

    // console.log("Formatted Products:", formattedProducts); // Debugging output

    res.json({
      data: formattedProducts,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error in addToCartViewProduct:", err);
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartViewProduct;
