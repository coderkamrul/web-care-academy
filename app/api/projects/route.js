import { NextResponse } from 'next/server';
import { Project } from '@/models/Project';
import { User } from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { hasPermission } from '@/lib/auth-utils';

// GET /api/projects - Get all projects with filtering and pagination
export async function GET(request) {
  try {

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build query
    const filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured) filter.featured = featured === 'true';
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const projects = await Project.findAll(filter, { sort, skip, limit });
    
    // Populate team members and creator details
    const populatedProjects = await Project.populateTeamMembers(projects);

    // Get total count for pagination
    const total = await Project.countDocuments(filter);

    return NextResponse.json({
      projects: populatedProjects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has permission to create projects
    if (!hasPermission(session.user.role, 'project_management')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
    const body = await request.json();
    

    // Check if slug already exists
    const existingProject = await Project.findBySlug(body.slug);
    if (existingProject) {
      return NextResponse.json(
        { error: 'Project with this slug already exists' },
        { status: 400 }
      );
    }

    // Create project
    const projectData = {
      ...body,
      createdBy: session.user.id
    };

    const project = await Project.create(projectData);
    
    // Populate the created project
    const populatedProject = await Project.populateTeamMembers(project);

    return NextResponse.json(populatedProject, { status: 201 });

  } catch (error) {
    console.error('Error creating project:', error);
    
    if (error.message.includes('required')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (error.message.includes('already exists')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}