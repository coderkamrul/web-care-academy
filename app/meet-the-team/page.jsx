import BlogCarousel from '@/components/BlogCarousel';
import Buttons from '@/components/Buttons';
import ProjectTeam from '@/components/ProjectTeam';
import TeamCard from '@/components/TeamCard'
import TeamCarousel from '@/components/TeamCarousel';
import React from 'react'

const teamMembers = [
  {
    name: "Natasia Rubin",
    designation: "Content Writer",
    profileImage: "/images/Profile.png",
    galleryImages: [
      "/images/blog-1.png",
      "/images/design-1.png",
      "/images/design-2.png",
    ],
    profileUrl: "/about/natasia-rubin",
    linkedin: "https://www.linkedin.com/in/natasiarubin/",
  },
  {
    name: "Jane Doe",
    designation: "UI/UX Designer",
    profileImage: "/images/Profile.png",
    galleryImages: [
      "/images/blog-1.png",
      "/images/design-3.png",
      "/images/design-4.png",
    ],
    profileUrl: "/about/jane-doe",
    linkedin: "https://www.linkedin.com/in/jane-doe/",
  },
  {
    name: "John Smith",
    designation: "Web Developer",
    profileImage: "/images/Profile.png",
    galleryImages: [
      "/images/blog-1.png",
      "/images/blog-1.png",
      "/images/blog-1.png",
    ],
    profileUrl: "/about/john-smith",
    linkedin: "https://www.linkedin.com/in/john-smith/",
  },
  {
    name: "Emily Brown",
    designation: "Marketing Specialist",
    profileUrl: "/about/emily-brown",
    linkedin: "https://www.linkedin.com/in/emily-brown/",
  },
  {
    name: "Emily Brown",
    designation: "Marketing Specialist",
    profileImage: "/images/Profile.png",
    galleryImages: [
      "/images/blog-1.png",
      "/images/blog-1.png",
      "/images/blog-1.png",
    ],
    profileUrl: "/about/emily-brown",
    linkedin: "https://www.linkedin.com/in/emily-brown/",
  },
  {
    name: "Emily Brown",
    designation: "Marketing Specialist",
    profileImage: "/images/Profile.png",
    profileUrl: "/about/emily-brown",
  },
];

export default function page() {
  return (
    <div>
        <div className='w-full pt-20 pb-10 | lg:pt-32 lg:pb-16 | xl:pt-40'>
            <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                <div className='w-full flex flex-wrap'>
                    <div className='px-2 | lg:px-3 | xl:px-4 w-full flex flex-col items-center'>
                        <div className='flex flex-col space-y-3 | lg:space-y-5 items-center text-center'>
                            <h1 className='inline-flex items-center space-x-2  '>
                                <div className="bg-black | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                                <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">Meet the Team</div>
                            </h1>
                            <h2 className='text-2-5xl | md:text-3xl | lg:text-4xl | 2xl:text-6xl font-medium tracking-tight text-black  | dark:text-gray-100 leading-tight text-balance text-center max-w-xl | md:max-w-md | xl:max-w-3xl'>Experts at Branding, Websites and SEO</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full '>
            <div className='w-full pb-20 | lg:pb-24 | 2xl:pb-40'>
                <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                    <div className='w-full flex flex-wrap'>
                        <div className='w-full grid gap-4 | lg:gap-6 | xl:gap-8 grid-cols-2 | md:grid-cols-3 | xl:grid-cols-4'>
                            {/* Team Member */}
                            {teamMembers.map((member, index) => (
                              <TeamCard key={index} member={member} />
                            ))}
                            <div className='w-full aspect-3/4 bg-[#d0ff71] rounded-2xl relative | lg:rounded-3xl'>
                                <div className='absolute top-0 left-0 w-full h-full flex flex-col'>
                                    <div className='flex-1 flex items-center justify-center'>
                                        <h2 className="text-1xl | md:text-1xl | lg:text-3xl | xl:text-4xl font-medium tracking-tight text-black leading-none text-balance text-center max-w-1xs px-5">This could be you...</h2>
                                    </div>
                                    <div className='w-full py-6 flex justify-center'>
                                        <div className='hidden | lg:inline-flex'>
                                            <Buttons
                                                bg={"bg-black"}
                                                text={"Browse positions"}
                                                color={"text-white"}
                                                link={"/careers"}
                                            />
                                        </div>
                                        <div className='lg:hidden'>
                                            <Buttons
                                                bg={"bg-black"}
                                                text={"APply Now"}
                                                color={"text-white"}
                                                link={"/careers"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Team Member */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Project Team  */}
      <section>
        <div className="w-full pb-20 | lg:pb-24 | 2xl:pb-40">
          <div className="pl-2 | sm:pl-6 | xl:pl-12 | 2xl:pl-40">
            <div className="w-full flex flex-wrap justify-end mb-10 pr-2 | sm:pr-6 | xl:pr-12 | 2xl:pr-40">
              <div className="px-2 | lg:px-3 | xl:px-4 w-full flex justify-between items-end | lg:w-2/3 | xl:w-8/16">
                <div className="flex flex-col space-y-3 | lg:space-y-5 items-start">
                  <div className="inline-flex items-center space-x-2  ">
                    <div className="bg-black | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                    <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">
                      Hear it from our team
                    </div>
                  </div>
                  <h2 className="text-2xl | md:text-3xl | xl:text-4xl | 2xl:text-5xl font-medium tracking-tight text-black  | dark:text-gray-100  text-balance max-w-lg | xl:max-w-none">
                    Meet the people who will be working on your project
                  </h2>
                </div>
              </div>
            </div>
            <div className="w-full | lg:pr-6 xl:pr-12 2xl:pr-40">
              <ProjectTeam />
            </div>
          </div>
        </div>
      </section>
        <BlogCarousel title={"Articles from inside the studio"} />
    </div>
  )
}
