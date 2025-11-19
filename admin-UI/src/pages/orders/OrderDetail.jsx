import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderApi } from "../../api/orderApi";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const load = () => {
    orderApi.get(id).then((res) => setOrder(res.data));
  };

  useEffect(() => {
    load();
  }, [id]);

  if (!order) return null;

  // Status workflow logic
  const workflow = {
    Pending: ["Confirmed", "Cancelled"],
    Confirmed: ["Packed", "Cancelled"],
    Packed: ["Shipped", "Cancelled"],
    Shipped: ["Delivered"],
    Delivered: [],
    Cancelled: []
  };

  const handleStatusChange = async (nextStatus) => {
    await orderApi.updateStatus(id, `"${nextStatus}"`);
    load();
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded-lg shadow max-w-4xl mx-auto">

        <h2 className="text-2xl font-semibold mb-6">Order Details</h2>

        {/* Customer Info */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Customer</h3>
          <p>{order.customerName}</p>
          <p>{order.customerEmail}</p>
          <p>{order.customerPhone}</p>
        </div>

        {/* Address */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
          <p>{order.addressLine1}</p>
          {order.addressLine2 && <p>{order.addressLine2}</p>}
          <p>{order.city}, {order.state} {order.pincode}</p>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Items</h3>

          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Price</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((i, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{i.title}</td>
                  <td className="p-2">₹{i.price}</td>
                  <td className="p-2">{i.quantity}</td>
                  <td className="p-2">₹{i.price * i.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right font-bold text-xl mt-4">
            Total: ₹{order.totalAmount}
          </div>
        </div>

        {/* Status Workflow Buttons */}
        <div className="mt-8">
          <h3 className="font-semibold mb-3">Update Status</h3>

          <div className="flex gap-3 flex-wrap">
            {workflow[order.status].map((next) => (
              <button
                key={next}
                onClick={() => handleStatusChange(next)}
                className={`px-4 py-2 rounded-md text-white
                  ${next === "Cancelled" ? "bg-red-600" : "bg-blue-600"} 
                  hover:opacity-80`}
              >
                Mark as {next}
              </button>
            ))}

            {workflow[order.status].length === 0 && (
              <span className="text-gray-600">No further actions</span>
            )}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
