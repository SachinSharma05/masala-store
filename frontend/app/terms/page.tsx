"use client";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function TermsPage() {
  return (
    <div className="py-10 max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        These terms and conditions govern your use of MasalaStore and its
        products. By purchasing or browsing, you agree to comply with these terms.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Please read these terms carefully. If you do not agree, you may discontinue
        using our services at any time.
      </p>
    </div>
  );
}
