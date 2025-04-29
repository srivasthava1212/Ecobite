import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common"; // Correct import
import displayINRCurrency from "../helpers/displayCurrency";
import CategroyWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
	const { id } = useParams(); // Extracting product ID from URL
	const [data, setData] = useState(null);
	const [activeImage, setActiveImage] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchProductDetails();
	}, [id]);

	const fetchProductDetails = async () => {
		setLoading(true);
		console.log("Request Payload:", { productId: id }); // Debugging

		try {
			const response = await fetch(SummaryApi.productDetails.url, {
				method: SummaryApi.productDetails.method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ productId: id }), // Fixing request payload
			});

			if (!response.ok) {
				throw new Error("Failed to fetch product details");
			}

			const dataResponse = await response.json();
			console.log("API Response:", dataResponse); // Debugging

			if (!dataResponse.success || !dataResponse.data) {
				throw new Error("Invalid response data");
			}

			setData(dataResponse.data);
			setActiveImage(dataResponse.data.imageUrl); // Fixing image handling
		} catch (error) {
			console.error("Error fetching product details:", error.message);
			setData(null);
			setActiveImage("");
		} finally {
			setLoading(false);
		}
	};
	const { fetchUserAddToCart } = useContext(Context);
	const handleAddToCart = async (e, id) => {
		await addToCart(e, id);
		fetchUserAddToCart();
	};

	// Inside your component
	const navigate = useNavigate();

	const handleBuyNow = async (e, id) => {
		e.preventDefault(); // prevent default link behavior if needed
		await addToCart(e, id);
		fetchUserAddToCart();
		navigate("/cart"); // navigate after action completes
	};

	return (
		<div className="container mx-auto px-4 py-8">
			{loading ? (
				<p className="text-center text-gray-500 text-lg font-semibold">
					Loading...
				</p>
			) : data ? (
				<div className="flex flex-col md:flex-row items-start">
					{" "}
					{/* Removed gap */}
					{/* Product Image Section */}
					<div className="w-full md:w-1/2 flex flex-col items-center">
						{activeImage ? (
							<img
								src={activeImage}
								alt="Product"
								className="w-72 h-72 object-cover rounded-lg shadow-lg border border-gray-300"
							/>
						) : (
							<p className="text-gray-500">No Image Available</p>
						)}
					</div>
					{/* Product Details Section */}
					<div className="w-full md:w-1/2">
						<h1 className="text-3xl font-bold text-gray-800">
							{data.name || "Product Name Not Available"}
						</h1>
						<p className="text-gray-600 mt-2">
							{data.description || "No description available."}
						</p>

						{/* Price Section */}
						<div className="mt-4">
							{data.price?.discounted ? (
								<div className="text-2xl font-semibold">
									<span className="line-through text-gray-500 mr-2">
										{displayINRCurrency(data.price.original)}
									</span>
									<span className="text-green-600">
										{displayINRCurrency(data.price.discounted)}
									</span>
								</div>
							) : (
								<span className="text-2xl font-semibold text-gray-900">
									${data.price?.original || "N/A"}
								</span>
							)}
						</div>

						{/* Additional Details */}
						<div className="mt-4 text-gray-700 text-sm space-y-2">
							<p>
								<span className="font-medium">Category:</span> {data.category}
							</p>
							<p>
								<span className="font-medium">Brand:</span> {data.brand}
							</p>
							<p>
								<span className="font-medium">Expiry Date:</span> {data.expd}
							</p>
						</div>

						{/* Add to Cart Button */}
						<button
							className="mt-6 w-40 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 mx-1 rounded-lg transition duration-300"
							onClick={(e) => handleBuyNow(e, data._id)}
						>
							<a href="/cart">Buy Now</a>
						</button>
						<button
							className="mt-6 w-40 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
							onClick={(e) => handleAddToCart(e, data._id)}
						>
							Add to Cart
						</button>
					</div>
				</div>
			) : (
				<p className="text-center text-red-500 text-lg font-semibold">
					Product not found
				</p>
			)}
			{data?.category && (
				<CategroyWiseProductDisplay
					category={data.category}
					heading={"Recommended Product"}
				/>
			)}
		</div>
	);
};

export default ProductDetails;
