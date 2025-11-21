import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { comparePassword } from "@/utils/hash";
import { signToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const match = comparePassword(password, user.password);
    if (!match)
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });

    const token = signToken({ id: user._id });

    const res = NextResponse.json({ message: "Logged in", user });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
