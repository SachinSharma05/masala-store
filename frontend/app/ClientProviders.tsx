"use client";

import { Navbar } from "@/components/Navbar";
import { UserProvider } from "@/context/user-context";
import { CartProvider } from "@/context/cart-context";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import CallButton from "@/components/CallButton";
import Footer from "@/components/Footer";
import CrispChat from "@/components/CrispChat";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <CartProvider>
        <Navbar />
        <CartDrawer />
        <Toast />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        <ScrollToTop />
        <WhatsAppButton />
        <CallButton />
        <CrispChat />
        <Footer />
      </CartProvider>
    </UserProvider>
  );
}
