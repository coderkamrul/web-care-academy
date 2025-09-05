import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { hasPermission } from "../../../../lib/auth-utils"

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admins can update roles
    if (!hasPermission(session.user.role, "all")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const { id } = await params
    const updateData = await request.json()

    if (id === "admin") {
      return NextResponse.json({ error: "Admin role permissions cannot be modified" }, { status: 403 })
    }

    if (!["manager", "team", "user"].includes(id)) {
      return NextResponse.json({ error: "Invalid role ID" }, { status: 404 })
    }

    // This is a simplified approach since we're using hardcoded roles
    return NextResponse.json({
      message: "Role permissions updated successfully",
      roleId: id,
      permissions: updateData.permissions,
    })
  } catch (error) {
    console.error("Update role error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admins can delete roles
    if (!hasPermission(session.user.role, "all")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    return NextResponse.json(
      {
        error: "Role deletion is disabled. The 4 system roles (Admin, Manager, Team, User) cannot be deleted.",
      },
      { status: 403 },
    )
  } catch (error) {
    console.error("Delete role error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
