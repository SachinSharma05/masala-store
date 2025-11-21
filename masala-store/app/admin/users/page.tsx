"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  async function load() {
    const res = await fetch("/api/users/list");
    const data = await res.json();
    setUsers(data.users || []);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = users.filter((u: any) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      <div className="mb-4 flex gap-3">
        <input
          placeholder="Search name/email..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={load}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Refresh
        </button>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-sm text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Active</th>
            <th className="p-3">Joined</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((u: any) => (
            <tr className="border-t" key={u._id}>
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3">{u.active ? "Yes" : "No"}</td>
              <td className="p-3">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3">
                <Link
                  className="text-blue-600"
                  href={`/admin/users/details/${u._id}`}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} className="p-5 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
