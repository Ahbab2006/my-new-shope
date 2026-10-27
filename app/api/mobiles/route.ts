import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Mobile } from "@/models/Mobile";

// app/api/mobiles/route.ts
export async function GET() {
  try {
    await connectDB();
    const mobiles = await Mobile.find({}).sort({ createdAt: -1 });
    return NextResponse.json(mobiles);
  } catch (error: any) {
    console.error("GET /api/mobiles Error:", error); // <-- টার্মিনালে আসল এরর প্রিন্ট হবে
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newMobile = await Mobile.create(body);
    return NextResponse.json(newMobile, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/mobiles Error:", error); // <-- টার্মিনালে আসল এরর প্রিন্ট হবে
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}