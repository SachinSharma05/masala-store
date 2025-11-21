"use client";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function FAQPage() {
  return (
    <div className="py-10 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="space-y-5">
        <div>
          <h3 className="font-semibold">1. How long does delivery take?</h3>
          <p className="text-gray-600">Usually 2–5 business days.</p>
        </div>

        <div>
          <h3 className="font-semibold">2. Do you offer Cash on Delivery?</h3>
          <p className="text-gray-600">Yes, COD is available for all orders.</p>
        </div>

        <div>
          <h3 className="font-semibold">3. Are your spices natural?</h3>
          <p className="text-gray-600">Yes, all products are 100% natural and pure.</p>
        </div>
      </div>
    </div>
  );
}
