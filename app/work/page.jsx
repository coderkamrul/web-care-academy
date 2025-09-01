'use client'
import MasonryProject from '@/components/MasonryProject';
import Link from 'next/link'
import React from 'react'
import Marquee from "@/components/Marquee";
import BlogCarousel from '@/components/BlogCarousel';

export default function page() {
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
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-black  | dark:text-gray-100 leading-tighter text-balance lg:indent-32 | xl:indent-48 lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            Explore all
                                        </div>
                                        <div className="text-sm ml-1 transition mb-0.5 | lg:mb-2 text-black | dark:text-gray-200">49</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            fashion
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">8</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            fitness & sport
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">3</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            education
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">4</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            health
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">5</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            property
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">10</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            corporate
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">6</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            food & drink
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">6</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            agency
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">10</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            ecommerce
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">18</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            wordpress
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">23</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            shopify
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">6</div>
                                    </Link>
                                </li>
                                <li className='mr-4 | lg:mr-10'>
                                    <Link href="/work" className='inline-flex items-end group duration-200'>
                                        <div className='text-xl | md:text-[4vw] | xl:text-[3vw] font-medium tracking-tight text-gray-400  | dark:text-gray-600 leading-tighter text-balance  lowercase transition | xl:group-hover:text-black lg:dark:group-hover:text-white'>
                                            archive
                                        </div>
                                        <div className="text-xs lg:text-sm ml-1 transition mb-0.5 | lg:mb-2 text-gray-400  | dark:text-gray-200">17</div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <MasonryProject />
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
            <BlogCarousel/>
        </div>
    )
}
