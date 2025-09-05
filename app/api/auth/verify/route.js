import { NextResponse } from "next/server"
import { User } from "../../../../models/User"

export async function POST(request) {
  try {
    const { userId, email, verificationCode } = await request.json()

    // Check for required fields
    if (!verificationCode || (!userId && !email)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
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

    // Check verification code
    if (user.verificationCode !== verificationCode) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 })
    }

    // Update user as verified
    await User.updateById(user._id, {
      isVerified: true,
      verificationCode: null,
    })

    return NextResponse.json({
      message: "Account verified successfully",
      userId: user._id, // optional, useful for frontend
    })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
