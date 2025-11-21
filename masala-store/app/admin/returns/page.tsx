"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ReturnsPage() {
  const [returnsList, setReturnsList] = useState([]);

  async function load() {
    const res = await fetch("/api/returns/list");
    const data = await res.json();
    setReturnsList(data.returns || []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Return / Refund Requests</h2>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-sm text-left">
            <th className="p-3">Return ID</th>
            <th className="p-3">Order ID</th>
            <th className="p-3">User</th>
            <th className="p-3">Product</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {returnsList.map((r: any) => (
            <tr key={r._id} className="border-t">
              <td className="p-3">{r._id}</td>
              <td className="p-3">{r.orderId}</td>
              <td className="p-3">{r.user?.name}</td>
              <td className="p-3">{r.product?.name}</td>
              <td className="p-3">{r.status}</td>

              <td className="p-3">
                <Link
                  href={`/admin/returns/details/${r._id}`}
                  className="text-blue-600"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}

          {returnsList.length === 0 && (
            <tr>
              <td colSpan={6} className="p-5 text-center text-gray-500">
                No return requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
