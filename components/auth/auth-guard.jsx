"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthGuard({ children, requiredRole = null }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      router.push("/auth/login")
      return
    }

    if (requiredRole) {
      const roleHierarchy = {
        user: 1,
        manager: 2,
        admin: 3,
      }

      const userLevel = roleHierarchy[session.user.role] || 0
      const requiredLevel = roleHierarchy[requiredRole] || 0

      if (userLevel < requiredLevel) {
        router.push("/dashboard")
        return
      }
    }
  }, [session, status, router, requiredRole])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (requiredRole) {
    const roleHierarchy = {
      user: 1,
      manager: 2,
      admin: 3,
    }

    const userLevel = roleHierarchy[session.user.role] || 0
    const requiredLevel = roleHierarchy[requiredRole] || 0

    if (userLevel < requiredLevel) {
      return null
    }
  }

  return children
}
