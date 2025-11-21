import "./globals.css";
import ClientProviders from "./ClientProviders";

export const metadata = {
  title: "Masala Store",
  description: "Premium masalas, spices & daily-use minis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
