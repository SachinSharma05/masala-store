"use client";

import { useEffect } from "react";

export default function CrispChat() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "936d73de-1055-4657-88cf-de8976e88311"; // <-- replace this
      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
