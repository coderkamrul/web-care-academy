import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { hasPermission, sendEmail } from "../../../../lib/auth-utils"
import User from "../../../../models/User"
import { connectDB } from "../../../../lib/mongodb"
import crypto from "crypto"

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admins can create users
    if (!hasPermission(session.user.role, "all")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const { name, email, role = "user", teamName = "Your Team" } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Generate invitation token (valid for 24 hours)
    const inviteToken = crypto.randomBytes(32).toString("hex")
    const inviteTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user with invitation token
    const userData = {
      name,
      email,
      role,
      isVerified: false,
      inviteToken,
      inviteTokenExpires,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const newUser = await User.create(userData)

    // Send invitation email
    const inviteLink = `${process.env.NEXTAUTH_URL}/auth/invite?token=${inviteToken}`

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to ${teamName}!</h2>
        <p>Hi ${name},</p>
        <p>You've been invited to join <strong>${teamName}</strong> as a ${role}.</p>
        <p>Click the button below to set up your account and create your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${inviteLink}" 
             style="background-color: #7c3aed; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 6px; display: inline-block;">
            Accept Invitation
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          This invitation link will expire in 24 hours. If you didn't expect this invitation, 
          you can safely ignore this email.
        </p>
        <p style="color: #666; font-size: 12px;">
          If the button doesn't work, copy and paste this link: ${inviteLink}
        </p>
      </div>
    `

    await sendEmail(email, `Invitation to join ${teamName}`, emailHtml)

    return NextResponse.json({
      message: "User created and invitation sent successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
