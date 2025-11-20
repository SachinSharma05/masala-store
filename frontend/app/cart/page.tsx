"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, total } = useCart();

  const delivery = total > 300 ? 0 : 30; // free delivery over ₹300
  const gst = Math.round(total * 0.05); // 5% GST
  const grandTotal = total + delivery + gst;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Cart" },
        ]}
      />
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT: CART ITEMS */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b pb-4 items-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <p className="text-orange-600 font-semibold">₹{item.price}</p>

                  {/* Qty */}
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQty(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="text-lg">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQty(item.id, item.quantity + 1)
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="text-red-600 text-sm mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <p className="font-semibold text-gray-700">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="border rounded-xl p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between text-lg font-semibold text-orange-600">
                <span>Total Amount</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block bg-orange-600 text-white text-center mt-6 py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
