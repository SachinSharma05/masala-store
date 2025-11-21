"use client";

import { useUser } from "@/context/user-context";

export default function OrdersPage() {
  const { orders } = useUser();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No past orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="border rounded p-4">
              <div className="flex justify-between mb-2">
                <div>
                  <div className="font-medium">Order #{o.id}</div>
                  <div className="text-sm text-gray-600">{new Date(o.date).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{o.total}</div>
                  <div className="text-sm text-gray-600">{o.status}</div>
                </div>
              </div>

              <div className="text-sm">
                {o.items.map((it) => (
                  <div key={it.id} className="flex justify-between">
                    <span>{it.name} x {it.quantity}</span>
                    <span>₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
