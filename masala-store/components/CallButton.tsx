"use client";

import { useState } from "react";

export default function CallButton() {
  const phone = "918888888888"; // replace with your phone
  const [showTip, setShowTip] = useState(false);

  return (
    <div
      className="fixed bottom-20 left-6 flex flex-col items-center z-50"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      {/* Tooltip */}
      {showTip && (
        <div className="mb-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-sm px-3 py-1 rounded-lg shadow-lg animate-fade-in">
          Call us
        </div>
      )}

      <a
        href={`tel:+${phone}`}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition flex items-center justify-center dark:bg-blue-700 dark:hover:bg-blue-800"
        aria-label="Call Support"
      >
        📞
      </a>
    </div>
  );
}
