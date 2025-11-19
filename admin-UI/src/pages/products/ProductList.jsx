import React from 'react';
import { useEffect, useState } from "react";
import { productApi } from "../../api/productApi";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    productApi.getAll().then((res) => setProducts(res.data));
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Products</h2>
        <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-64 shadow-sm"
          />
          <Link
            to="/products/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            + Add Product
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 font-medium">Title</th>
                <th className="p-3 font-medium">Price</th>
                <th className="p-3 font-medium">Weight</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">{p.price}</td>
                  <td className="p-3">{p.weight}g</td>

                  <td className="p-3">
                    <div className="flex gap-4">
                      <Link
                        to={`/products/edit/${p.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        className="text-red-600 hover:underline"
                        onClick={() =>
                          productApi
                            .delete(p.id)
                            .then(() => window.location.reload())
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
