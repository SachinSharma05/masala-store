"use client";

import Link from "next/link";
import { useUser } from "@/context/user-context";

export default function ProfilePage() {
  const { user, logout, addresses } = useUser();

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6">
        <p className="mb-4">You are not logged in.</p>
        <Link href="/login" className="text-orange-600">Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

      <div className="border rounded p-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium">Addresses</h2>
        {addresses.length === 0 ? (
          <p className="text-gray-600">No addresses saved.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {addresses.map((a) => (
              <li key={a.id} className="border rounded p-3">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{a.label || a.name}</div>
                    <div className="text-sm text-gray-600">{a.line1}, {a.city} - {a.pincode}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Link href="/account/addresses" className="inline-block mt-3 text-orange-600">Manage addresses</Link>
      </div>

      <div className="mt-6">
        <button onClick={logout} className="bg-red-500 text-white px-3 py-2 rounded">Logout</button>
      </div>
    </div>
  );
}
