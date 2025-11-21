"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4">
      <h1 className="font-semibold">Admin Dashboard</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </header>
  );
}
