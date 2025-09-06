import { connectDB } from '../lib/mongodb';
import { ObjectId } from 'mongodb';

export class Project {
  static async findAll(filter = {}, options = {}) {
    const client = await connectDB();
    const db = client.db();
    
    let query = db.collection('projects').find(filter);
    
    if (options.sort) {
      query = query.sort(options.sort);
    }
    
    if (options.skip) {
      query = query.skip(options.skip);
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const projects = await query.toArray();
    return projects;
  }

  static async findById(id) {
    const client = await connectDB();
    const db = client.db();
    const project = await db.collection('projects').findOne({ _id: new ObjectId(id) });
    return project;
  }

  static async findBySlug(slug) {
    const client = await connectDB();
    const db = client.db();
    const project = await db.collection('projects').findOne({ slug });
    return project;
  }

  static async create(projectData) {
    const client = await connectDB();
    const db = client.db();
    
    const project = {
      ...projectData,
      slug: projectData.slug || this.generateSlug(projectData.title),
      status: projectData.status || 'draft',
      priority: projectData.priority || 'medium',
      views: 0,
      likes: 0,
      featured: projectData.featured || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Validate required fields
    if (!project.title) throw new Error('Title is required');
    if (!project.client?.name) throw new Error('Client name is required');
    if (!project.category) throw new Error('Category is required');
    if (!project.year) throw new Error('Year is required');

    const result = await db.collection('projects').insertOne(project);
    return { ...project, _id: result.insertedId };
  }

  static async updateById(id, updateData) {
    const client = await connectDB();
    const db = client.db();
    
    const update = {
      ...updateData,
      updatedAt: new Date()
    };

    const result = await db.collection('projects').updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    
    return result;
  }

  static async deleteById(id) {
    const client = await connectDB();
    const db = client.db();
    
    const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
    return result;
  }

  static async incrementViews(id) {
    const client = await connectDB();
    const db = client.db();
    
    const result = await db.collection('projects').updateOne(
      { _id: new ObjectId(id) },
      { $inc: { views: 1 }, $set: { updatedAt: new Date() } }
    );
    
    return result;
  }

  static async countDocuments(filter = {}) {
    const client = await connectDB();
    const db = client.db();
    return await db.collection('projects').countDocuments(filter);
  }

  static async aggregate(pipeline) {
    const client = await connectDB();
    const db = client.db();
    return await db.collection('projects').aggregate(pipeline).toArray();
  }

  static generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  static async populateTeamMembers(projects) {
    if (!Array.isArray(projects)) {
      projects = [projects];
    }

    const client = await connectDB();
    const db = client.db();

    for (let project of projects) {
      if (project.team && project.team.length > 0) {
        const userIds = project.team.map(t => new ObjectId(t.user));
        const users = await db.collection('users').find(
          { _id: { $in: userIds } },
          { projection: { name: 1, title: 1, image: 1, email: 1 } }
        ).toArray();

        project.team = project.team.map(teamMember => {
          const user = users.find(u => u._id.toString() === teamMember.user.toString());
          return {
            ...teamMember,
            userDetails: user
          };
        });
      }

      if (project.createdBy) {
        const creator = await db.collection('users').findOne(
          { _id: new ObjectId(project.createdBy) },
          { projection: { name: 1, email: 1 } }
        );
        project.createdByDetails = creator;
      }
    }

    return projects;
  }
}