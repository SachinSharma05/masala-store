"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);

  async function load() {
    const res = await fetch("/api/coupons/list");
    const data = await res.json();
    setCoupons(data.coupons || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function deleteCoupon(id: string) {
    if (!confirm("Delete this coupon?")) return;

    await fetch(`/api/coupons/delete?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Coupons</h2>

        <Link
          href="/admin/coupons/create"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Coupon
        </Link>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="p-3">Code</th>
            <th className="p-3">Type</th>
            <th className="p-3">Value</th>
            <th className="p-3">Min Order</th>
            <th className="p-3">Expiry</th>
            <th className="p-3">Active</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((c: any) => (
            <tr key={c._id} className="border-t">
              <td className="p-3">{c.code}</td>
              <td className="p-3">{c.discountType}</td>
              <td className="p-3">
                {c.discountType === "percentage"
                  ? `${c.discountValue}%`
                  : `₹${c.discountValue}`}
              </td>
              <td className="p-3">₹{c.minOrderAmount}</td>
              <td className="p-3">
                {c.expiry ? new Date(c.expiry).toLocaleDateString() : "—"}
              </td>
              <td className="p-3">{c.active ? "Yes" : "No"}</td>

              <td className="p-3 flex gap-3">
                <Link
                  href={`/admin/coupons/edit/${c._id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteCoupon(c._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {coupons.length === 0 && (
            <tr>
              <td colSpan={7} className="p-5 text-center text-gray-500">
                No coupons found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
