import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === null || user === undefined) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      if (user.role !== ROLE.ADMIN) {
        navigate("/");
      }
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar (no longer fixed) */}
      <aside className="bg-white w-64 shadow-lg h-screen flex-shrink-0">
        <div className="h-40 flex flex-col justify-center items-center border-b">
          <div className="mb-2">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser className="text-5xl text-black" />
            )}
          </div>
          <p className="font-semibold text-black">{user?.username}</p>
          <p className="text-sm text-black uppercase">{user?.role}</p>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="all-users"
            className="block px-4 py-2.5 rounded-lg text-black hover:bg-gray-100 transition-all duration-200 hover:pl-6"
          >
            All Users
          </Link>
          <Link
            to="all-products"
            className="block px-4 py-2.5 rounded-lg text-black hover:bg-gray-100 transition-all duration-200 hover:pl-6"
          >
            All Products
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <header className="bg-white shadow-sm p-8 h-20 flex items-center">
          <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
        </header>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
