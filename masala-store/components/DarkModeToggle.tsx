"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("dark-mode") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  }, [dark]);

  const toggle = () => {
    setDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-110 transition"
    >
      {dark ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} />}
    </button>
  );
}
