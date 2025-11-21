"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBanner() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image: "",
    link: "",
    type: "",
    order: 0,
    active: true,
  });

  async function load() {
    const res = await fetch(`/api/banners/details?id=${id}`);
    const data = await res.json();

    setForm({
      title: data.banner.title,
      subtitle: data.banner.subtitle || "",
      image: data.banner.image,
      link: data.banner.link || "",
      type: data.banner.type,
      order: data.banner.order,
      active: data.banner.active,
    });
  }

  useEffect(() => {
    load();
  }, []);

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

    const res = await fetch(`/api/banners/update?id=${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) router.push("/admin/banners");
    else alert("Error updating banner");
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Banner</h2>

      <div className="flex flex-col gap-4">

        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Link"
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

        <div>
          <label className="text-sm">Change Image</label>
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
          {loading ? "Updating..." : "Update Banner"}
        </button>
      </div>
    </div>
  );
}
