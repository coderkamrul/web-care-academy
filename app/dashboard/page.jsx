"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Users, Shield, Activity, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const { data: session } = useSession()

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      description: "+20.1% from last month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Sessions",
      value: "89",
      description: "+12% from last hour",
      icon: Activity,
      color: "text-green-600",
    },
    {
      title: "Roles Assigned",
      value: "23",
      description: "+3 new this week",
      icon: Shield,
      color: "text-purple-600",
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      description: "+2.1% from last month",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "manager":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {session?.user?.name}!</h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your dashboard today.</p>
          <div className="mt-3">
            <Badge variant="secondary" className={getRoleColor(session?.user?.role)}>
              {session?.user?.role?.toUpperCase()} ACCESS
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Role updated</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Profile completed</p>
                  <p className="text-xs text-muted-foreground">10 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {session?.user?.role === "admin" && (
                <>
                  <button className="w-full text-left p-3 rounded-md hover:bg-muted transition-colors">
                    <p className="font-medium">Manage Users</p>
                    <p className="text-sm text-muted-foreground">Add, edit, or remove users</p>
                  </button>
                  <button className="w-full text-left p-3 rounded-md hover:bg-muted transition-colors">
                    <p className="font-medium">Configure Roles</p>
                    <p className="text-sm text-muted-foreground">Set up permissions and access levels</p>
                  </button>
                </>
              )}
              <button className="w-full text-left p-3 rounded-md hover:bg-muted transition-colors">
                <p className="font-medium">Update Profile</p>
                <p className="text-sm text-muted-foreground">Edit your personal information</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
