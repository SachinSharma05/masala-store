"use client";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function PrivacyPage() {
  return (
    <div className="py-10 max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        Your privacy is important to us. This policy explains how we collect,
        use, and protect your personal information.
      </p>

      <p className="text-gray-700 leading-relaxed">
        We do not sell or share your data with any unauthorized parties.
      </p>
    </div>
  );
}
