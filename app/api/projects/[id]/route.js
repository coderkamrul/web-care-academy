import { NextResponse } from 'next/server';
import { Project } from '@/models/Project';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { hasPermission } from '@/lib/auth-utils';

// GET /api/projects/[id] - Get single project
export async function GET(request, { params }) {
  try {

    const { id } = await params;

    // Check if id is a valid ObjectId or treat as slug
    let project;
    if (ObjectId.isValid(id)) {
      project = await Project.findById(id);
    } else {
      project = await Project.findBySlug(id);
    }

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Populate related data
    const populatedProject = await Project.populateTeamMembers(project);

    // Increment view count
    await Project.incrementViews(project._id);
    populatedProject.views = (populatedProject.views || 0) + 1;

    return NextResponse.json(populatedProject);

  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update project
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has permission to edit projects
    if (!hasPermission(session.user.role, 'project_management')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
    const { id } = await params;
    const body = await request.json();

    // Find project
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Check if slug is being changed and if it already exists
    if (body.slug && body.slug !== project.slug) {
      const existingProject = await Project.findBySlug(body.slug);
      if (existingProject) {
        return NextResponse.json(
          { error: 'Project with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update project
    const updateData = {
      ...body,
      updatedBy: session.user.id
    };
    // Remove _id if present to avoid MongoDB immutable field error
    if (updateData._id) delete updateData._id;
    await Project.updateById(id, updateData);

    // Get and populate the updated project
    const updatedProject = await Project.findById(id);
    const populatedProject = await Project.populateTeamMembers(updatedProject);

    return NextResponse.json(populatedProject);

  } catch (error) {
    console.error('Error updating project:', error);
    
    if (error.message.includes('required') || error.message.includes('already exists')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has permission to delete projects
    if (!hasPermission(session.user.role, 'project_management')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
    const { id } = await params;

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    await Project.deleteById(id);

    return NextResponse.json(
      { message: 'Project deleted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}