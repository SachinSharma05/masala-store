"use client";

import Link from "next/link";
import { useUser } from "@/context/user-context";
import { useCart } from "@/context/cart-context";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useUser();
  const { addToCart } = useCart();

  // For demo — we only have IDs in wishlist. Replace with real product lookup later.
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlist.map((id) => (
            <div key={id} className="border rounded p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">Product #{id}</div>
                <div className="text-sm text-gray-600">(Replace with real product data)</div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    addToCart({ id, name: `Product ${id}`, price: 100, image: "/placeholder.png", quantity: 1 });
                    removeFromWishlist(id);
                  }}
                  className="bg-orange-600 text-white px-3 py-1 rounded"
                >
                  Add to cart
                </button>

                <button
                  onClick={() => removeFromWishlist(id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
