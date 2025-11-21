"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBanner() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image: "",
    link: "",
    type: "homepage",
    order: 0,
    active: true,
  });

  const [loading, setLoading] = useState(false);

  async function uploadImage(e: any) {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload/image", { method: "POST", body: fd });
    const data = await res.json();

    setForm((f) => ({ ...f, image: data.upload.secure_url }));
  }

  async function submit() {
    setLoading(true);

    const res = await fetch("/api/banners/create", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) router.push("/admin/banners");
    else alert("Error creating banner");
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Banner</h2>

      <div className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Subtitle (optional)"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Redirect Link (optional)"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />

        <select
          className="border p-2 rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="homepage">Homepage</option>
          <option value="category">Category</option>
          <option value="product">Product</option>
          <option value="promo">Promo</option>
        </select>

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Sort Order"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Active
        </label>

        {/* Image Upload */}
        <div>
          <label className="text-sm">Banner Image</label>
          <input type="file" onChange={uploadImage} className="mt-1" />

          {form.image && (
            <img
              src={form.image}
              className="h-24 w-full rounded mt-3 object-cover"
            />
          )}
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Saving..." : "Save Banner"}
        </button>
      </div>
    </div>
  );
}
