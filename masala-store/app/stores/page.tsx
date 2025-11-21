"use client";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function StoreLocatorPage() {
  return (
    <div className="py-10 max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Store Locator" },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Store Locator</h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        Find our nearest offline store. We are expanding rapidly across India!
      </p>

      <ul className="space-y-4 text-gray-800">
        <li>
          <b>Hyderabad Store</b>  
          <br />Banjara Hills, Telangana
        </li>

        <li>
          <b>Mumbai Store</b>  
          <br />Andheri West, Maharashtra
        </li>

        <li>
          <b>Delhi Store</b>  
          <br />Connaught Place, New Delhi
        </li>
      </ul>
    </div>
  );
}
