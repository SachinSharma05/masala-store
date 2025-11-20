"use client";

import { useEffect, useState } from "react";

export default function Toast() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setMessage(`${customEvent.detail} added to cart`);
      setTimeout(() => setMessage(""), 2000);
    };

    window.addEventListener("cart-toast", handler as EventListener);
    return () => window.removeEventListener("cart-toast", handler as EventListener);
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-xl shadow-lg animate-slide-up">
      {message}
    </div>
  );
}
