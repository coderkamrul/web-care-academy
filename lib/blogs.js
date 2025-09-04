export const rawBlogPosts = [{
    image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "2 min read",
title: "How to Build a Strong Brand Identity",
description:"Learn the essentials of creating a strong and memorable brand identity.",
category: "Branding",
},
{
image: "/images/blog-1.png",
user: "/images/andy.png",
read: "4 min read",
title: "Mastering Next.js for Scalable Web Apps",
description:"A deep dive into building production-ready web applications with Next.js.",
category: "Development",
},
{
image: "/images/blog-1.png",
user: "/images/blog-1.png",
read: "3 min read",
title: "SEO Strategies That Actually Work in 2025",
description:"Stay ahead with the latest SEO techniques that bring real results.",
category: "Marketing",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "2 min read",
title: "The Future of Web Design Trends",
description:
"A glimpse into upcoming design trends and how they will shape the web.",
category: "Design",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "2 min read",
title: "How to Build a Strong Brand Identity",
description:"Learn the essentials of creating a strong and memorable brand identity.",
category: "Branding",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "4 min read",
title: "Mastering Next.js for Scalable Web Apps",
description:
"A deep dive into building production-ready web applications with Next.js.",
category: "Development",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "3 min read",
title: "SEO Strategies That Actually Work in 2025",
description:
"Stay ahead with the latest SEO techniques that bring real results.",
category: "Marketing",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "2 min read",
title: "The Future of Web Design Trends 1",
description:
"A glimpse into upcoming design trends and how they will shape the web.",
category: "Design",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "2 min read",
title: "The Future of Web Design Trends 2",
description:
"A glimpse into upcoming design trends and how they will shape the web.",
category: "Design",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "2 min read",
title: "The Future of Web Design Trends 3",
description:
"A glimpse into upcoming design trends and how they will shape the web.",
category: "Design",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "2 min read",
title: "The Future of Web Design Trends 4",
description:
"A glimpse into upcoming design trends and how they will shape the web.",
category: "Design",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "2 min read",
title: "The Future of Web Design Trends 5",
description:
"A glimpse into upcoming design trends and how they will shape the web.",
category: "Design",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "2 min read",
title: "The Future of Web Design Trends 6",
description:
"A glimpse into upcoming design trends and how they will shape the web.",
category: "Design",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "2 min read",
title: "The Future of Web Design Trends 7",
description:
"A glimpse into upcoming design trends and how they will shape the web.",
category: "Design",
},
{
image: "/images/blog-1.png",
user: "/images/user-1.png",
read: "2 min read",
title: "The Future of Web Design Trends 8",
description:
"A glimpse into upcoming design trends and how they will shape the web.",
category: "Design",
},
];


// 2) Slug util
export function slugify(title) {
return title
.toLowerCase()
.trim()
.replace(/["'`]/g, "") // strip quotes
.replace(/[^\w\s-]/g, "") // keep word chars, space, dash
.replace(/\s+/g, "-");
}


// 3) Create unique slugs even if titles repeat
export const blogPosts = (() => {
const counts = Object.create(null);
return rawBlogPosts.map((b) => {
const base = slugify(b.title);
const n = (counts[base] || 0) + 1;
counts[base] = n;
const slug = n > 1 ? `${base}-${n}` : base; // e.g., "how-to-build-...", "how-to-build-...-2"
return { id: slug, slug, ...b };
});
})();


export default blogPosts;