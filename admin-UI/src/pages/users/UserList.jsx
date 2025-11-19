import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userApi } from "../../api/userApi";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    const res = await userApi.getAll();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await userApi.delete(id);
    loadUsers();
  };

  const filtered = users.filter((u) =>
    `${u.name} ${u.email} ${u.role}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <AdminLayout>
      <div className="p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Users</h2>

        <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-64 shadow-sm"
        />

          <Link
            to="/users/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            + Add User
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Role</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>

                  <td className="p-3">
                    <div className="flex gap-4">
                      <Link
                        to={`/users/edit/${u.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
