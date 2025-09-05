import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb" // your file above

export async function POST(request) {
  try {
    const client = await connectDB()
    const db = client.db() // default DB from connection string
    const data = await request.json()

    // basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    const saved = await db.collection("contacts").insertOne({
      ...data,
      createdAt: new Date(),
    })

    return NextResponse.json({
      message: "Form submitted ✅",
      contact: { id: saved.insertedId, ...data },
    })
  } catch (error) {
    console.error("❌ Contact form error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const client = await connectDB()
    const db = client.db()

    const contacts = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ contacts })
  } catch (error) {
    console.error("❌ Fetch contacts error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
