import { NextResponse } from "next/server"
import { connectDB } from "../../../../lib/mongodb"
import User from "../../../../models/User"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const { email, token, newPassword } = await request.json()

    console.log("[v0] Reset password request data:", { email, token, newPassword: newPassword ? "***" : undefined })

    if (!email || !token || !newPassword) {
      console.log("[v0] Missing fields - email:", !!email, "token:", !!token, "newPassword:", !!newPassword)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.resetToken !== token) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    if (user.resetTokenExpires < new Date()) {
      return NextResponse.json({ error: "Reset token has expired" }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    user.password = hashedPassword
    user.resetToken = null
    user.resetTokenExpires = null
    user.verificationCode = null
    user.verificationCodeExpires = null
    await user.save()

    return NextResponse.json({
      message: "Password reset successfully",
    })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
