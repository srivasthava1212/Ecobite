const ExpiryModel = require("../../models/expiryTracker");
const CartModel = require("../../models/cartProduct");
const ProductModel = require("../../models/productModel");

const trackExpiry = async () => {
	const allCarts = await CartModel.find({}).populate("productId");
	const now = new Date();

	for (const cart of allCarts) {
		const expiryDate = new Date(cart.productId.expd);
		const diffDays = (expiryDate - now) / (1000 * 60 * 60 * 24);

		// If product will expire in <= 7 days
		if (diffDays <= 7 && diffDays >= 0) {
			await ExpiryModel.updateOne(
				{ userId: cart.userId, productId: cart.productId._id },
				{ expiryDate: expiryDate },
				{ upsert: true }
			);
		}
	}

	console.log("Expiry check done.");
};

module.exports = trackExpiry;
