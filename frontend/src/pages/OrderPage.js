import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";

const OrderPage = () => {
	const [data, setData] = useState([]);

	const fetchOrderDetails = async () => {
		try {
			const response = await fetch(SummaryApi.getOrder.url, {
				method: SummaryApi.getOrder.method,
				credentials: "include",
			});

			const responseData = await response.json();

			if (response.status === 401 || !responseData.data) {
				toast.error("Please Login..");
				return;
			}

			setData(responseData.data);
			console.log("Order List: ", responseData);
		} catch (error) {
			toast.error("Something went wrong!");
			console.error("Order fetch error:", error);
		}
	};

	useEffect(() => {
		fetchOrderDetails();
	}, []);

	return (
		<div>
			{!data[0] && <p>No Order Available</p>}

			<div className="p-4">
				{data.map((item, index) => (
					<div key={item.userId + index}>
						<p className="font-medium text-lg">
							{moment(item.createdAt).format("LL")}
						</p>

						<div className="border rounded">
							<div className="flex flex-col lg:flex-row lg:justify-between">
								<div className="grid gap-2">
									{/* Check if productDetails exists before using .map */}
									{item?.productDetails && item.productDetails.length > 0 ? (
										item.productDetails.map((product, index) => (
											<div
												key={product.productId + index}
												className="flex gap-3 bg-white p-2"
											>
												<img
													src={product.image}
													className="w-28 h-28 bg-slate-200 object-scale-down "
												/>
												<div>
													<div className="font-medium text-lg text-ellipsis line-clamp-1">
														{product.name}
													</div>
													<div className="flex items-center mt-1 gap-5">
														<div className="text-lg text-red-500">
															{displayINRCurrency(product.price)}
														</div>
														<p>Quantity: {product.quantity}</p>
													</div>
												</div>
											</div>
										))
									) : (
										<p>No Products Available</p>
									)}
								</div>

								<div className="flex flex-col gap-4 p-2 min-w-[300px]">
									<div>
										<div className="text-lg font-medium">Payment Details:</div>
										<p className=" ml-1">
											Payment method:{" "}
											{item.paymentDetails.payment_method_type[0]}
										</p>
										<p className=" ml-1">
											Payment Status: {item.paymentDetails.payment_status}
										</p>
									</div>
									<div>
										<div className="text-lg font-medium">Shipping Details:</div>
										{/* Check if shipping_options exists before using .map */}
										{item.shipping_details &&
										item.shipping_details.length > 0 ? (
											item.shipping_details.map((shipping, index) => {
												return (
													<div key={shipping.shipping_rate} className=" ml-1">
														Shipping Amount:{" "}
														{displayINRCurrency(shipping.shipping_amount)}
													</div>
												);
											})
										) : (
											<p className=" ml-1">No Shipping Options Available</p>
										)}
									</div>
								</div>
							</div>

							<div className="font-semibold w-fit ml-auto lg:text-xl">
								Total Amount: {displayINRCurrency(item.totalAmount)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderPage;
