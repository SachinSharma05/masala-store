"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BannersPage() {
  const [banners, setBanners] = useState([]);

  async function load() {
    const res = await fetch("/api/banners/list?active=false");
    const data = await res.json();
    setBanners(data.banners || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function deleteBanner(id: string) {
    if (!confirm("Delete this banner?")) return;

    await fetch(`/api/banners/delete?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Banners</h2>

        <Link
          href="/admin/banners/create"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Banner
        </Link>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="p-3">Image</th>
            <th className="p-3">Title</th>
            <th className="p-3">Type</th>
            <th className="p-3">Active</th>
            <th className="p-3">Order</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {banners.map((b: any) => (
            <tr className="border-t" key={b._id}>
              <td className="p-3">
                <img
                  src={b.image}
                  className="h-16 w-32 rounded object-cover"
                />
              </td>

              <td className="p-3">{b.title}</td>
              <td className="p-3">{b.type}</td>
              <td className="p-3">{b.active ? "Yes" : "No"}</td>
              <td className="p-3">{b.order}</td>

              <td className="p-3 flex gap-3">
                <Link
                  href={`/admin/banners/edit/${b._id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>

                <button
                  className="text-red-600"
                  onClick={() => deleteBanner(b._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {banners.length === 0 && (
            <tr>
              <td colSpan={6} className="p-5 text-center text-gray-500">
                No banners found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
