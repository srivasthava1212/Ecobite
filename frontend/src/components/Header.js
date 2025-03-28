import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import "./Header.css";
import { TfiSearch } from "react-icons/tfi";
import { BsCart4 } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Context from "../context";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  console.log("userHeader", user);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }

    if (data.error) {
      toast.error(data.message);
    }
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="bg-black p-1 w-full shadow-md shadow-gray-400 header text-center">
      <div className="flex items-center justify-between max-w-screen mx-3">
        {/* Logo */}
        <div className="flex items-center w-60">
          <button>
            <a href="/">
              <img
                src={logo}
                alt="Smart Grocery Logo"
                className="h-full w-full"
              />
            </a>
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex w-1/3">
          <input
            placeholder="Search Here"
            className="h-10 w-full ml-20 p-2 bg-gray-200 rounded-xl"
            onChange={handleSearch}
            value={search}
          />
          <button className="cartbtn">
            <TfiSearch className="h-9 ml-3" size={22} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-8 text-black text-lg font-medium p-3 rounded-lg">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/orders">Orders</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
          <Link to={"/cart"} className="cartbtn relative">
            <span>
              <BsCart4 size={30} />{" "}
            </span>
            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-xs ">{context?.cartProductCount}</p>
            </div>
          </Link>
          <div
            className="relative flex justify-center"
            onClick={() => {
              setMenuDisplay((prev) => !prev);
            }}
          >
            {" "}
            <button className="cartbtn">
              {}
              <FaUserCircle className="text-xl" size={30} />
            </button>
            {menuDisplay && (
              <div
                className="absolute bg-slate-200 bottom-0 top-11 h-fit p-4 shadow-lg rounded  "
                onClick={() => {
                  setMenuDisplay((prev) => !prev);
                }}
              >
                <a
                  className="whitespace-nowrap hover:bg-slate-100 p-2"
                  href="/admin-panel/all-users"
                >
                  Admin Panel
                </a>
              </div>
            )}
          </div>

          {user?._id ? (
            <button
              onClick={handleLogout}
              className="px-4 py-1 ml-3 rounded-full text-white bg-red-600 hover:bg-red-500"
            >
              <a href="/login">Logout</a>
            </button>
          ) : (
            <button className="px-4 py-1 ml-3 rounded-full text-white bg-red-600 hover:bg-red-500">
              <a href="/login">Login</a>
            </button>
          )}
        </nav>

        {/* Hamburger Menu for md and below */}
        <div className="lg:hidden flex justify-between">
          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger">
            <GiHamburgerMenu size={30} />
          </button>

          {user?._id ? (
            <button
              onClick={handleLogout}
              className="px-4 py-1 ml-3 rounded-full text-white bg-red-600 hover:bg-red-500"
            >
              <a href="/login">Logout</a>
            </button>
          ) : (
            <button className="px-4 py-1 ml-3 rounded-full text-white bg-red-600 hover:bg-red-500">
              <a href="/login">Login</a>
            </button>
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <button className="dropdown-btn">
                <a href="/admin-panel/all-users">Profile</a>
              </button>
            </li>
            <li>
              <button className="dropdown-btn">Orders</button>
            </li>
            <li>
              <div className="flex justify-center items-center">
                <div>
                  <button className="dropdown-btn">
                    <a href="/cart">Cart</a>
                  </button>
                </div>

                <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center">
                  <p className="text-xs ">0</p>
                </div>
              </div>
            </li>
            <li>
              <button className="dropdown-btn">About</button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
