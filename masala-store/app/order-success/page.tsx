"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function OrderSuccess() {
  return (
    <div className="text-center py-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Order Success" },
        ]}
      />
      <h1 className="text-3xl font-bold text-green-600">Order Placed Successfully!</h1>
      <p className="mt-3 text-gray-600">Thank you for shopping with MasalaStore.</p>

      <Link
        href="/products"
        className="inline-block mt-6 bg-orange-600 text-white px-6 py-3 rounded-lg"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
