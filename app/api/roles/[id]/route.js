import { NextResponse } from "next/server"
import { Role } from "../../../../models/Role"
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

    const { id } = params
    const updateData = await request.json()

    await Role.updateById(id, updateData)

    return NextResponse.json({
      message: "Role updated successfully",
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

    const { id } = params

    // Prevent deleting default roles
    const role = await Role.findById(id)
    if (role && ["admin", "manager", "user"].includes(role.name)) {
      return NextResponse.json({ error: "Cannot delete default roles" }, { status: 403 })
    }

    await Role.deleteById(id)

    return NextResponse.json({
      message: "Role deleted successfully",
    })
  } catch (error) {
    console.error("Delete role error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
