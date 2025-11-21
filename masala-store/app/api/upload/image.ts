import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file)
      return NextResponse.json({ message: "File is required" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "masala-store" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    return NextResponse.json({ upload });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
