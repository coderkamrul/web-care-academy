import { getServerSession } from "next-auth"
import { authOptions } from "../app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect("/auth/login")
  }
  return session
}

export async function requireRole(requiredRole) {
  const session = await requireAuth()

  const roleHierarchy = {
    user: 1,
    manager: 2,
    admin: 3,
  }

  const userLevel = roleHierarchy[session.user.role] || 0
  const requiredLevel = roleHierarchy[requiredRole] || 0

  if (userLevel < requiredLevel) {
    redirect("/dashboard")
  }

  return session
}

export function hasRole(userRole, requiredRole) {
  const roleHierarchy = {
    user: 1,
    manager: 2,
    admin: 3,
  }

  const userLevel = roleHierarchy[userRole] || 0
  const requiredLevel = roleHierarchy[requiredRole] || 0

  return userLevel >= requiredLevel
}
