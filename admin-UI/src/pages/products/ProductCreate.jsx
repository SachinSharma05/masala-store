import React from 'react';
import { useState, useEffect } from "react";
import { productApi } from "../../api/productApi";
import { categoryApi } from "../../api/categoryApi";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function ProductCreate() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    weight: 0,
    category: "",
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryApi.getAll().then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    fd.append("image", image);

    await productApi.create(fd);
    window.location.href = "/products";
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white shadow rounded-lg">

        <h2 className="text-2xl font-semibold mb-6">Create Product</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Title */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Title</label>
            <input
              className="border border-gray-300 rounded-md p-2"
              placeholder="Product title"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Price</label>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          {/* Weight */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Weight (g)</label>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Category</label>
            <select
              className="border border-gray-300 rounded-md p-2"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 mb-1">Description</label>
            <textarea
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            ></textarea>
          </div>

          {/* Image */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 mb-1">Product Image</label>
            <input
              type="file"
              className="border border-gray-300 rounded-md p-2 bg-white"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
}
