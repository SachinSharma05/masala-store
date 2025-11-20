"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const categories = [
  { slug: "spices", label: "Spices", icon: "🌶️" },
  { slug: "masala-blends", label: "Masala Blends", icon: "🟠" },
  { slug: "powders", label: "Powders", icon: "🟡" },
  { slug: "pickles", label: "Pickles", icon: "🥒" },
];

export default function CategoriesPage() {
  return (
    <div className="py-10">

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Categories" },
        ]}
      />

      <h1 className="text-3xl font-bold mb-8">All Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="border rounded-xl shadow-sm p-6 bg-white hover:shadow-md transition"
          >
            {/* Icon */}
            <div className="text-5xl mb-4">{cat.icon}</div>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">{cat.label}</h2>

            {/* Description */}
            <p className="text-gray-500 text-sm mb-4">
              Explore all {cat.label} products.
            </p>

            {/* Button */}
            <Link
              href={`/category/${cat.slug}`}
              className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              View Products
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}
