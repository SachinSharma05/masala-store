import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productApi } from "../../api/productApi";
import { categoryApi } from "../../api/categoryApi";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function ProductEdit() {
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    weight: 0,
    category: "",
  });

  const [existingImage, setExistingImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryApi.getAll().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    productApi.get(id).then((res) => {
      const p = res.data;
      setForm({
        title: p.title,
        description: p.description,
        price: p.price,
        weight: p.weight,
        category: p.category,
      });
      setExistingImage(p.images?.[0] || "");
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    if (newImage) fd.append("image", newImage);

    await productApi.update(id, fd);
    window.location.href = "/products";
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white shadow rounded-lg">

        <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Title</label>
            <input
              className="border border-gray-300 rounded-md p-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Price</label>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Weight</label>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
          </div>

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

          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 mb-1">Description</label>
            <textarea
              className="border border-gray-300 rounded-md p-2"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            ></textarea>
          </div>

          {/* Existing Image */}
          {existingImage && (
            <div className="md:col-span-2">
              <p className="text-gray-700">Current Image:</p>
              <img
                src={existingImage}
                alt=""
                className="w-40 rounded-md shadow"
              />
            </div>
          )}

          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 mb-1">Upload New Image</label>
            <input
              type="file"
              className="border border-gray-300 rounded-md p-2 bg-white"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Update Product
            </button>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
}
