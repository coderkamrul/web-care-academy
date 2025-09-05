import { NextResponse } from "next/server"
import { User } from "../../../../models/User"
import { generateVerificationCode, sendVerificationCode } from "../../../../lib/auth-utils"

export async function POST(request) {
  try {
    const { userId, contactMethod } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 })
    }

    // Find user
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.isVerified) {
      return NextResponse.json({ error: "User already verified" }, { status: 400 })
    }

    // Generate new verification code
    const verificationCode = await generateVerificationCode()

    // Update user with new code
    await User.updateById(userId, { verificationCode })

    // Send verification code
    const contact = contactMethod === "email" ? user.email : user.phone
    await sendVerificationCode(contact, verificationCode, contactMethod)

    return NextResponse.json({
      message: "Verification code sent successfully",
    })
  } catch (error) {
    console.error("Resend code error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
