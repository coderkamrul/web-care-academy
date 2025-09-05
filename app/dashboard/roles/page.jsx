"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"
import { Checkbox } from "../../../components/ui/checkbox"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { Shield, CheckCircle, Settings } from "lucide-react"
import AuthGuard from "../../../components/auth/auth-guard"

const availablePermissions = [
  { id: "dashboard", label: "Dashboard", description: "Access to main dashboard" },
  { id: "users", label: "User Management", description: "Create, edit, and delete users" },
  { id: "roles", label: "Role Management", description: "Manage role permissions" },
  { id: "profile", label: "Profile Management", description: "View and edit profile" },
  { id: "settings", label: "Settings", description: "Access to system settings" },
  { id: "reports", label: "Reports", description: "View system reports" },
  { id: "analytics", label: "Analytics", description: "View analytics data" },
]

const hardcodedRoles = [
  {
    id: "admin",
    name: "Admin",
    description: "Full system administrator with all permissions",
    permissions: ["dashboard", "users", "roles", "profile", "settings", "reports", "analytics"],
    isActive: true,
    canEdit: false, // Admin permissions cannot be edited
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

export default function RolesPage() {
  const [roles, setRoles] = useState(hardcodedRoles)
  const [loading, setLoading] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    setRoles(hardcodedRoles)
  }, [])

  const handleUpdateRole = async () => {
    try {
      const updatedRoles = roles.map((role) => (role.id === selectedRole.id ? selectedRole : role))
      setRoles(updatedRoles)

      localStorage.setItem("rolePermissions", JSON.stringify(updatedRoles))

      setSuccess("Role permissions updated successfully")
      setIsEditDialogOpen(false)
    } catch (err) {
      setError("Failed to update role")
    }
  }

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setSelectedRole({
        ...selectedRole,
        permissions: [...selectedRole.permissions, permissionId],
      })
    } else {
      setSelectedRole({
        ...selectedRole,
        permissions: selectedRole.permissions.filter((p) => p !== permissionId),
      })
    }
  }

  useEffect(() => {
    const savedPermissions = localStorage.getItem("rolePermissions")
    if (savedPermissions) {
      try {
        const parsedRoles = JSON.parse(savedPermissions)
        setRoles(parsedRoles)
      } catch (err) {
        console.error("Failed to load saved permissions:", err)
      }
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <AuthGuard requiredRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Role Management</h1>
            <p className="text-muted-foreground">
              Configure permissions for the four system roles: Admin, Manager, Team, and User
            </p>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Roles Table */}
        <Card>
          <CardHeader>
            <CardTitle>System Roles</CardTitle>
            <CardDescription>
              Manage permissions for the four predefined system roles. Admin permissions cannot be modified.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          {role.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{role.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={role.isActive ? "default" : "secondary"}>
                        {role.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {role.canEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedRole(role)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        )}
                        {!role.canEdit && (
                          <Badge variant="outline" className="text-xs">
                            Protected
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Role Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Role Permissions</DialogTitle>
              <DialogDescription>
                Modify permissions for this role. Dashboard routes will be automatically added here when created.
              </DialogDescription>
            </DialogHeader>
            {selectedRole && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Role Name</label>
                  <Input value={selectedRole.name} className="mt-1" disabled />
                  <p className="text-xs text-muted-foreground mt-1">Role names cannot be modified</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={selectedRole.description}
                    onChange={(e) => setSelectedRole({ ...selectedRole, description: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Dashboard Route Permissions</label>
                  <div className="mt-2 space-y-3">
                    {availablePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={`edit-${permission.id}`}
                          checked={selectedRole.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => handlePermissionChange(permission.id, checked)}
                        />
                        <div className="flex-1">
                          <label htmlFor={`edit-${permission.id}`} className="text-sm font-medium cursor-pointer">
                            {permission.label}
                          </label>
                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateRole}>
                <Settings className="mr-2 h-4 w-4" />
                Update Permissions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AuthGuard>
  )
}
