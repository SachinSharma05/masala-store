"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/settings");
    const data = await res.json();
    setSettings(data.settings);
  }

  useEffect(() => {
    load();
  }, []);

  async function uploadLogo(e: any) {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload/image", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    setSettings((prev: any) => ({
      ...prev,
      logo: data.upload.secure_url,
    }));
  }

  async function save() {
    setSaving(true);

    const res = await fetch("/api/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });

    setSaving(false);

    if (!res.ok) alert("Error Saving Settings");
    else alert("Settings Updated Successfully");
  }

  if (!settings) return <p>Loading Settings...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Store Settings</h2>

      {/* BRANDING */}
      <Section title="Branding">
        <Input
          label="Site Name"
          value={settings.siteName}
          onChange={(e) =>
            setSettings({ ...settings, siteName: e.target.value })
          }
        />

        <div>
          <label className="block text-sm font-medium mb-1">
            Store Logo
          </label>
          <input type="file" onChange={uploadLogo} />

          {settings.logo && (
            <img
              src={settings.logo}
              className="h-20 w-20 mt-3 rounded object-cover"
            />
          )}
        </div>
      </Section>

      {/* CONTACT INFO */}
      <Section title="Contact Information">
        <Input
          label="Contact Email"
          value={settings.contactEmail}
          onChange={(e) =>
            setSettings({ ...settings, contactEmail: e.target.value })
          }
        />

        <Input
          label="Support Email"
          value={settings.supportEmail}
          onChange={(e) =>
            setSettings({ ...settings, supportEmail: e.target.value })
          }
        />

        <Input
          label="Phone"
          value={settings.phone}
          onChange={(e) =>
            setSettings({ ...settings, phone: e.target.value })
          }
        />

        <Input
          label="Address"
          value={settings.address}
          onChange={(e) =>
            setSettings({ ...settings, address: e.target.value })
          }
        />
      </Section>

      {/* Store Numbers */}
      <Section title="Registration Details">
        <Input
          label="GST Number"
          value={settings.gstNumber}
          onChange={(e) =>
            setSettings({ ...settings, gstNumber: e.target.value })
          }
        />

        <Input
          label="FSSAI Number"
          value={settings.fssaiNumber}
          onChange={(e) =>
            setSettings({ ...settings, fssaiNumber: e.target.value })
          }
        />
      </Section>

      {/* DELIVERY */}
      <Section title="Delivery Settings">
        <Input
          label="Delivery Charge"
          type="number"
          value={settings.deliveryCharge}
          onChange={(e) =>
            setSettings({ ...settings, deliveryCharge: Number(e.target.value) })
          }
        />

        <Input
          label="Free Delivery Above"
          type="number"
          value={settings.freeDeliveryAbove}
          onChange={(e) =>
            setSettings({
              ...settings,
              freeDeliveryAbove: Number(e.target.value),
            })
          }
        />

        <Toggle
          label="Enable COD"
          checked={settings.codEnabled}
          onChange={(v) => setSettings({ ...settings, codEnabled: v })}
        />

        <Toggle
          label="Enable Returns"
          checked={settings.returnsEnabled}
          onChange={(v) => setSettings({ ...settings, returnsEnabled: v })}
        />

        <Toggle
          label="Enable Wishlist"
          checked={settings.wishlistEnabled}
          onChange={(v) => setSettings({ ...settings, wishlistEnabled: v })}
        />
      </Section>

      {/* PAYMENTS */}
      <Section title="Payment Gateway Settings">
        <Input
          label="Razorpay Key ID"
          value={settings.razorpayKeyId}
          onChange={(e) =>
            setSettings({ ...settings, razorpayKeyId: e.target.value })
          }
        />

        <Input
          label="Razorpay Secret Key"
          value={settings.razorpayKeySecret}
          onChange={(e) =>
            setSettings({ ...settings, razorpayKeySecret: e.target.value })
          }
        />

        <Input
          label="Stripe Public Key"
          value={settings.stripePublic}
          onChange={(e) =>
            setSettings({ ...settings, stripePublic: e.target.value })
          }
        />

        <Input
          label="Stripe Secret Key"
          value={settings.stripeSecret}
          onChange={(e) =>
            setSettings({ ...settings, stripeSecret: e.target.value })
          }
        />
      </Section>

      {/* SEO */}
      <Section title="SEO Settings">
        <Input
          label="Meta Title"
          value={settings.metaTitle}
          onChange={(e) =>
            setSettings({ ...settings, metaTitle: e.target.value })
          }
        />

        <Input
          label="Meta Description"
          value={settings.metaDescription}
          onChange={(e) =>
            setSettings({ ...settings, metaDescription: e.target.value })
          }
        />

        <Input
          label="Meta Keywords (comma separated)"
          value={settings.metaKeywords?.join(",")}
          onChange={(e) =>
            setSettings({
              ...settings,
              metaKeywords: e.target.value.split(","),
            })
          }
        />
      </Section>

      {/* SOCIAL */}
      <Section title="Social Links">
        <Input
          label="Facebook"
          value={settings.facebook}
          onChange={(e) =>
            setSettings({ ...settings, facebook: e.target.value })
          }
        />

        <Input
          label="Instagram"
          value={settings.instagram}
          onChange={(e) =>
            setSettings({ ...settings, instagram: e.target.value })
          }
        />

        <Input
          label="Twitter"
          value={settings.twitter}
          onChange={(e) =>
            setSettings({ ...settings, twitter: e.target.value })
          }
        />

        <Input
          label="YouTube"
          value={settings.youtube}
          onChange={(e) =>
            setSettings({ ...settings, youtube: e.target.value })
          }
        />
      </Section>

      {/* POLICIES */}
      <Section title="Policies">
        <Textarea
          label="Refund Policy"
          value={settings.refundPolicy}
          onChange={(e) =>
            setSettings({ ...settings, refundPolicy: e.target.value })
          }
        />

        <Textarea
          label="Return Policy"
          value={settings.returnPolicy}
          onChange={(e) =>
            setSettings({ ...settings, returnPolicy: e.target.value })
          }
        />

        <Textarea
          label="Privacy Policy"
          value={settings.privacyPolicy}
          onChange={(e) =>
            setSettings({ ...settings, privacyPolicy: e.target.value })
          }
        />

        <Textarea
          label="Terms & Conditions"
          value={settings.termsConditions}
          onChange={(e) =>
            setSettings({ ...settings, termsConditions: e.target.value })
          }
        />
      </Section>

      {/* APP CONTROLS */}
      <Section title="App Controls">
        <Toggle
          label="Maintenance Mode"
          checked={settings.maintenance}
          onChange={(v) => setSettings({ ...settings, maintenance: v })}
        />

        <Input
          label="App Version"
          value={settings.appVersion}
          onChange={(e) =>
            setSettings({ ...settings, appVersion: e.target.value })
          }
        />
      </Section>

      {/* SAVE BUTTON */}
      <button
        onClick={save}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}

/* Sub Components */
function Section({ title, children }: any) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="bg-gray-50 border rounded p-4 space-y-4">
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input {...props} className="border rounded p-2 w-full" />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea {...props} className="border rounded p-2 w-full h-24" />
    </div>
  );
}

function Toggle({ label, checked, onChange }: any) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}
