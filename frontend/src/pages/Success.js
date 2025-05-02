import React, { useState } from "react";
import SUCCESSIMAGE from "../assets/success.gif";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Success = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [error, setError] = useState("");

	const handleDone = () => {
		if (!selectedDate) {
			setError("*Select a date");
		} else {
			setError("");
			setShowModal(false);
			const formattedDate = new Date(selectedDate).toLocaleDateString("en-GB");
			// Handle the success of the date selection
			console.log(`Your order has been scheduled for ${formattedDate}`);
		}
	};

	return (
		<div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded ">
			<img
				src={SUCCESSIMAGE}
				width={150}
				height={150}
				className="mix-blend-multiply"
			/>
			<p className="text-green-600 font-bold text-xl">Payment successful</p>

			<div className="flex gap-3 mt-5">
				<Link
					to={"/orders"}
					className="p-2 px-3 border-2 border-green-600 rounded font-semi-bold text-green-600 hover:bg-green-600 hover:text-white"
				>
					See Orders
				</Link>
				<button
					onClick={() => setShowModal(true)}
					className="p-2 px-3 border-2 border-green-600 rounded font-semi-bold text-green-600 hover:bg-green-600 hover:text-white"
				>
					Schedule Delivery Date
				</button>
			</div>

			{/* Modal for Date Picker */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded shadow-md w-[300px]">
						<h2 className="text-lg font-bold text-center mb-4">
							Available Dates
						</h2>
						<DatePicker
							selected={selectedDate}
							onChange={(date) => setSelectedDate(date)}
							inline
							className="w-full"
						/>
						{error && <p className="text-red-600 text-sm mt-2">{error}</p>}
						<button
							onClick={handleDone}
							className="mt-4 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
						>
							Done
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Success;
