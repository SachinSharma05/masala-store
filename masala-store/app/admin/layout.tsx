// app/admin/layout.tsx
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-5 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
