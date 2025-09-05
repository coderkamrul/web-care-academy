"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const login = async (credentials) => {
    try {
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      if (result?.ok) {
        // Get fresh session data to check verification status
        const response = await fetch("/api/auth/session")
        const sessionData = await response.json()

        if (sessionData?.user?.isVerified === false) {
          router.push("/auth/verify")
        } else {
          router.push("/dashboard")
        }
        return { success: true }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    await signOut({ redirect: false })
    router.push("/auth/login")
  }

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    login,
    logout,
  }
}
