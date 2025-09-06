import { NextResponse } from 'next/server';
import { Category } from '@/models/Category';
import { Project } from '@/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { hasPermission } from '@/lib/auth-utils';

// GET /api/categories - Get all categories
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeCount = searchParams.get('includeCount') === 'true';

    let categories = await Category.findAll({ isActive: true });

    // Include project count if requested
    if (includeCount) {
      for (let category of categories) {
        const count = await Project.countDocuments({ 
          category: category.slug,
          status: 'published'
        });
        category.projectCount = count;
      }
    }

    return NextResponse.json(categories);

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create new category
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has permission to manage categories
    if (!hasPermission(session.user.role, 'category_management')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    
    // Check if category already exists
    const existingByName = await Category.findAll({ name: body.name });
    const existingBySlug = body.slug ? await Category.findBySlug(body.slug) : null;
    
    if (existingByName.length > 0 || existingBySlug) {
      return NextResponse.json(
        { error: 'Category with this name or slug already exists' },
        { status: 400 }
      );
    }

    // Create category
    const category = await Category.create(body);

    return NextResponse.json(category, { status: 201 });

  } catch (error) {
    console.error('Error creating category:', error);
    
    if (error.message.includes('required')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}