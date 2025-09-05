import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { hasPermission } from "../../../lib/auth-utils"

const hardcodedRoles = [
  {
    id: "admin",
    name: "Admin",
    description: "Full system administrator with all permissions",
    permissions: ["dashboard", "users", "roles", "profile", "settings", "reports", "analytics"],
    isActive: true,
    canEdit: false,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Team manager with limited administrative access",
    permissions: ["dashboard", "profile", "reports"],
    isActive: true,
    canEdit: true,
  },
  {
    id: "team",
    name: "Team",
    description: "Team member with collaborative access",
    permissions: ["dashboard", "profile"],
    isActive: true,
    canEdit: true,
  },
  {
    id: "user",
    name: "User",
    description: "Standard user with basic access",
    permissions: ["dashboard", "profile"],
    isActive: true,
    canEdit: true,
  },
]

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admins can view roles
    if (!hasPermission(session.user.role, "all")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    return NextResponse.json(hardcodedRoles)
  } catch (error) {
    console.error("Get roles error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admins can create roles
    if (!hasPermission(session.user.role, "all")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    return NextResponse.json(
      { error: "Role creation is disabled. Only the 4 predefined roles (Admin, Manager, Team, User) are allowed." },
      { status: 403 },
    )
  } catch (error) {
    console.error("Create role error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
