import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  // Uncomment this effect to restrict access to admin only
  // useEffect(() => {
  //   if (user?.role !== ROLE.ADMIN) {
  //     navigate("/");
  //   }
  // }, [user]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white w-64 flex-shrink-0 shadow-lg">
        <div className="h-40 flex flex-col justify-center items-center border-b">
          <div className="mb-2">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser className="text-5xl text-gray-400" />
            )}
          </div>
          <p className="font-semibold text-gray-700">{user?.username}</p>
          <p className="text-sm text-gray-500 uppercase">{user?.role}</p>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          <Link
            to="all-users"
            className="block px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:pl-6"
          >
            All Users
          </Link>
          <Link
            to="all-products"
            className="block px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:pl-6"
          >
            All Products
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 mt-0">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
