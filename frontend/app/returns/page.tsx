"use client";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function ReturnsPage() {
  return (
    <div className="py-10 max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Returns & Refunds" },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Returns & Refunds</h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        We aim to provide the best products. If you receive a damaged or incorrect
        item, please contact us within 48 hours.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Eligible refunds will be processed within 5–7 business days.
      </p>
    </div>
  );
}
