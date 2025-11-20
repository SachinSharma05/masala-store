"use client";

import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-gray-500 mb-4 flex items-center flex-wrap gap-1">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1">
          {item.href ? (
            <Link href={item.href} className="hover:text-orange-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-orange-600 font-medium">{item.label}</span>
          )}

          {idx < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}
