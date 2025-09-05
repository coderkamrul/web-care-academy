import clientPromise from "../lib/mongodb"

export class Role {
  constructor(data) {
    this.name = data.name
    this.permissions = data.permissions || []
    this.description = data.description || ""
    this.isActive = data.isActive !== undefined ? data.isActive : true
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  static async getCollection() {
    const client = await clientPromise
    const db = client.db("admin_dashboard")
    return db.collection("roles")
  }

  static async create(roleData) {
    const collection = await this.getCollection()
    const role = new Role(roleData)
    const result = await collection.insertOne(role)
    return { ...role, _id: result.insertedId }
  }

  static async findAll() {
    const collection = await this.getCollection()
    return await collection.find({}).toArray()
  }

  static async findByName(name) {
    const collection = await this.getCollection()
    return await collection.findOne({ name })
  }

  static async findById(id) {
    const collection = await this.getCollection()
    const { ObjectId } = require("mongodb")
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async updateById(id, updateData) {
    const collection = await this.getCollection()
    const { ObjectId } = require("mongodb")
    updateData.updatedAt = new Date()

    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })
  }

  static async deleteById(id) {
    const collection = await this.getCollection()
    const { ObjectId } = require("mongodb")
    return await collection.deleteOne({ _id: new ObjectId(id) })
  }

  // Initialize default roles
  static async initializeDefaultRoles() {
    const collection = await this.getCollection()
    const existingRoles = await collection.countDocuments()

    if (existingRoles === 0) {
      const defaultRoles = [
        {
          name: "admin",
          permissions: ["all"],
          description: "Full system access",
        },
        {
          name: "manager",
          permissions: ["user_management", "view_reports", "edit_users"],
          description: "User management and reporting access",
        },
        {
          name: "user",
          permissions: ["view_profile", "edit_profile"],
          description: "Basic user access",
        },
      ]

      for (const roleData of defaultRoles) {
        await this.create(roleData)
      }
    }
  }
}
