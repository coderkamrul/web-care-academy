import { connectDB } from '../lib/mongodb';
import { ObjectId } from 'mongodb';

export class Category {
  static async findAll(filter = {}) {
    const client = await connectDB();
    const db = client.db();
    const categories = await db.collection('categories').find(filter).sort({ name: 1 }).toArray();
    return categories;
  }

  static async findById(id) {
    const client = await connectDB();
    const db = client.db();
    const category = await db.collection('categories').findOne({ _id: new ObjectId(id) });
    return category;
  }

  static async findBySlug(slug) {
    const client = await connectDB();
    const db = client.db();
    const category = await db.collection('categories').findOne({ slug });
    return category;
  }

  static async create(categoryData) {
    const client = await connectDB();
    const db = client.db();
    
    const category = {
      ...categoryData,
      slug: categoryData.slug || this.generateSlug(categoryData.name),
      isActive: categoryData.isActive !== undefined ? categoryData.isActive : true,
      projectCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Validate required fields
    if (!category.name) throw new Error('Category name is required');

    const result = await db.collection('categories').insertOne(category);
    return { ...category, _id: result.insertedId };
  }

  static async updateById(id, updateData) {
    const client = await connectDB();
    const db = client.db();
    
    const update = {
      ...updateData,
      updatedAt: new Date()
    };

    const result = await db.collection('categories').updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    
    return result;
  }

  static async deleteById(id) {
    const client = await connectDB();
    const db = client.db();
    
    const result = await db.collection('categories').deleteOne({ _id: new ObjectId(id) });
    return result;
  }

  static async countDocuments(filter = {}) {
    const client = await connectDB();
    const db = client.db();
    return await db.collection('categories').countDocuments(filter);
  }

  static generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  static async updateProjectCounts() {
    const client = await connectDB();
    const db = client.db();
    
    const categories = await db.collection('categories').find({}).toArray();
    
    for (let category of categories) {
      const count = await db.collection('projects').countDocuments({ 
        category: category.slug,
        status: 'published'
      });
      
      await db.collection('categories').updateOne(
        { _id: category._id },
        { $set: { projectCount: count } }
      );
    }
  }
}