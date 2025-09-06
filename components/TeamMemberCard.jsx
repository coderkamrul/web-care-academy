'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, UserPlus, UserMinus } from 'lucide-react';

export default function TeamMemberCard({ 
  user, 
  isSelected = false, 
  onSelect, 
  onRemove, 
  selectedRole = 'Member',
  onRoleChange 
}) {
  const [role, setRole] = useState(selectedRole);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    onRoleChange?.(newRole);
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {user.image ? (
              <img 
                src={user.image} 
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </h3>
              {isSelected ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onRemove}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <UserMinus className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={onSelect}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-1">{user.title || 'Team Member'}</p>
            
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
              {user.email && (
                <div className="flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>

            {isSelected && (
              <div className="mt-3">
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Project Role
                </label>
                <Select value={role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lead">Project Lead</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Manager">Project Manager</SelectItem>
                    <SelectItem value="Consultant">Consultant</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {user.skills && user.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {user.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {user.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{user.skills.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}