import { NextResponse } from "next/server"
import { User } from "../../../../models/User"
import { generateVerificationCode, sendVerificationCode, validateEmail } from "../../../../lib/auth-utils"

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Find user by email
    const user = await User.findByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "No account found with this email address" }, { status: 404 })
    }

    // Generate verification code for password reset
    const verificationCode = await generateVerificationCode()

    // Update user with verification code
    await User.updateById(user._id, { verificationCode })

    // Send verification code via email
    const emailSent = await sendVerificationCode(email, verificationCode, "email")

    if (!emailSent) {
      return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 })
    }

    return NextResponse.json({
      message: "Password reset code sent to your email",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
