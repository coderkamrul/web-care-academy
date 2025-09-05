import { NextResponse } from "next/server"
import User from "../../../../models/User"
import { connectDB } from "../../../../lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({
      inviteToken: token,
      inviteTokenExpires: { $gt: new Date() },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired invitation link" }, { status: 400 })
    }

    // Hash password and update user
    const hashedPassword = await bcrypt.hash(password, 12)

    user.password = hashedPassword
    user.isVerified = true
    user.inviteToken = undefined
    user.inviteTokenExpires = undefined
    user.updatedAt = new Date()

    await user.save()

    return NextResponse.json({ message: "Account setup completed successfully" })
  } catch (error) {
    console.error("Accept invite error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
