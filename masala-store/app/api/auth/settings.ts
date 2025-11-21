import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import AppSettings from "@/models/AppSettings";

export async function GET() {
  try {
    await connectDB();
    let settings = await AppSettings.findOne();

    // If no settings exist, create default
    if (!settings) {
      settings = await AppSettings.create({});
    }

    return NextResponse.json({ settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    let settings = await AppSettings.findOne();
    if (!settings) {
      settings = await AppSettings.create(body);
    } else {
      settings = await AppSettings.findOneAndUpdate({}, body, { new: true });
    }

    return NextResponse.json({ settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
