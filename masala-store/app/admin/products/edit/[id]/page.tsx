"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    mrp: "",
    category: "",
    description: "",
    images: [] as string[],
  });

  async function uploadImage(e: any) {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload/image", { method: "POST", body: fd });
    const data = await res.json();
    setForm((f) => ({ ...f, images: [...f.images, data.upload.secure_url] }));
  }

  async function submit() {
    setLoading(true);

    const payload = {
      ...form,
      price: Number(form.price),
      mrp: Number(form.mrp),
    };

    const res = await fetch("/api/products/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) router.push("/admin/products");
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-5 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Product</h2>

      <div className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="MRP"
          value={form.mrp}
          onChange={(e) => setForm({ ...form, mrp: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <textarea
          className="border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div>
          <label>Upload Image:</label>
          <input type="file" onChange={uploadImage} className="block mt-2" />
        </div>

        <div className="flex gap-2 mt-2">
          {form.images.map((img, i) => (
            <img key={i} src={img} className="h-16 w-16 object-cover rounded" />
          ))}
        </div>

        <button
          disabled={loading}
          onClick={submit}
          className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </div>
  );
}
