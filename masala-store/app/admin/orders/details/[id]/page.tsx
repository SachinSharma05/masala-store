"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  async function load() {
    const res = await fetch(`/api/orders/details?id=${id}`);
    const data = await res.json();
    setOrder(data.order);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(status: string) {
    await fetch(`/api/orders/update-status?id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });

    load();
  }

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      {/* SECTION 1 — CUSTOMER */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Customer</h3>
        <p>Name: {order.userId?.name}</p>
        <p>Email: {order.userId?.email}</p>
        <p>Phone: {order.address?.phone}</p>
      </div>

      {/* SECTION 2 — ADDRESS */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
        <p>{order.address?.name}</p>
        <p>{order.address?.address}</p>
        <p>
          {order.address?.city}, {order.address?.state} –{" "}
          {order.address?.pincode}
        </p>
      </div>

      {/* SECTION 3 — PAYMENT */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Payment</h3>
        <p>Method: {order.payment.method}</p>
        <p>Status: {order.payment.status}</p>

        {order.payment.transactionId && (
          <p>Transaction ID: {order.payment.transactionId}</p>
        )}
      </div>

      {/* SECTION 4 — STATUS UPDATE */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Order Status</h3>

        <div className="flex gap-3 flex-wrap">
          {["confirmed", "shipped", "delivered", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => updateStatus(st)}
              className={`px-4 py-2 rounded text-sm
                ${
                  order.status === st
                    ? "bg-blue-700 text-white"
                    : "bg-blue-500 text-white"
                }`}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 5 — PRODUCTS */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Products</h3>

        <div className="border rounded">
          {order.products.map((p: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-4 border-b p-3 last:border-none"
            >
              <img
                src={p.image}
                className="h-16 w-16 object-cover rounded"
                alt=""
              />

              <div className="flex-1">
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">Qty: {p.qty}</p>
              </div>

              <p className="font-medium">₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TOTAL */}
      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold">Total: ₹{order.total}</h3>
      </div>
    </div>
  );
}
