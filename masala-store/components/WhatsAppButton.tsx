"use client";

import { useState } from "react";

export default function WhatsAppButton() {
  const phone = "919340384339"; // your WhatsApp number
  const [showTip, setShowTip] = useState(false);

  return (
    <div
      className="fixed bottom-6 left-6 flex flex-col items-center z-50"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      {/* Tooltip */}
      {showTip && (
        <div className="mb-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-sm px-3 py-1 rounded-lg shadow-lg animate-fade-in">
          Chat with us
        </div>
      )}

      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition flex items-center justify-center dark:bg-green-600 dark:hover:bg-green-700"
        aria-label="WhatsApp Support"
      >
        💬
      </a>
    </div>
  );
}
