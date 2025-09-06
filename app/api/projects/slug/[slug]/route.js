import { NextResponse } from "next/server";
import projects from "@/lib/projects"; // or relative path


export async function GET(req, { params }) {
const { slug } = await params;
const work = projects.find((p) => p.slug === slug);


if (!work) {
return NextResponse.json({ error: "Work not found" }, { status: 404 });
}


return NextResponse.json(work, { status: 200 });
}