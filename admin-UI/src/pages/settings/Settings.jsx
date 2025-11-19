import React from "react";
import { useState, useEffect } from "react";
import { authApi } from "../../api/authApi";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function Settings() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    authApi.me().then((res) => {
      setForm({
        name: res.data.name,
        email: res.data.email,
        password: "",
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await authApi.update({
      name: form.name,
      email: form.email,
      password: form.password ? form.password : null,
    });

    alert("Profile updated successfully!");
    setForm({ ...form, password: "" });
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white shadow rounded-lg max-w-xl">

        <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="text-gray-700 mb-1 block">Name</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 mb-1 block">Email</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 mb-1 block">New Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Leave empty to keep current password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            type="submit"
          >
            Save Changes
          </button>

        </form>
      </div>
    </AdminLayout>
  );
}
