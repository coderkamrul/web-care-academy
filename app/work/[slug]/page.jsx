'use client'
import Buttons from '@/components/Buttons';
import ProjectSlider from '@/components/ProjectSlider';
import VideoButton from '@/components/VideoButton';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
export default function page({ params }) {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const unwrappedParams = React.use(params);
    const { slug } = unwrappedParams;


    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`/api/projects/${slug}`);
                setProject(res.data);
            } catch (err) {
                setError("Project not found");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };


        if (slug) fetchProject();
    }, [slug]);
    // Show spinner while loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <AiOutlineLoading3Quarters className="animate-spin w-10 h-10 text-gray-600 dark:text-white" />
            </div>
        );
    }

    // Show error message if API fails
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <>
            <div className='w-full pt-28 | lg:pt-40 mb-3 | lg:mb-20'>
                <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                    <div className='w-full flex flex-wrap justify-between items-start relative z-20 mb-5 | lg:mb-10'>
                        <div className='px-2 | lg:px-3 | xl:px-4 w-full mb-2 hidden | lg:flex lg:mb-0 lg:w-6/16'>
                            <div className='flex flex-wrap items-center mb-3 | lg:mb-20'>
                                {project?.tags?.slice(0, 4).map((tag, idx) => (
                                    <div key={idx} className="bg-gray-50 leading-tight rounded-full mr-2 mb-2 | lg:mr-3 lg:mb-3 text-sm pt-2 pb-1.5 px-4 dark:bg-[#26282c] dark:text-white">
                                        {tag}
                                    </div>
                                ))}
                                {project?.tags?.length > 5 && (
                                    <div className="bg-gray-200 leading-tight rounded-full mr-2 mb-2 | lg:mr-3 lg:mb-3 text-sm pt-2 pb-1.5 px-4 dark:bg-[#26282c] dark:text-white">
                                        +{project.tags.length - 4}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='px-2 | lg:px-3 | xl:px-4 w-full | lg:w-10/16'>
                            <div className='relative bg-white rounded-bl-2xl | lg:px-10 lg:pb-5 lg:pt-0 lg:rounded-bl-3xl | dark:bg-black'>
                                <svg
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute left-0 z-30 transform mb-px ml-px -translate-x-full bottom-2 xl:bottom-6 dark:text-black"
                                >
                                    <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                                </svg>

                                <svg
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute bottom-0 right-0 z-30 mb-px -mr-px transform translate-y-full dark:text-black"
                                >
                                    <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                                </svg>

                                <div className="flex items-center space-x-3 mb-3 | xl:mb-5 text-sm dark:text-gray-200">
                                    <div className="font-light">{project?.year ?? 'Year'}</div>
                                    <div className="w-1.5 h-1.5 relative -top-px bg-gray-600 rounded-full | dark:bg-gray-200"></div>
                                    <div className="font-light">{project?.client ?? 'Client'}</div>
                                </div>
                                <h1 className="text-4xl | lg:text-[4vw] | 2xl:text-[3.5vw] font-medium tracking-tight text-black  | dark:text-white leading-none text-balance">
                                    {project?.title ?? slug}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='px-2 | lg:px-3 | xl:px-4 w-full relative'>
                        <div className='w-full relative'>
                            <div className='absolute top-0 -right-px z-20 bg-white pl-3 pb-3 transform-gpu rotate-001 rounded-bl-3xl | lg:hidden lg:rounded-bl-3xl  | dark:bg-black'>
                                <svg
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute -top-px left-px transform-gpu -translate-x-full dark:text-black"
                                >
                                    <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                                </svg>

                                <svg
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute bottom-px right-0 transform-gpu translate-y-full dark:text-black"
                                >
                                    <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                                </svg>

                                <div className='flex flex-wrap items-center -mb-2 lg:-mb-3 -mr-2'>
                                    {project?.tags?.slice(0, 2).map((tag, idx) => (
                                        <div key={idx} className="bg-gray-50 leading-tight rounded-full mr-2 mb-2 | lg:mr-3 lg:mb-3 text-sm pt-2 pb-1.5 px-4 dark:bg-[#26282c] dark:text-white">
                                            {tag}
                                        </div>
                                    ))}
                                    {project?.tags?.length > 2 && (
                                        <div className="bg-gray-200 leading-tight rounded-full mr-2 mb-2 | lg:mr-3 lg:mb-3 text-sm pt-2 pb-1.5 px-4 dark:bg-[#26282c] dark:text-white">
                                            +{project.tags.length - 2}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='w-full overflow-hidden bg-gray-50 relative z-10 rounded-2xl aspect-4/3 | lg:aspect-16/9 lg:rounded-3xl | lg:-mt-24 | xl:-mt-28 | dark:bg-gray-500'>
                                <Image src={project?.thumb ?? "/images/blog-hero.png"} alt={project?.title} fill className='w-full h-full object-cover' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full pb-10 | lg:pb-16 | 2xl:pb-24'>
                <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                    <div className='flex flex-wrap items-start justify-between relative z-10'>
                        <div className='px-2 | lg:px-3 | xl:px-4 relative w-full flex flex-wrap | lg:mb-0 lg:w-9/16'>
                            <div className='order-2 | lg:order-1'>
                                <div className='w-full relative  lg:pr-16'>
                                    <h2 className="mb-3 text-pretty tracking-tight text-black| dark:text-white text-xl md:text-3xl xl:text-4xl font-medium leading-none">A new personal brand identity, bespoke site and build</h2>
                                </div>
                            </div>
                            <div className='flex space-x-2 order-1 mb-5 w-full | lg:mb-0 lg:order-2 lg:mt-5'>
                                {/* Team member images, max 6, then show +N */}
                                {project?.team?.slice(0, 6).map((member, idx) => (
                                    <div key={idx} className='relative rounded-lg overflow-hidden w-10 h-10 | lg:w-12 lg:h-12'>
                                        <div className='relative overflow-hidden w-full h-full'>
                                            <Image src={member.image} fill alt={member.name} className='absolute top-0 left-0 w-full h-full object-cover' />
                                        </div>
                                    </div>
                                ))}
                                {project?.team?.length > 6 && (
                                    <div className='relative rounded-lg overflow-hidden w-10 h-10 | lg:w-12 lg:h-12 flex items-center justify-center bg-gray-200 dark:bg-[#26282c] text-gray-700 dark:text-white text-sm font-semibold'>
                                        +{project.team.length - 6}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='px-2 | lg:px-3 | xl:px-4 w-full | lg:w-7/16'>
                            <div className="w-full relative  xl:pr-10">
                                <p className="text-base | xl:text-md text-black dark:text-gray-200 relative z-10 text-pretty font-light leading-7  mb-6">We were tasked to reimagine all aspects of the Gary Neville brand, from his personal brand identity through to carefully architectured site structure, design, and build. The website acts as an overview of all things Gary Neville, from business to broadcasting, to charity and public speaking.
                                </p>
                            </div>
                            <div className='w-full max-w-2xl mt-6 flex flex-wrap justify-between pr-6 | lg:mt-10 lg:pr-0'>
                                <div className='mb-3 pr-8 | lg:mb-0'>
                                    <div className="text-sm text-gray-600 font-light | dark:text-gray-200">Client</div>
                                    <div className="text-md | lg:text-lg | xl:text-xl | dark:text-white">{project?.client}</div>
                                </div>
                                <div className='mb-3 pr-8 | lg:mb-0'>
                                    <div className="text-sm text-gray-600 font-light | dark:text-gray-200">Industry</div>
                                    <div className="text-md | lg:text-lg | xl:text-xl | dark:text-white">{project?.industry}</div>
                                </div>
                                <div className=' pr-8 | lg:mb-0'>
                                    <div className="text-sm text-gray-600 font-light | dark:text-gray-200">Duration</div>
                                    <div className="text-md | lg:text-lg | xl:text-xl | dark:text-white">{project?.duration}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {project?.videoCard &&
                <VideoButton src={project?.videoCard} />
            }

            {/* dubble Image card  */}
            <div className='py-4'>
                <div className='w-full py-0'>
                    <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                        <div className='w-full flex flex-wrap -mb-5 | md:mb-0'>
                            {project?.twoImages?.length > 0
                                ? project.twoImages.map((img, idx) => (
                                    <div key={idx} className='px-2 | lg:px-3 | xl:px-4 w-full h-auto mb-5 | md:mb-0 md:w-6/12 aspect-1/1'>
                                        <div className='w-full h-full relative overflow-hidden rounded-2xl bg-gray-50 | dark:bg-gray-500 | lg:rounded-3xl'>
                                            <div className='w-full h-full relative '>
                                                <Image src={img} alt={project?.title + ' image ' + (idx + 1)} fill className='w-full h-full object-cover' />
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : (
                                    <div className='px-2 | lg:px-3 | xl:px-4 w-full h-auto mb-5 | md:mb-0 md:w-6/12 aspect-1/1'>
                                        <div className='w-full h-full relative overflow-hidden rounded-2xl bg-gray-50 | dark:bg-gray-500 | lg:rounded-3xl'>
                                            <div className='w-full h-full relative '>
                                                <Image src={project?.thumb ?? "/images/blog-hero.png"} alt={project?.title} fill className='w-full h-full object-cover' />
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>

            {/* single Image card  */}
            <div className='py-4'>
                <div className='w-full py-0'>
                    <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                        <div className='px-2 | lg:px-3 | xl:px-4 w-full flex flex-wrap'>
                            <div className='bg-gray-50 rounded-2xl transform-gpu overflow-hidden p-4 w-full h-full | md:p-16 | lg:rounded-3xl | 2xl:p-28 | dark:bg-[#26282c]'>
                                <div className='relative overflow-hidden w-full h-full aspect-16/9 rounded'>
                                    <Image src={project?.thumb ?? "/images/blog-hero.png"} alt={project?.title} fill className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Text card  */}
            <div className='py-4'>
                <div className='w-full py-10 | lg:py-16 | 2xl:py-24'>
                    <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                        <div className='w-full flex flex-wrap justify-between'>
                            <div className='px-2 | lg:px-3 | xl:px-4 relative w-full mb-5 | lg:mb-0 lg:w-6/16 | xl:w-7/16'>
                                <div className="inline-flex items-center space-x-2 w-auto mb-3 | xl:mb-0 xl:absolute xl:top-3 xl:left-4">
                                    <div className="bg-black | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                                    <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">Website</div>
                                </div>
                                <h2 className="text-2xl | md:text-3xl | xl:text-4xl font-medium tracking-tight text-black  | dark:text-gray-100 leading-none text-balance xl:indent-32">Exclusive yet progressive</h2>
                            </div>
                            <div className='px-2 | lg:px-3 | xl:px-4 w-full | lg:w-8/16'>
                                <div className='w-full relative lg:pr-10'>
                                    <p className="text-base  text-gray-700 dark:text-gray-200  relative z-10 text-pretty font-light leading-7  mb-6">We created an exclusive yet progressive platform, evoking a sense of sophistication with storytelling at its core. Gary is a very busy man, with involvement in many areas - the new brand and website had to encompass everything Gary is and does.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* single Image card  */}
            <div className='py-4'>
                <div className='w-full py-0'>
                    <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                        <div className='px-2 | lg:px-3 | xl:px-4 w-full flex flex-wrap'>
                            <div className='bg-gray-50 rounded-2xl transform-gpu overflow-hidden aspect-16/9  w-full h-full lg:rounded-3xl | dark:bg-[#26282c]'>
                                <div className='relative overflow-hidden w-full h-full  rounded'>
                                    <Image src={project?.thumb ?? "/images/blog-hero.png"} alt={project?.title} fill className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Text card  */}
            <div className='py-4'>
                <div className='w-full py-10 | lg:py-16 | 2xl:py-24'>
                    <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                        <div className='w-full flex flex-wrap justify-between'>
                            <div className='px-2 | lg:px-3 | xl:px-4 relative w-full mb-5 | lg:mb-0 lg:w-6/16 | xl:w-7/16'>
                                <div className="inline-flex items-center space-x-2 w-auto mb-3 | xl:mb-0 xl:absolute xl:top-3 xl:left-4">
                                    <div className="bg-black | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                                    <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">Logo</div>
                                </div>
                                <h2 className="text-2xl | md:text-3xl | xl:text-4xl font-medium tracking-tight text-black  | dark:text-gray-100 leading-none text-balance xl:indent-32">The heart of the brand</h2>
                            </div>
                            <div className='px-2 | lg:px-3 | xl:px-4 w-full | lg:w-8/16'>
                                <div className='w-full relative lg:pr-10'>
                                    <p className="text-base  text-gray-700 dark:text-gray-200  relative z-10 text-pretty font-light leading-7  mb-6">Centering the brand logo mark at the heart of the brand, the brand identity uses an unapologetically bold responsive logomark and typography to convey its messaging.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* single Image card  */}
            <div className='py-4'>
                <div className='w-full py-0'>
                    <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                        <div className='px-2 | lg:px-3 | xl:px-4 w-full flex flex-wrap'>
                            <div className='bg-gray-50 rounded-2xl transform-gpu overflow-hidden aspect-16/9  w-full h-full lg:rounded-3xl | dark:bg-[#26282c]'>
                                <div className='relative overflow-hidden w-full h-full  rounded'>
                                    <Image src={project?.thumb ?? "/images/blog-hero.png"} alt={project?.title} fill className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* single Image card  */}
            <div className='py-4'>
                <div className='w-full py-0'>
                    <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                        <div className='px-2 | lg:px-3 | xl:px-4 w-full flex flex-wrap'>
                            <div className='bg-gray-50 rounded-2xl transform-gpu overflow-hidden aspect-16/9  w-full h-full lg:rounded-3xl | dark:bg-[#26282c]'>
                                <div className='relative overflow-hidden w-full h-full  rounded'>
                                    <Image src={project?.thumb ?? "/images/blog-hero.png"} alt={project?.title} fill className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Text card  */}
            <div className='py-4'>
                <div className='w-full py-10 | lg:py-16 | 2xl:py-24'>
                    <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                        <div className='w-full flex flex-wrap justify-between'>
                            <div className='px-2 | lg:px-3 | xl:px-4 relative w-full mb-5 | lg:mb-0 lg:w-6/16 | xl:w-7/16'>
                                <div className="inline-flex items-center space-x-2 w-auto mb-3 | xl:mb-0 xl:absolute xl:top-3 xl:left-4">
                                    <div className="bg-black | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                                    <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">Process</div>
                                </div>
                                <h2 className="text-2xl | md:text-3xl | xl:text-4xl font-medium tracking-tight text-black  | dark:text-gray-100 leading-none text-balance xl:indent-32">Carefully Curated Media</h2>
                            </div>
                            <div className='px-2 | lg:px-3 | xl:px-4 w-full | lg:w-8/16'>
                                <div className='w-full relative lg:pr-10'>
                                    <p className="text-base  text-gray-700 dark:text-gray-200  relative z-10 text-pretty font-light leading-7  mb-6">With media being of utmost importance, we paired these snippets of Gary's life with a classic yet contemporary typeface that aims to add a level of sophistication to the brand.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* single Image card  */}
            <div className='py-4'>
                <div className='w-full py-0'>
                    <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                        <div className='px-2 | lg:px-3 | xl:px-4 w-full flex flex-wrap'>
                            <div className='bg-gray-50 rounded-2xl transform-gpu overflow-hidden aspect-16/9  w-full h-full lg:rounded-3xl | dark:bg-[#26282c]'>
                                <div className='relative overflow-hidden w-full h-full  rounded'>
                                    <Image src={project?.thumb ?? "/images/blog-hero.png"} alt={project?.title} fill className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* dubble Image card  */}
            <div className='py-4'>
                <div className='w-full py-0'>
                    <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                        <div className='w-full flex flex-wrap -mb-5 | md:mb-0'>
                            {project?.twoImages?.length > 0
                                ? project.twoImages.map((img, idx) => (
                                    <div key={idx} className='px-2 | lg:px-3 | xl:px-4 w-full h-auto mb-5 | md:mb-0 md:w-6/12 aspect-1/1'>
                                        <div className='w-full h-full relative overflow-hidden rounded-2xl bg-gray-50 | dark:bg-gray-500 | lg:rounded-3xl'>
                                            <div className='w-full h-full relative '>
                                                <Image src={img} alt={project?.title + ' image ' + (idx + 1)} fill className='w-full h-full object-cover' />
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : (
                                    <div className='px-2 | lg:px-3 | xl:px-4 w-full h-auto mb-5 | md:mb-0 md:w-6/12 aspect-1/1'>
                                        <div className='w-full h-full relative overflow-hidden rounded-2xl bg-gray-50 | dark:bg-gray-500 | lg:rounded-3xl'>
                                            <div className='w-full h-full relative '>
                                                <Image src={project?.thumb ?? "/images/blog-hero.png"} alt={project?.title} fill className='w-full h-full object-cover' />
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>

            {/* project slider  */}

            <ProjectSlider/>

            


            {project?.livePreview &&
                <div className='fixed bottom-0 left-0 z-50 w-full flex justify-center mb-6 transition-opacity opacity-100 pointer-events-auto'>
                    <Buttons
                        bg={"bg-black"}
                        text={"Visit Website"}
                        color={"text-white"}
                        link={project?.livePreview}
                    />
                </div>
            }
        </>
    )
}
