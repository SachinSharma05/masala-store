"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  async function load() {
    const res = await fetch("/api/products/list");
    const data = await res.json();
    setProducts(data.products || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/products/delete?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link href="/admin/products/create" className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Product
        </Link>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Category</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => (
            <tr key={p._id} className="border-t">
              <td className="p-3">
                <img src={p.images?.[0]} className="h-12 w-12 object-cover rounded" />
              </td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">₹{p.price}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3 flex gap-3">
                <Link href={`/admin/products/edit/${p._id}`} className="text-blue-600">
                  Edit
                </Link>
                <button onClick={() => deleteProduct(p._id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td className="p-5 text-center" colSpan={5}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
