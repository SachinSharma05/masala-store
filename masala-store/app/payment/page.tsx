"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useUser } from "@/context/user-context";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PaymentPage() {
  const router = useRouter();
  const amount = Number(useSearchParams().get("amount") || 0);

  const { cart, clearCart } = useCart();
  const { addOrder } = useUser();

  const handleCOD = () => {
    addOrder({
      items: cart,
      total: amount,
      address: {},  // you can pass actual address if needed
      paymentMode: "Cash On Delivery"
    });

    clearCart();
    router.push("/order-success");
  };

  const handleOnlinePayment = () => {
    // 🔥 You can integrate Razorpay / Stripe / Paytm later
    alert("Online payment is not implemented yet, using test mode…");

    addOrder({
      items: cart,
      total: amount,
      address: {},
      paymentMode: "Online Payment"
    });

    clearCart();
    router.push("/order-success");
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Checkout", href: "/checkout" },
          { label: "Payment" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-6">Payment</h1>

      <div className="p-6 border rounded-xl shadow-sm bg-white space-y-6">

        <div className="text-lg font-medium flex justify-between">
          <span>Total Payable Amount:</span>
          <span className="text-orange-600 font-bold">₹{amount}</span>
        </div>

        <h2 className="text-xl font-semibold">Select Payment Method</h2>

        <div className="space-y-3">

          {/* COD */}
          <button
            onClick={handleCOD}
            className="w-full border p-3 rounded-lg hover:bg-orange-50 text-left"
          >
            💵 Cash on Delivery
          </button>

          {/* UPI */}
          <button
            onClick={handleOnlinePayment}
            className="w-full border p-3 rounded-lg hover:bg-orange-50 text-left"
          >
            📱 UPI / Wallets
          </button>

          {/* Card */}
          <button
            onClick={handleOnlinePayment}
            className="w-full border p-3 rounded-lg hover:bg-orange-50 text-left"
          >
            💳 Credit / Debit Card
          </button>

        </div>

        <p className="text-sm text-gray-500 mt-3">
          (Online payments will be integrated later)
        </p>
      </div>
    </div>
  );
}
