"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ReturnDetailsPage() {
  const { id } = useParams();
  const [ret, setRet] = useState<any>(null);
  const [note, setNote] = useState("");

  async function load() {
    const res = await fetch(`/api/returns/details?id=${id}`);
    const data = await res.json();
    setRet(data.returnRequest);
    setNote(data.returnRequest.adminNote || "");
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(status: string) {
    await fetch(`/api/returns/update-status?id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });

    load();
  }

  async function saveNote() {
    await fetch(`/api/returns/update-note?id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ adminNote: note }),
    });

    load();
  }

  if (!ret) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Return Request</h2>

      {/* USER SECTION */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">User</h3>
        <p>{ret.user?.name}</p>
        <p>{ret.user?.email}</p>
      </div>

      {/* ORDER SECTION */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Order Info</h3>
        <p>Order ID: {ret.orderId}</p>
      </div>

      {/* PRODUCT SECTION */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Product</h3>
        <div className="flex gap-4">
          <img
            src={ret.product?.image}
            className="h-20 w-20 rounded object-cover"
          />
          <div>
            <p className="font-semibold">{ret.product?.name}</p>
            <p>Qty: {ret.qty}</p>
            <p>Price: ₹{ret.price}</p>
          </div>
        </div>
      </div>

      {/* REASON SECTION */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Reason</h3>
        <p className="text-gray-700">{ret.reason}</p>
      </div>

      {/* IMAGES SECTION */}
      {ret.images?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Uploaded Images</h3>
          <div className="flex gap-3">
            {ret.images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                className="h-20 w-20 rounded object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {/* STATUS UPDATE */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Status</h3>

        <div className="flex gap-2 flex-wrap">
          {["pending", "approved", "rejected", "refunded"].map((st) => (
            <button
              key={st}
              onClick={() => updateStatus(st)}
              className={`px-4 py-2 rounded text-white text-sm ${
                ret.status === st ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ADMIN NOTE */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Admin Note</h3>

        <textarea
          className="border p-2 rounded w-full h-24"
          placeholder="Write notes for internal tracking..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          onClick={saveNote}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
        >
          Save Note
        </button>
      </div>

      {/* REFUND BUTTON */}
      {ret.status === "approved" && (
        <div className="mt-6">
          <button className="px-4 py-2 bg-purple-600 text-white rounded">
            Trigger Refund
          </button>
        </div>
      )}
    </div>
  );
}
