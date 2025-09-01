import { NextResponse } from "next/server";
import blogPosts from "@/lib/blogs"; // if you use path alias
// If not using alias: import blogPosts from "../../../lib/blogs";


export async function GET() {
return NextResponse.json(blogPosts, { status: 200 });
}