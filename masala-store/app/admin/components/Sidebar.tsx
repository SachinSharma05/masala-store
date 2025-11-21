"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/admin" },
  { name: "Products", href: "/admin/products" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Users", href: "/admin/users" },
  { name: "Coupons", href: "/admin/coupons" },
  { name: "Banners", href: "/admin/banners" },
  { name: "Returns", href: "/admin/returns" },
  { name: "Pincode", href: "/admin/pincode" },
  { name: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-white border-r h-full p-4">
      <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2 rounded-md ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
