import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryApi } from "../../api/categoryApi";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const loadCategories = async () => {
    const res = await categoryApi.getAll();
    setCategories(res.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete category?")) return;
    await categoryApi.delete(id);
    loadCategories();
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Categories</h2>

          <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-64 shadow-sm"
            />

          <Link
            to="/categories/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            + Add Category
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Slug</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.slug}</td>
                  <td className="p-3">
                    <div className="flex gap-4">
                      <Link
                        to={`/categories/edit/${c.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(c.id)}
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
