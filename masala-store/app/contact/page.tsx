"use client";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function ContactPage() {
  return (
    <div className="py-10 max-w-5xl">

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT: Contact Info */}
        <div className="space-y-6 text-gray-800">

          <div>
            <p className="font-semibold text-lg">📞 Phone</p>
            <p>+91 9340384339</p>
          </div>

          <div>
            <p className="font-semibold text-lg">📧 Email</p>
            <p>support@masalastore.in</p>
          </div>

          <div>
            <p className="font-semibold text-lg">📍 Address</p>
            <p>
              MasalaStore  
              <br /> Hyderabad, Telangana  
              <br /> India
            </p>
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <form className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Your Name"
          />

          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Your Email"
          />

          <textarea
            className="w-full border p-3 rounded-lg h-32"
            placeholder="Your Message"
          ></textarea>

          <button
            type="button"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
}
