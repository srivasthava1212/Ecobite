const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    price: {
      original: { type: Number, required: true },
      discounted: { type: Number, required: true },
    },
    expd: { type: String, required: true }, // Expiry date
    ecoDeal: { type: Boolean, default: false },
    stock: { type: Number, required: true },
    unit: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    brand: { type: String, required: true },
    subCategory: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
