import logo from "./logo.svg";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const location = useLocation(); // Get the current route path

  // Define paths where header and footer should be hidden
  const hideHeaderFooterPaths = ["/login", "/sign-up", "/forgot-password"];

  // Check if the current path is in the hideHeaderFooterPaths array
  const shouldHideHeaderFooter = hideHeaderFooterPaths.includes(
    location.pathname
  );

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    /**user Details */
    fetchUserDetails();
    /**user Details cart product */
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />

        {/* Conditionally render the header */}
        {!shouldHideHeaderFooter && <Header />}

        {/* Conditionally apply classes to main */}
        <main
          className={`${
            !shouldHideHeaderFooter ? "min-h-[calc(100vh-120px)] pt-16" : ""
          }`}
        >
          <Outlet />
        </main>

        {/* Conditionally render the footer */}
        {!shouldHideHeaderFooter && <Footer />}
      </Context.Provider>
    </>
  );
}

export default App;
