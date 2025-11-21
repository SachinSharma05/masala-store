"use client";

import { useState } from "react";
import { useUser } from "@/context/user-context";

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, removeAddress } = useUser();

  const [form, setForm] = useState({
    label: "",
    name: "",
    phone: "",
    line1: "",
    city: "",
    pincode: "",
    state: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(form);
    setForm({ label: "", name: "", phone: "", line1: "", city: "", pincode: "", state: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Addresses</h1>

      <form onSubmit={submit} className="space-y-3 mb-6">
        <input className="w-full border px-3 py-2 rounded" placeholder="Label (Home / Work)" value={form.label} onChange={(e)=>setForm({...form,label:e.target.value})}/>
        <input className="w-full border px-3 py-2 rounded" placeholder="Full name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required/>
        <input className="w-full border px-3 py-2 rounded" placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} required/>
        <input className="w-full border px-3 py-2 rounded" placeholder="Address line" value={form.line1} onChange={(e)=>setForm({...form,line1:e.target.value})} required/>
        <div className="flex gap-2">
          <input className="flex-1 border px-3 py-2 rounded" placeholder="City" value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})} required/>
          <input className="w-32 border px-3 py-2 rounded" placeholder="Pincode" value={form.pincode} onChange={(e)=>setForm({...form,pincode:e.target.value})} required/>
        </div>
        <input className="w-full border px-3 py-2 rounded" placeholder="State" value={form.state} onChange={(e)=>setForm({...form,state:e.target.value})}/>
        <button className="bg-orange-600 text-white px-4 py-2 rounded">Add Address</button>
      </form>

      <div className="space-y-3">
        {addresses.map((a) => (
          <div key={a.id} className="border rounded p-3 flex justify-between items-start">
            <div>
              <div className="font-medium">{a.label || a.name}</div>
              <div className="text-sm text-gray-600">{a.line1}, {a.city} - {a.pincode}</div>
              <div className="text-sm text-gray-600 mt-1">📞 {a.phone}</div>
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={() => removeAddress(a.id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
