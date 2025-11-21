"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQty, removeFromCart, total } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-2xl p-5 z-50 transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

      <button onClick={closeCart} className="absolute top-4 right-4 text-gray-600">
        ✕
      </button>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto">
        {cart.length === 0 && <p className="text-gray-600">Your cart is empty.</p>}

        {cart.map((item, index) => {
          const safeImage = item.image || "/placeholder.png"; // ⭐ FIX: fallback
          const safeKey = item.id ?? index;                    // ⭐ FIX: fallback key

          return (
            <div key={safeKey} className="flex gap-3 pb-3 border-b">
              <Image
                src={safeImage}
                width={60}
                height={60}
                alt={item.name || "Product"}
                className="rounded"
              />

              <div className="flex-1">
                <p className="font-medium">{item.name || "Unnamed Product"}</p>
                <p className="text-orange-600">₹{item.price}</p>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  className="text-red-600 text-sm mt-1"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div className="mt-5 border-t pt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span className="text-orange-600">₹{total}</span>
          </div>

          <Link href="/checkout" className="w-full">
            <button onClick={closeCart} className="w-full bg-orange-600 text-white py-2 mt-4 rounded-lg">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
