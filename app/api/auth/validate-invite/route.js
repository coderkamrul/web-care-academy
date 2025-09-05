import { NextResponse } from "next/server"
import User from "../../../../models/User"
import { connectDB } from "../../../../lib/mongodb"

export async function POST(request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({
      inviteToken: token,
      inviteTokenExpires: { $gt: new Date() },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired invitation link" }, { status: 400 })
    }

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Validate invite error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
