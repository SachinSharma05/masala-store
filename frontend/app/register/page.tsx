"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";

export default function RegisterPage() {
  const { login } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // in real app call backend to create user then login
    login({ name: name || email.split("@")[0], email });
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <button className="w-full bg-orange-600 text-white py-2 rounded">Create Account</button>
      </form>
    </div>
  );
}
