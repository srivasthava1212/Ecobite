import React, { useEffect, useState } from "react";
import moment from "moment";

const ExpiryTracker = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const response = await fetch("http://localhost:8080/get-product");
			const data = await response.json();

			if (data.success) {
				setProducts(data.data || []);
			}
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setLoading(false);
		}
	};

	const getRemainingTime = (expd) => {
		const now = moment();
		const expiry = moment(expd, "YYYY-MM-DD");
		const duration = moment.duration(expiry.diff(now));

		if (duration.asMilliseconds() <= 0) return "Expired";

		const days = duration.days();
		const months = duration.months();
		const years = duration.years();

		return `${years > 0 ? `${years}y ` : ""}${
			months > 0 ? `${months}m ` : ""
		}${days}d remaining`;
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Expiry Tracker</h2>

			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="grid gap-4">
					{products.map((product) => (
						<div
							key={product._id}
							className="border rounded p-4 shadow-md bg-white"
						>
							<h3 className="text-lg font-semibold">{product.name}</h3>
							<p>Expiry Date: {moment(product.expd).format("LL")}</p>
							<p className="text-red-600 font-medium">
								{getRemainingTime(product.expd)}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ExpiryTracker;
