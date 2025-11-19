import React from 'react';
import { useState } from "react";
import { categoryApi } from "../../api/categoryApi";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function CategoryCreate() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await categoryApi.create({ name });
    window.location.href = "/categories";
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white shadow rounded-lg">

        <h2 className="text-2xl font-semibold mb-6">Create Category</h2>

        <form onSubmit={handleSubmit} className="flex gap-4">

          <input
            className="border border-gray-300 rounded-md p-2 flex-1"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Save
          </button>

        </form>
      </div>
    </AdminLayout>
  );
}
