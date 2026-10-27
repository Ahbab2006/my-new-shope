import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;

    if (username === envUser && password === envPass) {
      return NextResponse.json({ success: true, message: "Login successful" });
    }

    return NextResponse.json(
      { success: false, message: "ভুল ইউজারনেম বা পাসওয়ার্ড!" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "সার্ভার এরর" },
      { status: 500 }
    );
  }
}