"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  async function load() {
    const res = await fetch("/api/orders/list");
    const data = await res.json();
    setOrders(data.orders || []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="p-3">Order ID</th>
            <th className="p-3">User</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o: any) => (
            <tr key={o._id} className="border-t">
              <td className="p-3">{o._id}</td>
              <td className="p-3">{o.userId?.name}</td>
              <td className="p-3">₹{o.total}</td>
              <td className="p-3">{o.status}</td>
              <td className="p-3">
                {new Date(o.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3">
                <Link
                  href={`/admin/orders/details/${o._id}`}
                  className="text-blue-600"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}

          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="p-5 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
