"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  async function load() {
    const res = await fetch("/api/categories/list");
    const data = await res.json();
    setCategories(data.categories || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function deleteCategory(id: string) {
    if (!confirm("Delete?")) return;

    await fetch(`/api/categories/delete?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Link href="/admin/categories/create" className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Category
        </Link>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c: any) => (
            <tr key={c._id} className="border-t">
              <td className="p-3">
                <img src={c.image} className="h-12 w-12 rounded object-cover" />
              </td>
              <td className="p-3">{c.name}</td>
              <td className="p-3 flex gap-3">
                <Link href={`/admin/categories/edit/${c._id}`} className="text-blue-600">
                  Edit
                </Link>
                <button onClick={() => deleteCategory(c._id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td className="p-5 text-center" colSpan={3}>
                No categories available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
