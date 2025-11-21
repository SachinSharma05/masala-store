"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>({ orders: 0, wishlist: 0 });

  async function load() {
    const res = await fetch(`/api/users/details?id=${id}`);
    const data = await res.json();
    setUser(data.user);
    setStats(data.stats);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleActive() {
    await fetch(`/api/users/toggle-active?id=${id}`, {
      method: "PUT",
    });
    load();
  }

  async function toggleAdmin() {
    await fetch(`/api/users/toggle-role?id=${id}`, {
      method: "PUT",
    });
    load();
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>

      {/* PROFILE */}
      <div className="mb-6">
        <p className="text-lg font-semibold">{user.name}</p>
        <p>{user.email}</p>
        <p className="text-sm text-gray-500">
          Joined: {new Date(user.createdAt).toLocaleString()}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Orders</p>
          <p className="text-xl font-bold">{stats.orders}</p>
        </div>

        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Wishlist</p>
          <p className="text-xl font-bold">{stats.wishlist}</p>
        </div>

        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Role</p>
          <p className="text-xl font-bold">{user.role}</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={toggleActive}
          className={`px-4 py-2 rounded ${
            user.active ? "bg-red-600" : "bg-green-600"
          } text-white`}
        >
          {user.active ? "Block User" : "Unblock User"}
        </button>

        <button
          onClick={toggleAdmin}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {user.role === "admin" ? "Remove Admin" : "Make Admin"}
        </button>
      </div>

      {/* ADDRESS LIST (optional) */}
      {user.addresses && user.addresses.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Saved Addresses</h3>

          <div className="space-y-3">
            {user.addresses.map((a: any, i: number) => (
              <div key={i} className="p-3 border rounded">
                <p className="font-semibold">{a.name}</p>
                <p>{a.address}</p>
                <p>
                  {a.city}, {a.state} – {a.pincode}
                </p>
                <p>Phone: {a.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
