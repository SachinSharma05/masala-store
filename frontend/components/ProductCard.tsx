"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border"
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full h-40">
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-1">₹{product.price}</p>

        <Link
          href={`/products/${product.id}`}
          className="mt-3 inline-block w-full text-center px-3 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}
