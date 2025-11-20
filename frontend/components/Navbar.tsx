"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { useUser } from "@/context/user-context";
import DarkModeToggle from "@/components/DarkModeToggle";

import {
  ShoppingCart,
  Home,
  Package,
  Grid2x2,
  PercentCircle,
  Info,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Heart,
} from "lucide-react";

export const Navbar = () => {
  const { cart, openCart } = useCart();
  const { user, logout } = useUser();

  const count = cart.reduce((s, i) => s + i.quantity, 0);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-white dark:bg-gray-900 dark:text-white shadow-md sticky top-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo1.png" width={32} height={32} alt="Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-orange-600 hidden md:inline">
              MasalaStore
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">

            <Link href="/" className="hover:text-orange-600 flex items-center gap-1">
              <Home size={16} /> Home
            </Link>

            <Link href="/products" className="hover:text-orange-600 flex items-center gap-1">
              <Package size={16} /> Products
            </Link>

            <div className="relative">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="hover:text-orange-600 flex items-center gap-1"
              >
                <Grid2x2 size={16} />
                Categories
                <ChevronDown size={14} />
              </button>

              {categoryOpen && (
                <div className="absolute left-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 w-48 z-40">
                  <Link href="/category/spices" className="block py-1 hover:text-orange-600">Spices</Link>
                  <Link href="/category/masala-blends" className="block py-1 hover:text-orange-600">Masala Blends</Link>
                  <Link href="/category/powders" className="block py-1 hover:text-orange-600">Powders</Link>
                  <Link href="/category/pickles" className="block py-1 hover:text-orange-600">Pickles</Link>
                </div>
              )}
            </div>

            <Link href="/offers" className="hover:text-orange-600 flex items-center gap-1">
              <PercentCircle size={16} /> Offers
            </Link>

            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="hover:text-orange-600 flex items-center gap-1"
              >
                More
                <ChevronDown
                  size={14}
                  className={`transform transition-transform duration-200 ${
                    moreOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <div
                className={`
                  absolute left-0 mt-2 w-52 bg-white dark:bg-gray-800
                  shadow-lg rounded-lg p-3 z-40 transition-all duration-300 origin-top
                  ${moreOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                `}
              >
                <Link href="/about" className="block py-1 hover:text-orange-600">About</Link>
                <Link href="/contact" className="block py-1 hover:text-orange-600">Contact Us</Link>
                <Link href="/faq" className="block py-1 hover:text-orange-600">FAQ</Link>
                <Link href="/returns" className="block py-1 hover:text-orange-600">Returns & Refunds</Link>
                <Link href="/terms" className="block py-1 hover:text-orange-600">Terms & Conditions</Link>
                <Link href="/privacy" className="block py-1 hover:text-orange-600">Privacy Policy</Link>
                <Link href="/stores" className="block py-1 hover:text-orange-600">Store Locator</Link>
              </div>
            </div>

          </div>

          {/* RIGHT ITEMS */}
          <div className="flex items-center gap-4">

            {/* DARK MODE */}
            <DarkModeToggle />

            {/* CART */}
            <button onClick={openCart} className="relative hover:text-orange-600">
              <ShoppingCart size={26} />
              {count > 0 && (
                <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </button>

            {/* USER PROFILE DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1 hover:text-orange-600"
              >
                <User size={22} />
                {user ? (
                  <span className="hidden md:inline">Hi, {user.name.split(" ")[0]}</span>
                ) : (
                  <span className="hidden md:inline">Login</span>
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 text-sm z-50">
                  {user ? (
                    <>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Welcome, <b>{user.name}</b>
                      </p>

                      <Link href="/profile" className="block py-1 hover:text-orange-600">My Profile</Link>
                      <Link href="/orders" className="block py-1 hover:text-orange-600">Orders</Link>
                      <Link href="/wishlist" className="block py-1 hover:text-orange-600">Wishlist</Link>
                      <Link href="/account/addresses" className="block py-1 hover:text-orange-600">Address Book</Link>

                      <button
                        onClick={logout}
                        className="flex items-center gap-2 w-full text-left text-red-500 hover:text-red-600 py-1 mt-1"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block py-1 hover:text-orange-600">Login</Link>
                      <Link href="/register" className="block py-1 hover:text-orange-600">Register</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg w-full px-5 py-5 flex flex-col gap-5 text-gray-800 dark:text-white">

          <Link href="/" className="flex items-center gap-2"><Home size={18} /> Home</Link>
          <Link href="/products" className="flex items-center gap-2"><Package size={18} /> Products</Link>
          <Link href="/offers" className="flex items-center gap-2"><PercentCircle size={18} /> Offers</Link>
          <Link href="/about" className="flex items-center gap-2"><Info size={18} /> About</Link>

          {user && (
            <>
              <Link href="/profile" className="flex items-center gap-2"><User size={18} /> Profile</Link>
              <Link href="/orders" className="flex items-center gap-2"><Package size={18} /> Orders</Link>
              <Link href="/wishlist" className="flex items-center gap-2"><Heart size={18} /> Wishlist</Link>
              <Link href="/account/addresses" className="flex items-center gap-2"><Home size={18} /> Address Book</Link>
            </>
          )}

          {!user && (
            <>
              <Link href="/login" className="flex items-center gap-2"><User size={18} /> Login</Link>
              <Link href="/register" className="flex items-center gap-2"><User size={18} /> Register</Link>
            </>
          )}
        </div>
      )}
    </>
  );
};
