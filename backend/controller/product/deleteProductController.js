const Permission = require('../../helpers/permission')
const productModel = require('../../models/productModel')


async function deleteProductController(req, res) {
  
  try {
    if (!Permission(req.userId)) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const { _id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(_id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully",
      data: deletedProduct
    });

  } 
 catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = deleteProductController