"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
  });

  async function loadCategory() {
    const res = await fetch(`/api/categories/details?id=${id}`);
    const data = await res.json();

    setForm({
      name: data.category.name,
      slug: data.category.slug,
      image: data.category.image,
    });
  }

  useEffect(() => {
    loadCategory();
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

    const res = await fetch(`/api/categories/update?id=${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/categories");
    } else {
      alert("Error updating category");
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-5 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>

      <div className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Category Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <div>
          <label className="text-sm">Upload New Image</label>
          <input type="file" onChange={uploadImage} className="mt-1" />

          {form.image && (
            <img
              src={form.image}
              className="h-20 w-20 mt-3 rounded object-cover"
            />
          )}
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Updating..." : "Update Category"}
        </button>
      </div>
    </div>
  );
}
