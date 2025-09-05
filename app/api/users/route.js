import { NextResponse } from "next/server"
import { User } from "../../../models/User"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { hasPermission } from "../../../lib/auth-utils"

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has permission to view users
    if (!hasPermission(session.user.role, "user_management")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const users = await User.findAll()

    // Remove sensitive data
    const sanitizedUsers = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
      isProfileComplete: user.isProfileComplete,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    }))

    return NextResponse.json(sanitizedUsers)
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId, role } = await request.json()

    // Check if user has permission to edit users
    if (!hasPermission(session.user.role, "edit_users")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    await User.updateRole(userId, role)

    return NextResponse.json({
      message: "User role updated successfully",
    })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
