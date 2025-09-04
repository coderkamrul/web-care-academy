'use client'
import MasonryProject from '@/components/MasonryProject';
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Marquee from "@/components/Marquee";
import BlogCarousel from '@/components/BlogCarousel';
import axios from 'axios';

export default function page() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [projects, setProjects] = useState([]);
    const categories = [
        { name: 'fashion', value: 'Fashion', count: 8 },
        { name: 'fitness & sport', value: 'Fitness & Sport', count: 3 },
        { name: 'education', value: 'Education', count: 4 },
        { name: 'health', value: 'Health', count: 5 },
        { name: 'property', value: 'Property', count: 10 },
        { name: 'corporate', value: 'Corporate', count: 6 },
        { name: 'food & drink', value: 'Food & Drink', count: 6 },
        { name: 'agency', value: 'Agency', count: 10 },
        { name: 'ecommerce', value: 'Ecommerce', count: 18 },
        { name: 'wordpress', value: 'WordPress', count: 23 },
        { name: 'shopify', value: 'Shopify', count: 6 },
        { name: 'archive', value: 'Archive', count: 17 },
    ];

    useEffect(() => {
        axios.get('/api/projects')
            .then(res => setProjects(res.data))
            .catch(err => console.error(err));
    }, []);

    // Filter projects by selected category
    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    return (
        <div>
            <div className='w-full pt-20 pb-28 | lg:pt-36 lg:pb-32'>
                <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                    <div className='px-2 | lg:px-3 | xl:px-4 w-full flex-wrap relative mb-7 | lg:mb-16'>
                        <div className='relative w-full | lg:w-15/16'>
                            <h1 className="inline-flex items-center space-x-2 w-auto mb-2 | lg:mb-0 lg:absolute lg:top-8 lg:left-4 ">
                                <div className="bg-black | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                                <div className="font-light text-sm | lg:text-base text-black | dark:text-white">
                                    Our Work
                                </div>
                            </h1>
                            <ul className='flex-wrap flex'>
                                {/* Explore all category - separate and indented */}
                                <li className='mr-4 | lg:mr-10 lg:indent-32 xl:indent-48'>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedCategory('all')}
                                        className={`inline-flex items-end group duration-200 bg-transparent border-none outline-none cursor-pointer ${selectedCategory === 'all' ? 'text-black dark:text-gray-100' : ''}`}
                                    >
                                        <div className={`text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight ${selectedCategory === 'all' ? 'text-black dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'} leading-tighter text-balance lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white`}>
                                            Explore all
                                        </div>
                                        <div className={`text-sm ml-1 transition mb-0.5 | lg:mb-2 ${selectedCategory === 'all' ? 'text-black dark:text-gray-200' : 'text-gray-400 dark:text-gray-200'}`}>{projects.length}</div>
                                    </button>
                                </li>
                                {/* Other categories */}
                                {categories.map((cat, idx) => (
                                    <li key={cat.value} className='mr-4 | lg:mr-10'>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedCategory(cat.value)}
                                            className={`inline-flex items-end group duration-200 bg-transparent border-none outline-none cursor-pointer ${selectedCategory === cat.value ? 'text-black dark:text-gray-100' : ''}`}
                                        >
                                            <div className={`text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight ${selectedCategory === cat.value ? 'text-black dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'} leading-tighter text-balance lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white`}>
                                                {cat.name}
                                            </div>
                                            <div className={`text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 ${selectedCategory === cat.value ? 'text-black dark:text-gray-200' : 'text-gray-400 dark:text-gray-200'}`}>{projects.filter(p => p.category === cat.value).length}</div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <MasonryProject category={selectedCategory} projects={filteredProjects} />
                </div>
            </div>
            {/* Marquee  */}
            <section className="w-full overflow-hidden">
                <div className="w-full pb-20 | lg:pb-24 | 2xl:pb-40">
                    <div className="px-0">
                        <div className="w-full">
                            <Marquee />
                            <Marquee direction="right" />
                        </div>
                    </div>
                </div>
            </section>
            <BlogCarousel />
        </div>
    )
}
