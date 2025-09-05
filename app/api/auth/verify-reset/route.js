import { NextResponse } from "next/server"
import { connectDB } from "../../../../lib/mongodb"
import User from "../../../../models/User"
import crypto from "crypto"

export async function POST(request) {
  try {
    const { email, verificationCode } = await request.json()

    if (!email || !verificationCode) {
      return NextResponse.json({ error: "Email and verification code are required" }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.verificationCode !== verificationCode) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 })
    }

    if (user.verificationCodeExpires < new Date()) {
      return NextResponse.json({ error: "Verification code has expired" }, { status: 400 })
    }

    // Generate a temporary token for password reset
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    user.resetToken = resetToken
    user.resetTokenExpires = resetTokenExpires
    await user.save()

    return NextResponse.json(
      {
        message: "Code verified successfully",
        token: resetToken,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Verify reset error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
