import { cookies } from "next/headers";
import { verifyToken } from "@/utils/jwt";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export default async function AdminDashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return <div>Unauthorized</div>;

  await connectDB();
  let user: any;
  try {
    const decoded: any = verifyToken(token);
    user = await User.findById(decoded.id);
  } catch {
    return <div>Unauthorized</div>;
  }

  if (user.role !== "admin") return <div>Forbidden</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Dashboard</h2>

      {/* Cards area */}
      <DashboardStats />
    </div>
  );
}
