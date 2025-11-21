import ProductCard from "@/components/ProductCard";
import { Suspense } from "react";

// Temporary local sample data (replace with API soon)
const tempProducts = [
  { id: 1, title: "Garam Masala 100g", price: 45, image: "/prod/garam100.jpg" },
  { id: 2, title: "Chaat Masala 100g", price: 35, image: "/prod/chaat100.jpg" },
  { id: 3, title: "Pav Bhaji Masala 100g", price: 50, image: "/prod/pav100.jpg" },
  { id: 4, title: "Sambhar Masala 100g", price: 55, image: "/prod/sambhar100.jpg" },
  { id: 5, title: "Chicken Masala 100g", price: 60, image: "/prod/chicken100.jpg" },
  { id: 6, title: "Paneer Tikka Masala 100g", price: 65, image: "/prod/paneer100.jpg" },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold">All Products</h1>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* SIDEBAR FILTERS */}
        <aside className="md:w-64 bg-white p-4 border rounded-lg h-fit shadow-sm">
          <h2 className="font-semibold mb-3 text-lg">Filters</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Category</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><button className="hover:text-orange-600">Garam Masala</button></li>
              <li><button className="hover:text-orange-600">Chaat Masala</button></li>
              <li><button className="hover:text-orange-600">Pav Bhaji Masala</button></li>
              <li><button className="hover:text-orange-600">Sambhar Masala</button></li>
              <li><button className="hover:text-orange-600">Chicken Masala</button></li>
              <li><button className="hover:text-orange-600">Paneer Masala</button></li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Sort By</h3>
            <select className="w-full border rounded px-2 py-1 text-sm">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          <div>
            <h3 className="font-medium mb-2">Price</h3>
            <input
              type="range"
              min={10}
              max={200}
              className="w-full"
            />
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <section className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tempProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>

      </div>
    </div>
  );
}
