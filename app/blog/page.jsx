'use client'
import BlogCard from '@/components/BlogCard'
import NewsletterForm from '@/components/NewsletterForm';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



export default function page() {
    const [blogPosts, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Explore all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogRes = await axios.get("/api/blogs");
                setBlogs(blogRes.data);
                // Extract unique categories from blogs data
                const uniqueCategories = Array.from(new Set(blogRes.data.map(blog => blog.category))).filter(Boolean);
                setCategories(uniqueCategories);
            } catch (err) {
                setError("Failed to load blogs");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filtered blog posts by selected category
    const filteredBlogs = selectedCategory === 'Explore all'
        ? blogPosts
        : blogPosts.filter(blog => blog.category === selectedCategory);

    // Count blogs per category
    const categoryCounts = categories.reduce((acc, cat) => {
        acc[cat] = blogPosts.filter(blog => blog.category === cat).length;
        return acc;
    }, {});
    const exploreAllCount = blogPosts.length;


    if (error) return <p className="text-red-600">{error}</p>;
    return (
        <div>
            <div className='w-full pt-20 pb-28 | lg:pt-36 lg:pb-32'>
                <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                    <div className='px-2 | lg:px-3 | xl:px-4 w-full flex-wrap relative mb-7 | lg:mb-16'>
                        <div className='relative w-full | lg:w-15/16'>
                            <h1 className="inline-flex items-center space-x-2 w-auto mb-2 | lg:mb-0 lg:absolute lg:top-4 lg:left-4 ">
                                <div className="bg-black | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                                <div className="font-light text-sm | lg:text-base text-black | dark:text-white">
                                    The Blog
                                </div>
                            </h1>
                            <ul className='flex-wrap flex'>
                                {/* Explore all category, separated and indented */}
                                <li className={`mr-4 | lg:mr-10`}>
                                    <button
                                        className={`inline-flex items-end group duration-200 focus:outline-none cursor-pointer`}
                                        onClick={() => setSelectedCategory('Explore all')}
                                    >
                                        <div className={`text-xl | md:text-[4vw] | xl:text-[2.5vw] font-medium tracking-tight ${selectedCategory === 'Explore all' ? 'text-black dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'} leading-tighter text-balance lg:indent-32 | xl:indent-48 lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white`}>
                                            Explore all
                                        </div>
                                        <div className={`text-sm ml-1 transition mb-0.5 | lg:mb-2 ${selectedCategory === 'Explore all' ? 'text-black dark:text-gray-200' : 'text-gray-400 dark:text-gray-200'}`}>{exploreAllCount}</div>
                                    </button>
                                </li>
                                {/* Other categories from API */}
                                {categories.map((cat) => (
                                    <li key={cat} className='mr-4 | lg:mr-10'>
                                        <button
                                            className={`inline-flex items-end group duration-200 focus:outline-none cursor-pointer`}
                                            onClick={() => setSelectedCategory(cat)}
                                        >
                                            <div className={`text-xl | md:text-[4vw] | xl:text-[2.5vw] font-medium tracking-tight ${selectedCategory === cat ? 'text-black dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'} leading-tighter text-balance lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white`}>
                                                {cat}
                                            </div>
                                            <div className={`text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 ${selectedCategory === cat ? 'text-black dark:text-gray-200' : 'text-gray-400 dark:text-gray-200'}`}>{categoryCounts[cat]}</div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-wrap'>
                        {/* First 8 blog cards (index 0-7) */}
                        {filteredBlogs.slice(0, 8).map((blog, i) => (
                            <div key={i} className='w-full mb-12 | md:mb-16 md:w-1/2 | lg:w-1/3'>
                                <BlogCard
                                    key={i}
                                    image={blog.image}
                                    user={blog.user}
                                    read={blog.read}
                                    title={blog.title}
                                    url={blog.slug}
                                />
                            </div>
                        ))}

                        {/* Newsletter section placeholder */}
                        <div className="px-2 | lg:px-3 | xl:px-4 w-full mb-16">
                            <div className='w-full flex flex-col justify-between rounded-2xl overflow-hidden bg-[#d0ff71] | md:flex-row md:rounded-3xl | dark:bg-[#1a1b1e]'>
                                <div className='flex items-center justify-start w-full p-6 | md:w-9/16 md:p-12 md:pr-0 | lg:w-7/16 lg:p-16 lg:pr-0'>
                                    <div className='w-full'>
                                        <div className='form'>
                                            <NewsletterForm />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-1 flex items-end justify-end ml-auto w-12/16 | md:w-6/16 | lg:w-12/16 lg:max-w-sm'>
                                    <Image src="/images/mailing-list-dark.png" alt="Newsletter Illustration" width={400} height={400} className='w-full h-auto object-contain hidden | dark:block' />
                                    <Image src="/images/mailing-list-light.png" alt="Newsletter Illustration" width={400} height={400} className='w-full h-auto object-contain dark:hidden' />
                                </div>
                            </div>
                        </div>

                        {/* Remaining blog cards (index 8 and up) */}
                        {filteredBlogs.slice(8).map((blog, i) => (
                            <div key={i + 8} className='w-full mb-12 | md:mb-16 md:w-1/2 | lg:w-1/3'>
                                <BlogCard
                                    image={blog.image}
                                    user={blog.user}
                                    read={blog.read}
                                    title={blog.title}
                                    url={blog.slug}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
