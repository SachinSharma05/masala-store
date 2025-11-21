"use client";

import { useCart } from "@/context/cart-context";
import { Product } from "@/types/product";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  function addToCart() {
    add({
      id: product.id,
      title: product.title,
      price: product.price,
      qty,
      image: product.image,
    });
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border rounded px-2">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="px-2 text-xl"
        >
          -
        </button>
        <span className="px-4">{qty}</span>
        <button
          onClick={() => setQty(qty + 1)}
          className="px-2 text-xl"
        >
          +
        </button>
      </div>

      <button
        onClick={addToCart}
        className="px-6 py-2 bg-orange-600 text-white rounded-md shadow hover:bg-orange-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
