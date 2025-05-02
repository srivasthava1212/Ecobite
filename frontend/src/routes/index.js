import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassowrd from "../pages/ForgotPassowrd";
import Signup from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import ExpiryTracker from "../pages/ExpiryTracker";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "forgot-password",
				element: <ForgotPassowrd />,
			},
			{
				path: "sign-up",
				element: <Signup />,
			},
			{
				path: "product-category",
				element: <CategoryProduct />,
			},
			{
				path: "product/:id",
				element: <ProductDetails />,
			},
			{
				path: "cart",
				element: <Cart />,
			},
			{
				path: "success",
				element: <Success />,
			},
			{
				path: "cancel",
				element: <Cancel />,
			},
			{
				path: "search",
				element: <SearchProduct />,
			},
			{
				path: "orders",
				element: <OrderPage />,
			},
			{
				path: "admin-panel",
				element: <AdminPanel />,
				children: [
					{
						path: "all-users",
						element: <AllUsers />,
					},
					{
						path: "all-products",
						element: <AllProducts />,
					},
				],
			},
			{
				path: "track-expiry",
				element: <ExpiryTracker />,
			},
		],
	},
]);

export default router;
