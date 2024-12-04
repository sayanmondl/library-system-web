import { signOut } from "@/auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    await signOut({ redirect: false });
    return NextResponse.json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { success: false, message: "Unable to log you out" },
      { status: 500 }
    )
  }
}