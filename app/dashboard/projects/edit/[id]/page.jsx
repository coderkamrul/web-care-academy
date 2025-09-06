'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FileUpload from '@/components/FileUpload';
import RichEditor from '@/components/RichEditor';
import TeamMemberCard from '@/components/TeamMemberCard';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Upload, 
  User, 
  Building, 
  Calendar, 
  Tag, 
  FileText,
  Users,
  Video,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  Trash2
} from 'lucide-react';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [saveProgress, setSaveProgress] = useState(0);
  const [teamUsers, setTeamUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [projectFound, setProjectFound] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    year: new Date().getFullYear().toString(),
    tags: '',
    description: '',
    status: 'draft',
    priority: 'medium',
    startDate: '',
    endDate: '',
    budget: '',
    thumbnail: {
      url: '',
      publicId: ''
    },
    gallery: [],
    videos: [],
    client: {
      name: '',
      industry: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      contactPerson: ''
    },
    team: [],
    content: { 
      time: Date.now(), 
      blocks: [], 
      version: "2.29.1" 
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: ''
    }
  });

  // Fetch project data and team users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, teamResponse] = await Promise.all([
          axios.get(`/api/projects/${projectId}`),
          axios.get('/api/users?role=team')
        ]);

        const project = projectResponse.data[0];
        
        // Convert tags array to string if it's an array
        const tagsString = Array.isArray(project.tags) ? project.tags.join(', ') : project.tags || '';
        
        setFormData({
          ...project,
          tags: tagsString,
          // Ensure nested objects exist
          client: project.client || {
            name: '',
            industry: '',
            email: '',
            phone: '',
            address: '',
            website: '',
            contactPerson: ''
          },
          thumbnail: project.thumbnail || { url: '', publicId: '' },
          gallery: project.gallery || [],
          videos: project.videos || [],
          team: project.team || [],
          content: project.content || { time: Date.now(), blocks: [], version: "2.29.1" },
          seo: project.seo || {
            metaTitle: '',
            metaDescription: '',
            keywords: ''
          }
        });
        setTeamUsers(teamResponse.data.users || teamResponse.data);
      } catch (error) {
        console.error('Error fetching project:', error);
        if (error.response?.status === 404) {
          setProjectFound(false);
        }
      } finally {
        setInitialLoading(false);
      }
    };

    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleThumbnailUpload = (result) => {
    setFormData(prev => ({
      ...prev,
      thumbnail: {
        url: result.secure_url,
        publicId: result.public_id
      }
    }));
  };

  const handleGalleryUpload = (results) => {
    const newImages = Array.isArray(results) ? results : [results];
    setFormData(prev => ({
      ...prev,
      gallery: [
        ...prev.gallery,
        ...newImages.map(result => ({
          url: result.secure_url,
          publicId: result.public_id,
          caption: ''
        }))
      ]
    }));
  };

  const handleVideoUpload = (results) => {
    const newVideos = Array.isArray(results) ? results : [results];
    setFormData(prev => ({
      ...prev,
      videos: [
        ...prev.videos,
        ...newVideos.map(result => ({
          url: result.secure_url,
          publicId: result.public_id,
          title: '',
          description: ''
        }))
      ]
    }));
  };

  const handleTeamSelect = (user, role = 'Member') => {
    if (formData.team.some(t => t.user === user._id)) return;
    
    setFormData(prev => ({
      ...prev,
      team: [
        ...prev.team,
        {
          user: user._id,
          name: user.name,
          title: user.title,
          image: user.image,
          role: role,
          email: user.email
        }
      ]
    }));
  };

  const handleTeamRemove = (userId) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.filter(t => t.user !== userId)
    }));
  };

  const handleTeamRoleChange = (userId, newRole) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.map(t => 
        t.user === userId ? { ...t, role: newRole } : t
      )
    }));
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const removeVideo = (index) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.client.name.trim()) newErrors.clientName = 'Client name is required';
    if (formData.client.email && !/\S+@\S+\.\S+/.test(formData.client.email)) {
      newErrors.clientEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();
    
    if (!isDraft && !validateForm()) {
      return;
    }

    setLoading(true);
    setSaveProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setSaveProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      const submitData = {
        ...formData,
        status: isDraft ? 'draft' : formData.status,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      await axios.put(`/api/projects/${projectId}`, submitData);
      
      clearInterval(progressInterval);
      setSaveProgress(100);
      
      setTimeout(() => {
        router.push('/dashboard/projects');
      }, 1000);
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setSaveProgress(0), 2000);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`/api/projects/${projectId}`);
      router.push('/dashboard/projects');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!projectFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been deleted.</p>
          <Button onClick={() => router.push('/dashboard/projects')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const selectedTeamIds = formData.team.map(t => t.user);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
              <p className="text-gray-600 mt-1">{formData.title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
            <Button
              onClick={(e) => handleSubmit(e, false)}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
              Update & Publish
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {saveProgress > 0 && saveProgress < 100 && (
          <div className="mb-6">
            <Progress value={saveProgress} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">Updating project...</p>
          </div>
        )}

        {/* Rest of the form - same structure as create page */}
        <form className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter project title"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    placeholder="project-url-slug"
                    className={errors.slug ? 'border-red-500' : ''}
                  />
                  {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-app">Mobile App</SelectItem>
                      <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="e-commerce">E-commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="year">Project Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                    min="2020"
                    max="2030"
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Brief description of the project"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  placeholder="react, nextjs, design, mobile"
                />
                {formData.tags && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.split(',').map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Media sections - same as create page */}
          {/* Media Upload */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Thumbnail */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Project Thumbnail
                </CardTitle>
              </CardHeader>
              <CardContent>
                {formData.thumbnail.url ? (
                  <div className="relative">
                    <img
                      src={formData.thumbnail.url}
                      alt="Thumbnail"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleChange('thumbnail', { url: '', publicId: '' })}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <FileUpload
                    onUpload={handleThumbnailUpload}
                    accept="image/*"
                    resourceType="image"
                  />
                )}
              </CardContent>
            </Card>

            {/* Videos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  Project Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onUpload={handleVideoUpload}
                  accept="video/*"
                  resourceType="video"
                  multiple={true}
                  maxSize={50 * 1024 * 1024} // 50MB
                />
                
                {formData.videos.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {formData.videos.map((video, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Video className="w-5 h-5 text-blue-500" />
                          <span className="text-sm font-medium">Video {index + 1}</span>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeVideo(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Image Gallery */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Project Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                onUpload={handleGalleryUpload}
                accept="image/*"
                multiple={true}
                resourceType="image"
              />
              
              {formData.gallery.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.gallery.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeGalleryImage(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.client.name}
                    onChange={(e) => handleNestedChange('client', 'name', e.target.value)}
                    placeholder="Client or company name"
                    className={errors.clientName ? 'border-red-500' : ''}
                  />
                  {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>}
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.client.industry}
                    onChange={(e) => handleNestedChange('client', 'industry', e.target.value)}
                    placeholder="e.g., Technology, Healthcare"
                  />
                </div>

                <div>
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.client.email}
                    onChange={(e) => handleNestedChange('client', 'email', e.target.value)}
                    placeholder="client@example.com"
                    className={errors.clientEmail ? 'border-red-500' : ''}
                  />
                  {errors.clientEmail && <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>}
                </div>

                <div>
                  <Label htmlFor="clientPhone">Phone</Label>
                  <Input
                    id="clientPhone"
                    value={formData.client.phone}
                    onChange={(e) => handleNestedChange('client', 'phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.client.website}
                    onChange={(e) => handleNestedChange('client', 'website', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={formData.client.contactPerson}
                    onChange={(e) => handleNestedChange('client', 'contactPerson', e.target.value)}
                    placeholder="Primary contact name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.client.address}
                  onChange={(e) => handleNestedChange('client', 'address', e.target.value)}
                  placeholder="Full business address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Team Members */}
              {formData.team.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Team Members</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.team.map((member) => (
                      <TeamMemberCard
                        key={member.user}
                        user={member}
                        isSelected={true}
                        selectedRole={member.role}
                        onRemove={() => handleTeamRemove(member.user)}
                        onRoleChange={(newRole) => handleTeamRoleChange(member.user, newRole)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Available Team Members */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Available Team Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamUsers
                    .filter(user => !selectedTeamIds.includes(user._id))
                    .map(user => (
                      <TeamMemberCard
                        key={user._id}
                        user={user}
                        onSelect={() => handleTeamSelect(user)}
                      />
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rich Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Project Content</CardTitle>
              <p className="text-sm text-gray-600">
                Create detailed project documentation, case studies, or descriptions
              </p>
            </CardHeader>
            <CardContent>
              <RichEditor
                data={formData.content}
                onChange={(content) => handleChange('content', content)}
                placeholder="Start writing your project story..."
              />
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.seo.metaTitle}
                  onChange={(e) => handleNestedChange('seo', 'metaTitle', e.target.value)}
                  placeholder="SEO-friendly page title"
                />
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.seo.metaDescription}
                  onChange={(e) => handleNestedChange('seo', 'metaDescription', e.target.value)}
                  placeholder="Brief description for search engines"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={formData.seo.keywords}
                  onChange={(e) => handleNestedChange('seo', 'keywords', e.target.value)}
                  placeholder="SEO keywords, comma separated"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={(e) => handleSubmit(e, true)}
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Changes
              </Button>
              
              <Button
                type="submit"
                onClick={(e) => handleSubmit(e, false)}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                Update & Publish
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}