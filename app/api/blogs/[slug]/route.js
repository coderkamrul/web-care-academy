import { NextResponse } from "next/server";
import blogPosts from "@/lib/blogs"; // or relative path


export async function GET(req, { params }) {
const { slug } = params;
const blog = blogPosts.find((b) => b.slug === slug);


if (!blog) {
return NextResponse.json({ error: "Blog not found" }, { status: 404 });
}


return NextResponse.json(blog, { status: 200 });
}