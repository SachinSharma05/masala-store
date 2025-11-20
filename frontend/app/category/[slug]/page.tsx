"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { allProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";

const categories = [
  { slug: "spices", label: "Spices" },
  { slug: "masala-blends", label: "Masala Blends" },
  { slug: "powders", label: "Powders" },
  { slug: "pickles", label: "Pickles" },
];

const weights = [50, 100, 200, 500];
const brands = ["Annapurna", "Everest", "MDH"];

export default function CategoryPage() {
  const { slug } = useParams();

  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Filter by category
  let products = allProducts.filter((p) => p.category === slug);

  // Apply weight filter
  if (selectedWeight) {
    products = products.filter((p) => p.weight === selectedWeight);
  }

  // Apply brand filter
  if (selectedBrand) {
    products = products.filter((p) => p.brand === selectedBrand);
  }

  // Apply price filter
  products = products.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Pagination logic
  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedProducts = products.slice(start, start + pageSize);

  const categoryName =
    categories.find((c) => c.slug === slug)?.label || "Category";

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
      {/* SIDEBAR */}
      <div className="md:col-span-1 border rounded-xl p-4 bg-white shadow-sm">

        {/* Categories */}
        <h3 className="font-semibold text-lg mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`block py-2 px-3 rounded-lg ${
                slug === cat.slug
                  ? "bg-orange-600 text-white"
                  : "hover:bg-orange-100"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Weight */}
        <h3 className="font-semibold text-lg mt-6 mb-3">Weight (Grams)</h3>
        <div className="space-y-2">
          {weights.map((w) => (
            <button
              key={w}
              onClick={() =>
                setSelectedWeight(selectedWeight === w ? null : w)
              }
              className={`w-full text-left py-2 px-3 rounded-lg border ${
                selectedWeight === w
                  ? "bg-orange-600 text-white border-orange-600"
                  : "hover:bg-orange-100"
              }`}
            >
              {w}g
            </button>
          ))}
        </div>

        {/* Brand */}
        <h3 className="font-semibold text-lg mt-6 mb-3">Brand</h3>
        <div className="space-y-2">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(selectedBrand === b ? null : b)}
              className={`w-full text-left py-2 px-3 rounded-lg border ${
                selectedBrand === b
                  ? "bg-orange-600 text-white border-orange-600"
                  : "hover:bg-orange-100"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Price */}
        <h3 className="font-semibold text-lg mt-6 mb-3">Price Range</h3>
        <input
          type="range"
          min="0"
          max="500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full"
        />
        <p className="mt-1 text-sm text-gray-600">
          ₹0 — ₹{priceRange[1]}
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="md:col-span-3">
        <h1 className="text-3xl font-bold mb-4">{categoryName}</h1>

        {paginatedProducts.length === 0 && (
          <p className="text-gray-500 mt-4">No products found.</p>
        )}

        <Breadcrumbs
            items={[
                { label: "Home", href: "/" },
                { label: "Categories", href: "/categories" },
                { label: categoryName },
            ]}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
