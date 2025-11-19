import React from "react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { appSettingsApi } from "../../api/appSettingsApi";

export default function AppSettingsPage() {
  const [form, setForm] = useState({
    storeName: "",
    storeDescription: "",
    contactEmail: "",
    currency: "INR",
    gstPercentage: 5,
    deliveryCharge: 0,
  });

  const [logoPreview, setLogoPreview] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    appSettingsApi.get().then((res) => {
      setForm(res.data);
      setLogoPreview(res.data.storeLogoUrl);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));

    if (logoFile) fd.append("storeLogo", logoFile);

    await appSettingsApi.update(fd);

    alert("Settings updated!");
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white shadow rounded-lg max-w-2xl">

        <h2 className="text-2xl font-semibold mb-6">Application Settings</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Store Name */}
          <div>
            <label className="block text-gray-700 mb-1">Store Name</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1">Store Description</label>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full"
              rows="3"
              value={form.storeDescription}
              onChange={(e) =>
                setForm({ ...form, storeDescription: e.target.value })
              }
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-gray-700 mb-1">Contact Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={form.contactEmail}
              onChange={(e) =>
                setForm({ ...form, contactEmail: e.target.value })
              }
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-gray-700 mb-1">Currency</label>
            <select
              className="border border-gray-300 rounded-md p-2 w-full"
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {/* GST */}
          <div>
            <label className="block text-gray-700 mb-1">GST (%)</label>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={form.gstPercentage}
              onChange={(e) =>
                setForm({ ...form, gstPercentage: e.target.value })
              }
            />
          </div>

          {/* Delivery Charge */}
          <div>
            <label className="block text-gray-700 mb-1">Delivery Charge</label>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={form.deliveryCharge}
              onChange={(e) =>
                setForm({ ...form, deliveryCharge: e.target.value })
              }
            />
          </div>

          {/* Store Logo */}
          <div>
            <label className="block text-gray-700 mb-1">Store Logo</label>

            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo"
                className="w-24 h-24 object-cover rounded-md mb-2 border"
              />
            )}

            <input
              type="file"
              className="border border-gray-300 rounded-md p-2 w-full bg-white"
              onChange={(e) => {
                setLogoFile(e.target.files[0]);
                setLogoPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            type="submit"
          >
            Save Settings
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
