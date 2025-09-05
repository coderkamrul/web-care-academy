import { NextResponse } from "next/server"
import { User } from "../../../../models/User"

export async function POST(request) {
  try {
    const { userId, verificationCode } = await request.json()

    if (!userId || !verificationCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find user
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check verification code
    if (user.verificationCode !== verificationCode) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 })
    }

    // Update user as verified
    await User.updateById(userId, {
      isVerified: true,
      verificationCode: null,
    })

    return NextResponse.json({
      message: "Account verified successfully",
    })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
