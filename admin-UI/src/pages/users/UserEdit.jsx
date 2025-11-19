import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userApi } from "../../api/userApi";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function UserEdit() {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "admin",
  });

  useEffect(() => {
    userApi.get(id).then((res) => {
      const u = res.data;
      setForm({
        name: u.name,
        email: u.email,
        role: u.role,
      });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userApi.update(id, form);
    window.location.href = "/users";
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white shadow rounded-lg">

        <h2 className="text-2xl font-semibold mb-6">Edit User</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Name</label>
            <input
              className="border border-gray-300 rounded-md p-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded-md p-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Role</label>
            <select
              className="border border-gray-300 rounded-md p-2"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Update User
            </button>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
}
