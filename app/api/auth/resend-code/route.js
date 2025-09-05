import { NextResponse } from "next/server"
import { User } from "../../../../models/User"
import { generateVerificationCode, sendVerificationCode } from "../../../../lib/auth-utils"

export async function POST(request) {
  try {
    const { userId, email, contactMethod } = await request.json()

    // Check for at least one identifier
    if (!userId && !email) {
      return NextResponse.json({ error: "Missing user identifier" }, { status: 400 })
    }

    // Find user by ID or email
    let user
    if (userId) {
      user = await User.findById(userId)
    } else if (email) {
      user = await User.findOne({ email })
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.isVerified) {
      return NextResponse.json({ error: "User already verified" }, { status: 400 })
    }

    // Generate new verification code
    const verificationCode = await generateVerificationCode()

    // Update user with new code
    await User.updateById(user._id, { verificationCode })

    // Send verification code
    const contact = contactMethod === "email" ? user.email : user.phone
    await sendVerificationCode(contact, verificationCode, contactMethod)

    return NextResponse.json({
      message: "Verification code sent successfully",
      userId: user._id, // Return userId for frontend use
    })
  } catch (error) {
    console.error("Resend code error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
