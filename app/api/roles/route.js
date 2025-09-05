import { NextResponse } from "next/server"
import { Role } from "../../../models/Role"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { hasPermission } from "../../../lib/auth-utils"

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

    const roles = await Role.findAll()
    return NextResponse.json(roles)
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

    const roleData = await request.json()

    // Check if role already exists
    const existingRole = await Role.findByName(roleData.name)
    if (existingRole) {
      return NextResponse.json({ error: "Role already exists" }, { status: 409 })
    }

    const role = await Role.create(roleData)
    return NextResponse.json(role)
  } catch (error) {
    console.error("Create role error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
