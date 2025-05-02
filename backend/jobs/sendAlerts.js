const ExpiryModel = require("../../models/expiryTracker");
const UserModel = require("../../models/userModel");
const ProductModel = require("../../models/productModel");
const sendNotification = require("../../utils/sendNotification");

const sendAlerts = async () => {
	const entries = await ExpiryModel.find({ notified: false });

	for (const entry of entries) {
		const user = await UserModel.findById(entry.userId);
		const product = await ProductModel.findById(entry.productId);

		if (!user || !product) continue;

		await sendNotification({ user, product });
		entry.notified = true;
		await entry.save();
	}

	console.log("Expiry alerts sent.");
};

module.exports = sendAlerts;
