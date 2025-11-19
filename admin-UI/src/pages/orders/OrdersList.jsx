import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderApi } from "../../api/orderApi";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderApi.getAll().then((res) => setOrders(res.data));
  }, []);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Packed: "bg-purple-100 text-purple-700",
    Shipped: "bg-orange-100 text-orange-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <AdminLayout>
      <div className="p-6">

        <h2 className="text-2xl font-semibold mb-6">Orders</h2>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 font-medium">Order ID</th>
                <th className="p-3 font-medium">Customer</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Created</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{o.id}</td>
                  <td className="p-3">{o.customerName}</td>
                  <td className="p-3">₹{o.totalAmount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm ${statusColors[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3">{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="p-3">
                    <Link
                      className="text-blue-600 hover:underline"
                      to={`/orders/${o.id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
