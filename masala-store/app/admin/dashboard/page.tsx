"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardPage() {
  const [overview, setOverview] = useState<any>(null);
  const [weeklySales, setWeeklySales] = useState<any>([]);
  const [topProducts, setTopProducts] = useState<any>([]);
  const [ordersStatus, setOrdersStatus] = useState<any>([]);

  async function load() {
    const o = await fetch("/api/admin/stats/overview").then((r) => r.json());
    const w = await fetch("/api/admin/stats/sales-weekly").then((r) =>
      r.json()
    );
    const t = await fetch("/api/admin/stats/top-products").then((r) =>
      r.json()
    );
    const s = await fetch("/api/admin/stats/orders-status").then((r) =>
      r.json()
    );

    setOverview(o);
    setWeeklySales(w.data || []);
    setTopProducts(t.products || []);
    setOrdersStatus(s.data || []);
  }

  useEffect(() => {
    load();
  }, []);

  if (!overview)
    return <p className="text-center py-10 text-gray-500">Loading dashboard...</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Sales Today" value={`₹${overview.todaySales}`} />
        <StatCard label="Orders Today" value={overview.todayOrders} />
        <StatCard label="New Users Today" value={overview.todayUsers} />
        <StatCard label="Refund Requests" value={overview.returnRequests} />
      </div>

      {/* WEEKLY SALES CHART */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Weekly Sales</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ORDERS STATUS BAR CHART */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Orders by Status</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ordersStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TOP PRODUCTS */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>

        <div className="space-y-3">
          {topProducts.length === 0 && (
            <p className="text-gray-500">No data found.</p>
          )}

          {topProducts.map((p: any, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div className="flex items-center gap-3">
                <img
                  src={p.image}
                  className="h-14 w-14 rounded object-cover"
                />
                <span>{p.name}</span>
              </div>
              <span className="font-bold">₹{p.sales}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function StatCard({ label, value }: any) {
  return (
    <div className="bg-white rounded shadow p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
