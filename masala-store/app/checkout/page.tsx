"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const { addOrder } = useUser();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.street || !form.city || !form.pincode) {
      alert("Please fill all the fields");
      return;
    }

    // Create order object
    addOrder({
      items: cart,
      total,
      address: form,
    });

    clearCart();
    router.push("/order-success");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
      
      {/* LEFT: Shipping Form */}
      <div>
        <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        <div className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Mobile Number"
            className="w-full border p-3 rounded-lg"
          />
          <input
            name="street"
            value={form.street}
            onChange={onChange}
            placeholder="House / Flat / Street"
            className="w-full border p-3 rounded-lg"
          />
          <input
            name="city"
            value={form.city}
            onChange={onChange}
            placeholder="City"
            className="w-full border p-3 rounded-lg"
          />
          <input
            name="pincode"
            value={form.pincode}
            onChange={onChange}
            placeholder="Pincode"
            className="w-full border p-3 rounded-lg"
          />
        </div>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="p-6 border rounded-xl shadow-sm bg-white">

        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-3">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Delivery Charge</span>
          <span className="text-green-600">Free</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>GST (5%)</span>
          <span>₹{Math.round(total * 0.05)}</span>
        </div>

        <div className="flex justify-between mt-4 text-lg font-bold">
          <span>Total Amount</span>
          <span className="text-orange-600">₹{total + Math.round(total * 0.05)}</span>
        </div>

        <button
          onClick={() => router.push("/payment?amount=" + (total + Math.round(total * 0.05)))}
          className="w-full bg-orange-600 text-white py-3 mt-6 rounded-lg text-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
