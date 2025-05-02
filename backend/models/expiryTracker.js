const mongoose = require("mongoose");

const expirySchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "product",
			required: true,
		},
		expiryDate: { type: Date, required: true },
		notified: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

const ExpiryTracker = mongoose.model("expiry", expirySchema);
module.exports = ExpiryTracker;
