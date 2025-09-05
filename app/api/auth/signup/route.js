import { NextResponse } from "next/server"
import { User } from "../../../../models/User"
import { generateVerificationCode, sendVerificationCode, validateEmail } from "../../../../lib/auth-utils"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email)

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Generate verification code
    const verificationCode = await generateVerificationCode()

    const userData = {
      name,
      email,
      phone: null,
      password,
      verificationCode,
      isVerified: false,
    }

    const user = await User.create(userData)

    const emailSent = await sendVerificationCode(email, verificationCode, "email")

    if (!emailSent) {
      return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 })
    }

    return NextResponse.json({
      message: "User created successfully. Please check your email for verification code.",
      userId: user._id,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
