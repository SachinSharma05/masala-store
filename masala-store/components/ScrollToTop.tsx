"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 300); // show after some scroll
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
