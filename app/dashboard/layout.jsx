"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Badge } from "../../components/ui/badge"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { LayoutDashboard, Users, Settings, Shield, LogOut, Menu, X, User, AlertCircle, PhoneCallIcon, FolderKanban } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["user", "manager", "admin"] },
  { name: "Users", href: "/dashboard/users", icon: Users, roles: ["manager", "admin"] },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban, roles: ["manager", "admin"] },
  { name: "Contacts", href: "/dashboard/contacts", icon: PhoneCallIcon, roles: ["manager", "admin"] },
  { name: "Roles", href: "/dashboard/roles", icon: Shield, roles: ["admin"] },
  { name: "Profile", href: "/dashboard/profile", icon: User, roles: ["user", "manager", "admin"] },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["admin"] },
]

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/login")
      return
    }
  }, [session, status, router])

  const handleSignOut = async () => {
    const { signOut } = await import("next-auth/react")
    await signOut({ redirect: false })
    router.push("/auth/login")
  }

  const filteredNavigation = navigation.filter((item) => item.roles.includes(session?.user?.role || "user"))

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "manager":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

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

  const showProfileIncompleteAlert = !session.user.isProfileComplete

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-foreground">Admin Dashboard</h1>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-sidebar-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={session.user.profileImage || "/placeholder.svg"} />
                    <AvatarFallback>{session.user.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-sidebar-foreground">{session.user.name}</p>
                    <Badge variant="secondary" className={cn("text-xs", getRoleBadgeColor(session.user.role))}>
                      {session.user.role}
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-background border-b border-border h-16 flex items-center justify-between px-6">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex-1" />

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome back, {session.user.name}</span>
          </div>
        </header>

        {/* Profile incomplete alert */}
        {showProfileIncompleteAlert && (
          <div className="p-6 pb-0">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your profile is incomplete.
                <Link href="/dashboard/profile" className="ml-1 font-medium text-primary hover:underline">
                  Complete your profile
                </Link>{" "}
                to access all features.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
