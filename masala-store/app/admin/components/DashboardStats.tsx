"use client";

import { useEffect, useState } from "react";

export default function DashboardStats() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats/overview")
      .then((r) => r.json())
      .then((d) => setData(d));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card title="Users" value={data.users} />
      <Card title="Products" value={data.products} />
      <Card title="Orders" value={data.orders} />
      <Card title="Revenue" value={`₹${data.totalRevenue}`} />
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
