"use client";

import Image from "next/image";
import { HomeMinisSlider } from "../components/HomeMinisSlider";
import Link from "next/link";

export default function Home() {
  const minis = [
    { title: "Digestive Minis", image: "/minis/mini1.jpg" },
    { title: "Mouth Freshener Minis", image: "/minis/mini2.jpg" },
    { title: "Immunity Minis", image: "/minis/mini3.jpg" },
    { title: "Energy Minis", image: "/minis/mini4.jpg" },
  ];

  const categories = [
    { title: "Garam Masala", image: "/cat/garam.jpg" },
    { title: "Chaat Masala", image: "/cat/chaat.jpg" },
    { title: "Pav Bhaji Masala", image: "/cat/pav.jpg" },
    { title: "Sambhar Masala", image: "/cat/sambhar.jpg" },
    { title: "Chicken Masala", image: "/cat/chicken.jpg" },
    { title: "Paneer Masala", image: "/cat/paneer.jpg" },
  ];

  const featured = [
    { id: 1, title: "Garam Masala 100g", price: 45, image: "/prod/garam100.jpg" },
    { id: 2, title: "Chaat Masala 100g", price: 35, image: "/prod/chaat100.jpg" },
    { id: 3, title: "Pav Bhaji Masala 100g", price: 50, image: "/prod/pav100.jpg" },
    { id: 4, title: "Sambhar Masala 100g", price: 55, image: "/prod/sambhar100.jpg" },
  ];

  return (
    <div className="space-y-12">
      {/* HERO SECTION */}
      <section className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/hero.jpg"
          alt="Masala Hero"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Premium Masalas, Delivered Fresh</h1>
          <p className="text-sm md:text-lg mt-2">Pure, authentic, and packed with flavor</p>
          <Link
            href="/products"
            className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* MINIS SLIDER */}
      <section>
        <h2 className="text-xl font-bold mb-3">Daily-Use Minis</h2>
        <HomeMinisSlider slides={minis} />
      </section>

      {/* CATEGORIES GRID */}
      <section>
        <h2 className="text-xl font-bold mb-4">Shop by Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((c, i) => (
            <Link
              key={i}
              href={`/category/${c.title.toLowerCase().replace(/ /g, "-")}`}
              className="block border rounded-xl overflow-hidden shadow hover:shadow-md transition bg-white"
            >
              <div className="w-full h-28 relative">
                <Image src={c.image} alt={c.title} fill style={{ objectFit: "cover" }} />
              </div>
              <p className="p-3 text-sm font-medium">{c.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section>
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((p) => (
            <Link
              href={`/products/${p.id}`}
              key={p.id}
              className="border rounded-xl overflow-hidden bg-white shadow hover:shadow-md transition"
            >
              <div className="w-full h-32 relative">
                <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium">{p.title}</h3>
                <p className="text-sm text-gray-500 mt-1">₹{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
