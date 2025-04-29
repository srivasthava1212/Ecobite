const orderModel = require("../../models/orderProductModel");
const ordercontroller = async (request, response) => {
	try {
		const currentuser = request.userId;
		const orderList = await orderModel
			.find({ userId: currentuser })
			.sort({ createdAt: -1 });

		response.status(200).json({
			data: orderList,
			message: "Order List",
			success: true,
		});
	} catch (error) {
		response.status(500).json({
			message: error?.message || error,
			error: true,
		});
	}
};
module.exports = ordercontroller;
