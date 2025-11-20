"use client";

import Image from "next/image";
import { useCart } from "../../../context/cart-context";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ClientProductDetails() {
  const { addToCart } = useCart();
  const params = useParams();         // ← works 100% reliably
  const productId = params.id as string;

  // Main Product (dummy for now)
  const product = {
    name: "Premium Garam Masala",
    price: 120,
    mrp: 150,
    description:
      "A rich aromatic blend of premium spices sourced from the best farms. Perfect for your everyday cooking.",
    image:
      "https://images.unsplash.com/photo-1604908177522-f06fb25c37e4?auto=format&fit=crop&w=800&q=80",
  };

  // Related Products
  const relatedProducts = [
    {
      id: 2,
      name: "Kitchen King Masala",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Chole Masala",
      price: 70,
      image:
        "https://images.unsplash.com/photo-1625632053494-b1632e2a2e70?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Shahi Paneer Masala",
      price: 110,
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c4a47c89d?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="border rounded-xl p-3 shadow-sm">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>

          <div className="flex items-end gap-3 mt-3">
            <p className="text-2xl font-bold text-orange-600">₹{product.price}</p>
            <p className="text-gray-500 line-through">₹{product.mrp}</p>
            <span className="text-green-600 font-medium">
              {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
            </span>
          </div>

          <p className="text-gray-700 mt-6 leading-relaxed">{product.description}</p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() =>
                addToCart({
                  id: Number(productId),
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                })
              }
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Add to Cart
            </button>

            <button className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-14">
        <h2 className="text-xl font-semibold mb-3">Product Details</h2>
        <p className="text-gray-700 leading-relaxed">
          Made using traditional methods, this blend enhances the flavor of
          curries, vegetables, and lentils. Freshly prepared and packed hygienically.
        </p>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-5">Related Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((item) => (
            <a
              href={`/products/${item.id}`}
              key={item.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition block"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={300}
                className="rounded-lg object-cover h-48 w-full"
              />

              <h3 className="text-lg font-medium mt-3">{item.name}</h3>
              <p className="text-orange-600 font-semibold mt-1">₹{item.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
