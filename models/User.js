import clientPromise from "../lib/mongodb"
import bcrypt from "bcryptjs"

export class User {
  constructor(data) {
    this.name = data.name
    this.email = data.email
    this.phone = data.phone
    this.password = data.password
    this.role = data.role || "user"
    this.isVerified = data.isVerified || false
    this.verificationCode = data.verificationCode
    this.profileImage = data.profileImage || null
    this.username = data.username || null
    this.address = data.address || null
    this.profession = data.profession || null
    this.isProfileComplete = data.isProfileComplete || false
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  static async getCollection() {
    const client = await clientPromise
    const db = client.db("admin_dashboard")
    return db.collection("users")
  }

  static async create(userData) {
    const collection = await this.getCollection()

    // Check if this is the first user (make them admin)
    const userCount = await collection.countDocuments()
    if (userCount === 0) {
      userData.role = "admin"
    }

    // Hash password
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 12)
    }

    const user = new User(userData)
    const result = await collection.insertOne(user)
    return { ...user, _id: result.insertedId }
  }

  static async findByEmail(email) {
    const collection = await this.getCollection()
    return await collection.findOne({ email })
  }

  static async findByPhone(phone) {
    const collection = await this.getCollection()
    return await collection.findOne({ phone })
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

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })
    return result
  }

  static async findAll(filter = {}) {
    const collection = await this.getCollection()
    return await collection.find(filter).toArray()
  }

  static async deleteById(id) {
    const collection = await this.getCollection()
    const { ObjectId } = require("mongodb")
    return await collection.deleteOne({ _id: new ObjectId(id) })
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }

  static async updateRole(id, role) {
    return await this.updateById(id, { role })
  }

  static async completeProfile(id, profileData) {
    const updateData = {
      ...profileData,
      isProfileComplete: true,
    }
    return await this.updateById(id, updateData)
  }
}
