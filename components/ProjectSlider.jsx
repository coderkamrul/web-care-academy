import React, { useEffect, useRef, useState } from 'react'
import Buttons from './Buttons'
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProjectCard from './ProjectCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ProjectSlider() {
    const [projects, setProjects] = useState([]);
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        axios.get('/api/projects')
            .then(res => setProjects(res.data))
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        if (!swiperRef.current) return;
        const swiper = swiperRef.current;


        // connect external buttons
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
    }, [prevRef, nextRef]);

    return (
        <div>
            <div className='w-full py-20 | lg:py-24 | 2xl:py-32'>
                <div className='px-0'>
                    <div className='w-full flex flex-wrap'>
                        <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40 w-full flex flex-wrap justify-between items-end mb-10'>
                            <div className='px-2 | lg:px-3 | xl:px-4 w-14/16 | lg:w-auto'>
                                <div className="flex flex-col space-y-3 | lg:space-y-5 items-start">
                                    <div className="inline-flex items-center space-x-2  ">
                                        <div className="bg-black | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                                        <div className="font-light text-sm  text-black | dark:text-white">More good stuff</div>
                                    </div>
                                    <h2 className="text-5xl | md:text-3xl | lg:text-4xl  | 2xl:text-5xl  font-medium tracking-tight text-black  | dark:text-white leading-none text-balance max-w-xs ">What next?</h2></div>
                            </div>
                            <div className='px-2 | lg:px-3 | xl:px-4 w-full mt-3 | lg:w-auto lg:mt-0'>
                                <Buttons
                                    bg={"bg-[#d0ff71]"}
                                    text={"Browse more Work"}
                                    color={"text-black"}
                                    link={"/work"}
                                />
                            </div>
                        </div>
                        <div className='w-full md:px-0 px-1'>
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={40}
                                slidesPerView={1.2}
                                onBeforeInit={(swiper) => (swiperRef.current = swiper)}
                                onSlideChange={(swiper) => {
                                    setIsBeginning(swiper.isBeginning);
                                    setIsEnd(swiper.isEnd);
                                }}
                                breakpoints={{
                                    640: { slidesPerView: 1.5 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3.5 }, // 2.5 = 2 full + 1 half visible
                                }}
                                grabCursor
                            >
                                {projects.map((project, i) => (
                                    <SwiperSlide key={i}>
                                        <ProjectCard
                                            video={project.video}
                                            title={project.title}
                                            tags={project.tags}
                                            category={project.category}
                                            year={project.year}
                                            slug={project.slug}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className='w-full flex justify-center'>
                            <div className="flex items-center space-x-2">
                                <button
                                    ref={prevRef}
                                    className={`w-10 h-10 rounded-full inline-flex items-center justify-center             bg-gray-100 dark:bg-white dark:text-black ${isBeginning
                                            ? "opacity-50 pointer-events-none"
                                            : "cursor-pointer xl:hover:bg-[#d0ff71]"
                                        }`}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>

                                <button
                                    ref={nextRef}
                                    className={`w-10 h-10 rounded-full inline-flex items-center justify-center             bg-gray-100 dark:bg-white dark:text-black ${isEnd
                                            ? "opacity-50 pointer-events-none"
                                            : "cursor-pointer xl:hover:bg-[#d0ff71]"
                                        }`}
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
