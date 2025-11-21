"use client";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function AboutPage() {
  return (
    <div className="py-10 max-w-3xl">

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About" }
        ]}
      />

      <h1 className="text-3xl font-bold mb-4">About MasalaStore</h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        MasalaStore is your trusted destination for high-quality spices, 
        masala blends, powders, herbs, and daily-use minis. 
        Every product is sourced from premium farms and processed with 
        strict hygiene standards to ensure unbeatable freshness and flavor.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        We are committed to delivering authentic Indian taste right to your kitchen. 
        Our vision is to provide pure, affordable, and flavorful products that 
        make everyday cooking a delightful experience.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Thank you for choosing MasalaStore. We promise to continue bringing 
        you the finest ingredients for your meals!
      </p>
    </div>
  );
}
