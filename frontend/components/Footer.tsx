"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white">Masala Store</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Premium masalas, spices & daily-use minis made with authentic Indian flavors.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link href="/products" className="hover:text-orange-400">Products</Link></li>
            <li><Link href="/cart" className="hover:text-orange-400">Cart</Link></li>
            <li><Link href="/checkout" className="hover:text-orange-400">Checkout</Link></li>
          </ul>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-orange-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-400">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-orange-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-orange-400">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">📍 Hyderabad, India</p>
          <p className="text-sm text-gray-400 mt-1">📞 +91 98765 43210</p>
          <p className="text-sm text-gray-400 mt-1">✉ support@masalastore.in</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-gray-300">
            <Link href="#" className="hover:text-orange-400">🌐</Link>
            <Link href="#" className="hover:text-orange-400">📘</Link>
            <Link href="#" className="hover:text-orange-400">📸</Link>
            <Link href="#" className="hover:text-orange-400">▶️</Link>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Masala Store. All rights reserved.
      </div>
    </footer>
  );
}
