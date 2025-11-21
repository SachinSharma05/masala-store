"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCoupon() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscount: "",
    expiry: "",
    usageLimit: "",
    active: true,
  });

  const [loading, setLoading] = useState(false);

  async function load() {
    const res = await fetch(`/api/coupons/details?id=${id}`);
    const data = await res.json();
    const c = data.coupon;

    setForm({
      code: c.code,
      discountType: c.discountType,
      discountValue: c.discountValue,
      minOrderAmount: c.minOrderAmount,
      maxDiscount: c.maxDiscount,
      expiry: c.expiry ? c.expiry.split("T")[0] : "",
      usageLimit: c.usageLimit,
      active: c.active,
    });
  }

  useEffect(() => {
    load();
  }, []);

  async function submit() {
    setLoading(true);

    const payload = {
      ...form,
      discountValue: Number(form.discountValue),
      minOrderAmount: Number(form.minOrderAmount),
      maxDiscount: Number(form.maxDiscount),
      usageLimit: Number(form.usageLimit),
    };

    const res = await fetch(`/api/coupons/update?id=${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) router.push("/admin/coupons");
    else alert("Error updating coupon");
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Coupon</h2>

      <div className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Coupon Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />

        <select
          className="border p-2 rounded"
          value={form.discountType}
          onChange={(e) =>
            setForm({ ...form, discountType: e.target.value })
          }
        >
          <option value="percentage">Percentage</option>
          <option value="flat">Flat</option>
        </select>

        <input
          className="border p-2 rounded"
          placeholder="Discount Value"
          type="number"
          value={form.discountValue}
          onChange={(e) =>
            setForm({ ...form, discountValue: e.target.value })
          }
        />

        <input
          className="border p-2 rounded"
          placeholder="Minimum Order Amount"
          type="number"
          value={form.minOrderAmount}
          onChange={(e) =>
            setForm({ ...form, minOrderAmount: e.target.value })
          }
        />

        <input
          className="border p-2 rounded"
          placeholder="Max Discount"
          type="number"
          value={form.maxDiscount}
          onChange={(e) =>
            setForm({ ...form, maxDiscount: e.target.value })
          }
        />

        <input
          className="border p-2 rounded"
          type="date"
          value={form.expiry}
          onChange={(e) => setForm({ ...form, expiry: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Usage Limit"
          type="number"
          value={form.usageLimit}
          onChange={(e) =>
            setForm({ ...form, usageLimit: e.target.value })
          }
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Active
        </label>

        <button
          onClick={submit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Updating..." : "Update Coupon"}
        </button>
      </div>
    </div>
  );
}
