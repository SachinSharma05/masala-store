import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import {
  MdDashboard,
  MdShoppingBag,
  MdCategory,
  MdPeople,
  MdSettings,
  MdLogout
} from "react-icons/md";
import { authApi } from "../../api/authApi";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
  { name: "Dashboard", path: "/", icon: <MdDashboard size={20} /> },
  { name: "Products", path: "/products", icon: <MdShoppingBag size={20} /> },
  { name: "Categories", path: "/categories", icon: <MdCategory size={20} /> },
  { name: "Users", path: "/users", icon: <MdPeople size={20} /> },
  { name: "Settings", path: "/settings", icon: <MdSettings size={20} /> },
  { name: "App Settings", path: "/settings/app", icon: <MdSettings size={20} /> },
  { name: "Orders", path: "/orders", icon: <MdShoppingBag size={20} /> },
  { name: "Logout", action: "logout", icon: <MdLogout size={20} /> },
];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`
          fixed z-20 inset-y-0 left-0 w-64 bg-white shadow-md transform 
          transition-transform duration-200 
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-center py-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
        </div>

        <nav className="mt-4">
  {navItems.map((item) => {
    if (item.action === "logout") {
      return (
        <button
          key="logout"
          onClick={async () => {
            await authApi.logout();
            window.location.href = "/login";
          }}
          className="w-full text-left flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50"
        >
          {item.icon}
          Logout
        </button>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center gap-3 px-6 py-3 cursor-pointer
          hover:bg-blue-50 transition
          ${location.pathname.startsWith(item.path)
            ? "bg-blue-600 text-white"
            : "text-gray-700"}
        `}
      >
        {item.icon}
        {item.name}
      </Link>
    );
  })}
</nav>
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 md:ml-64">

        {/* Topbar */}
        <div className="sticky top-0 z-10 bg-white shadow flex items-center justify-between px-4 py-3">
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <h2 className="text-xl font-semibold"></h2>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Welcome Admin</span>
            <img
              src="https://ui-avatars.com/api/?name=Admin"
              className="w-8 h-8 rounded-full"
              alt=""
            />
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
