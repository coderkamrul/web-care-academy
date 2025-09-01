'use client'
import BlogHeroSkeleton from '@/components/BlogHeroSkeleton';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page({ params }) {
    const { slug } = params;
    const [blog, setBlog] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");


useEffect(() => {
const fetchBlog = async () => {
try {
const res = await axios.get(`/api/blogs/${slug}`);
setBlog(res.data);
} catch (err) {
setError("Blog not found");
console.error(err);
} finally {
setLoading(false);
}
};


if (slug) fetchBlog();
}, [slug]);


if (loading) return <BlogHeroSkeleton />;
if (error) return <BlogHeroSkeleton error="Blog not found" slug={slug}/>;
    return (
        <>
            <div className='w-full pt-20 pb-10 | lg:pt-32 lg:pb-16 | xl:pt-40 md:mb-10'>
                <div className='pl-2 | sm:pl-6 | xl:pl-12 | 2xl:pl-40'>
                    <div className='w-full relative overflow-hidden flex flex-wrap justify-between | md:min-h-140 | xl:min-h-160 '>
                        <div className='w-full inline-flex flex-col justify-between items-start relative z-20 order-2 | md:order-1'>
                            <div className='w-full relative mt-5 mb-5 | md:mt-28'>
                                <svg
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    className="w-8 h-8 md:w-12 md:h-12 text-white fill-current absolute top-1 -ml-px mt-px left-5/16 z-30 transform -translate-y-20 rotate-180 hidden md:block 2xl:left-4/16 dark:text-black"
                                >
                                    <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                                </svg>

                                <svg
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    className="w-8 h-8 md:w-12 md:h-12 text-white fill-current absolute bottom-0 mb-px -ml-px left-5/16 z-30 transform translate-y-12 hidden md:block 2xl:left-4/16 dark:text-black"
                                >
                                    <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                                </svg>

                                <div className='w-auto inline-flex rounded-r-2xl mt-2 pl-4 pr-4 | md:pl-0 md:w-7/16 md:-mt-7 md:bg-white md:p-10 md:pr-6 md:rounded-r-3xl | 2xl:w-7/16 | md:dark:bg-black'>
                                    <div className='flex flex-col space-y-3 | lg:space-y-5 items-start'>
                                        <div className="inline-flex items-center space-x-2 md:left-2 md:relative | lg:absolute lg:left-3 lg:top-8 ">
                                            <div className="bg-black | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                                            <div className="font-light text-sm text-black | dark:text-white">{blog.read}</div>
                                        </div>
                                        <h1 className="text-3xl lg:text-4xl | 2xl:text-5xl font-medium tracking-tight text-black  | dark:text-white leading-tight md:pl-2 | lg:indent-32 xl:indent-40">{blog.title}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='pl-4 | md:pl-2'>
                                <Link href="/about" className="flex items-end space-x-3 | lg:space-x-5">
                                    <div className="w-16 h-16 rounded-lg | lg:rounded-xl inline-flex overflow-hidden relative">
                                        <div className="relative overflow-hidden w-full">
                                            <Image src={blog.user} alt='profile' layout='fill' className="w-full" />
                                        </div>
                                    </div>
                                    <div className="leading-tight tracking-tight">
                                        <div className="text-xs font-light mb-1 | text-black | dark:text-white">
                                            Written by
                                        </div>
                                        <div className="text-black | dark:text-white">
                                            Jo Edwards
                                        </div>
                                        <div className="font-light text-xs | lg:text-sm text-gray-400 | dark:text-gray-200">
                                            Web Developer
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='w-full h-60 relative order-1 pl-2 sm:pl-0 sm:h-96 md:order-2 md:absolute md:h-full md:right-0 md:top-0 md:pl-[31.25%] md:pr-0 2xl:pl-[25%]'>
                            <div className='w-full h-full relative overflow-hidden rounded-bl-2xl bg-gray-50 | dark:bg-[#1a1b1e]| md:rounded-r-none md:rounded-l-3xl'>
                                <div className='w-28 h-14 bg-white absolute top-0 left-0 z-20 rounded-br-2xl | md:hidden | dark:bg-black'>
                                    <svg
                                        id="Layer_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 100"
                                        className="w-10 h-10 text-white fill-current absolute bottom-px -left-px z-30 transform translate-y-full dark:text-black"
                                    >
                                        <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                                    </svg>

                                    <svg
                                        id="Layer_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 100"
                                        className="w-10 h-10 text-white fill-current absolute -top-px right-px z-30 transform translate-x-full dark:text-black"
                                    >
                                        <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                                    </svg>

                                </div>
                                <Image src="/images/blog-hero.png" alt='blog-hero' layout='fill' className="w-full object-cover object-center h-full absolute top-0 left-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
