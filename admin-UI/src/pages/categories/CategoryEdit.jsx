import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { categoryApi } from "../../api/categoryApi";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function CategoryEdit() {
  const { id } = useParams();
  const [name, setName] = useState("");

  useEffect(() => {
    categoryApi.get(id).then((res) => {
      setName(res.data.name);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await categoryApi.update(id, { name });
    window.location.href = "/categories";
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white shadow rounded-lg">

        <h2 className="text-2xl font-semibold mb-6">Edit Category</h2>

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
            Update
          </button>

        </form>
      </div>
    </AdminLayout>
  );
}
