"use client";

import { useState, useEffect } from "react";

export default function PincodePage() {
  const [pincodes, setPincodes] = useState([]);
  const [pin, setPin] = useState("");

  async function load() {
    const res = await fetch("/api/pincode/list");
    const data = await res.json();
    setPincodes(data.pincodes || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function addPin() {
    if (!pin || pin.length !== 6) {
      alert("Enter a valid 6-digit pincode");
      return;
    }

    await fetch("/api/pincode/add", {
      method: "POST",
      body: JSON.stringify({ pincode: pin }),
    });

    setPin("");
    load();
  }

  async function deletePin(id: string) {
    if (!confirm("Delete pincode?")) return;

    await fetch(`/api/pincode/delete?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pincode Serviceability</h2>

      {/* Add Pincode */}
      <div className="bg-white p-5 rounded shadow mb-6 max-w-lg">
        <h3 className="text-lg font-semibold mb-3">Add Serviceable Pincode</h3>

        <div className="flex gap-3">
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={6}
            className="border rounded p-2 w-full"
            placeholder="Enter 6-digit pincode"
          />

          <button
            onClick={addPin}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* List */}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="p-3">Pincode</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {pincodes.map((p: any) => (
            <tr className="border-t" key={p._id}>
              <td className="p-3">{p.pincode}</td>

              <td className="p-3">
                <button
                  onClick={() => deletePin(p._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {pincodes.length === 0 && (
            <tr>
              <td colSpan={2} className="p-5 text-center text-gray-500">
                No pincodes added.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
