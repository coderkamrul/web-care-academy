"use client";
import ArchedImageCarouselMobile from "@/components/ArchedImageCarouselMobile";
import BlogCarousel from "@/components/BlogCarousel";
import Buttons from "@/components/Buttons";
import LogosDoubleCarousel from "@/components/LogosDoubleCarousel";
import VideoModal from "@/components/Modal";
import ProjectTeam from "@/components/ProjectTeam";
import StatisticsCarousel from "@/components/StatisticsCarousel";
import TeamCarousel from "@/components/TeamCarousel";
import Testimonials from "@/components/Testimonials";
import VideoButton from "@/components/VideoButton";
import Image from "next/image";
import Link from "next/link";
import  { React, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { IoMdPlay } from "react-icons/io";

const images = [
  "/images/Award-1.svg",
  "/images/Award-2.svg",
  "/images/Award-2.svg",
  "/images/Award-2.svg",
  "/images/Award-2.svg",
];

export default function page() {
  const [modalVideoUrl, setModalVideoUrl] = useState(null);
  return (
    <>
      <section id="hero">
        <ArchedImageCarouselMobile />
      </section>
      <section className="w-full pt-20" id="178">
        <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
          <div className="flex flex-wrap items-start justify-between relative z-10">
            <div className="px-2 | lg:px-3 | xl:px-4 relative w-full flex flex-wrap | lg:mb-0 lg:w-9/16 | 2xl:w-8/16">
              <div className="order-2 | lg:order-1">
                <div className="inline-flex items-center space-x-2 w-auto mb-3 | xl:absolute xl:top-2 xl:left-4 ">
                  <div className="bg-black | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                  <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">
                    About us
                  </div>
                </div>
                <div className="w-full relative xl:indent-48  lg:pr-16">
                  <h2 className="mb-3 text-pretty tracking-tight text-black | dark:text-white text-2xl md:text-3xl xl:text-4xl leading-[1.2] font-medium">
                    Expert web designers and web developers trained in the
                    digital industry who offer a bespoke, professional and
                    trustworthy service.
                  </h2>
                </div>
              </div>
            </div>
            <div className="px-2 | lg:px-3 | xl:px-4 w-full | lg:w-7/16 ">
              <div className="w-full relative mb-10 xl:pr-10">
                <p className="text-sm xl:text-base text-gray-800 dark:text-gray-50 font-sans-primary relative z-10 text-pretty font-light leading-7 mb-6">
                  We are an Award-Winning
                  <div className="relative group inline-block">
                    <Link
                      href="/branding"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black hover:bg-[#d0ff71]"
                    >
                      Branding
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      Branding
                    </span>
                  </div>
                  and Web Design Agency based in Manchester, UK specialising in
                  <div className="relative group inline-block">
                    <Link
                      href="/web-design"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black hover:bg-[#d0ff71]"
                    >
                      Web Design
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      Web Design
                    </span>
                  </div>
                  Web Development
                  <div className="relative group inline-block">
                    <Link
                      href="/eCommerce"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black hover:bg-[#d0ff71]"
                    >
                      eCommerce
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      eCommerce
                    </span>
                  </div>
                  and
                  <div className="relative group inline-block">
                    <Link
                      href="/seo"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black hover:bg-[#d0ff71]"
                    >
                      Organic SEO
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      Organic SEO
                    </span>
                  </div>
                  .
                  <br />
                </p>

                <p className="text-sm xl:text-base text-gray-800 dark:text-gray-50 font-sans-primary relative z-10 text-pretty font-light leading-7 mb-6">
                  With over a decade of experience, Shape is an energetic, fresh
                  and vibrant team offering creative talent, industry knowledge
                  and extremely high standards.
                </p>
                <p className="text-sm xl:text-base text-gray-800 dark:text-gray-50 font-sans-primary relative z-10 text-pretty font-light leading-7 mb-6">
                  We work with ambitious start-up businesses through to large
                  global organisations such as Blackberry, NHS and L'Occitane so
                  we can tailor our services to suit your needs. Our preferred
                  content management system of choice is
                  <div className="relative group inline-block">
                    <Link
                      href="/cms"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black hover:bg-[#d0ff71]"
                    >
                      Craft CMS
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      Craft CMS
                    </span>
                  </div>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* award  */}
      <div className="w-full py-10 lg:py-16">
        <div className="px-2 sm:px-6 xl:px-12 2xl:px-40 4xl:px-60">
          <div className="w-full flex flex-wrap justify-center -mb-12 lg:mb-0 md:justify-between">
            {images.map((src, index) => {
              return (
                <div
                  key={index}
                  className="px-2 lg:px-3 xl:px-4 relative inline-flex justify-center items-center mb-8 md:mb-14 lg:mb-0 w-1/3 md:w-36 xl:w-56 2xl:w-64"
                >
                  <div className="px-4 relative lg:px-0">
                    {/* Replace with your image */}
                    <Image
                      src={src}
                      alt="Design Image"
                      width={124} // adjust as needed
                      height={124} // adjust as needed
                      className="rounded-2xl object-cover dark:invert"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <VideoButton />
      <section>
        <div className="w-full pb-20 | lg:pb-24 | 2xl:pb-32 | 4xl:pb-40 bg-white | dark:bg-black">
          <div className="px-0">
            <div className="w-full flex flex-wrap">
              <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40 w-full flex flex-wrap justify-center mb-10">
                <div className="px-2 | lg:px-3 | xl:px-4 w-full flex flex-wrap justify-center">
                  <div className="flex flex-col space-y-3 | lg:space-y-5 items-center text-center">
                    <div className="inline-flex items-center space-x-2">
                      <div className="bg-black | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                      <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">
                        Our Team
                      </div>
                    </div>
                    <h2 className="text-2xl | md:text-3xl | xl:text-4xl | 4xl:text-5xl font-medium tracking-tight text-black  | dark:text-white leading-none text-balance">
                      Multiple personalities,
                      <br />
                      No egos.
                    </h2>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full">
                  <TeamCarousel />
                </div>
              </div>
              <div className="px-2 | lg:px-3 | xl:px-4 w-full flex justify-center mt-10 | lg:mt-16">
                <Buttons
                  bg={"bg-[#d0ff71]"}
                  color={"text-black"}
                  text="Meet the whole Team"
                  link="/team"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Statistics */}
      <section className="w-full pb-20 | lg:pb-24 | 2xl:pb-40">
        <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
          <div className="w-full">
            <StatisticsCarousel />
          </div>
        </div>
      </section>

      {/* logosDoubleCarousel */}
      <LogosDoubleCarousel />

      {/* VideoCard  */}
      <VideoModal
        videoUrl={modalVideoUrl}
        isOpen={!!modalVideoUrl}
        onClose={() => setModalVideoUrl(null)}
      />
      {/* Video modal */}
      <section className="w-full relative">
        <div className="w-full pb-20 | lg:pb-24 | 2xl:pb-40 ">
          <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
            <div className="w-full flex flex-wrap">
              <div className="px-2 | lg:px-3 | xl:px-4 w-full relative">
                <div className="flex flex-wrap w-full relative cursor-pointer h-[595px] md:h-[70vh] lg:min-h-120">
                  <button
                    onClick={() => setModalVideoUrl("/images/project-1.mp4")}
                    className="absolute top-0 left-0 w-full h-full z-20 group cursor-pointer"
                  >
                    <div className="sr-only">Play video</div>
                    <div className="absolute top-0 left-0 w-full h-full flex p-6 | lg:p-10 items-end justify-start ">
                      <div className="flex-shrink-0 rounded-full bg-[#d0ff71] flex items-center justify-center transition-transform transform | xl:group-hover:scale-110 w-14 h-14 | md:w-16 md:h-16">
                        <IoMdPlay className="w-3 h-3 | md:w-4 md:h-4 text-black" />
                      </div>
                    </div>
                  </button>
                  <div className="w-full h-full absolute top-0 left-0 rounded-2xl transform-gpu bg-gray-50 overflow-hidden | dark:bg-gray-400 | lg:rounded-3xl ">
                    <Image
                      src="/images/video-card-about.png"
                      layout="fill"
                      className="w-full h-full absolute top-0 left-0 object-cover object-center aspect-16/9"
                      alt="love"
                    />
                  </div>
                  <div className="flex flex-col items-start absolute top-4 lg:top-0 left-0 rounded-2xl transform-gpu z-20 pointer-none mx-2  | md:m-6 | lg:rounded-3xl lg:m-10">
                    <div className="relative ">
                      <div className="w-full relative z-10 mb-3 lg:mb-4 xl:mb-5">
                        <div className="w-3 h-7 bg-white absolute bottom-0 left-0 z-20 transform translate-y-1/2 | dark:bg-black"></div>
                        <div className="w-auto inline-flex pt-1 px-4 rounded-xl rounded-b-none relative | lg:pt-2 lg:rounded-xl lg:rounded-b-none || bg-white | dark:bg-black">
                          <div className="inline-flex items-center space-x-2  ">
                            <div className="bg-gray-600 | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                            <div className="font-light text-sm lg:text-base text-black | dark:text-gray-100">
                              Behind the scenes
                            </div>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            className="w-6 h-6 text-white fill-current absolute right-0 transform translate-x-full rotate-180 | lg:w-6 lg:h-6 dark:text-black -bottom-px"
                          >
                            <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                          </svg>
                        </div>
                      </div>
                      <h2 className="[filter:url(#goo)] text-2xl | md:text-2xl | lg:text-4xl | 2xl:text-5xl | 4xl:text-6xl leading-none tracking-tight text-black | dark:text-white bg-white | dark:bg-black py-2 | lg:py-3 || -mt-4.5 inline font-medium">
                        <span className="flex-shrink-0 truncate inline relative pl-3 | lg:pl-5  ">
                          Our team workation&nbsp;&nbsp;
                          <br />
                        </span>
                        <div className="text-gray-600 | dark:text-gray-200 flex-shrink-0 truncate inline relative px-3 | lg:px-5">
                          Watch now
                        </div>
                      </h2>
                      <svg
                        width="0"
                        height="0"
                        className="absolute hidden"
                        colorInterpolationFilters="sRGB"
                      >
                        <defs>
                          <filter id="goo">
                            <feGaussianBlur
                              in="SourceGraphic"
                              stdDeviation="6"
                              result="blur"
                            />
                            <feColorMatrix
                              in="blur"
                              type="matrix"
                              values="1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 19 -9"
                              result="goo"
                            />
                            <feComposite
                              in="SourceGraphic"
                              in2="goo"
                              operator="atop"
                            />
                          </filter>
                        </defs>
                      </svg>

                      <svg
                        width="0"
                        height="0"
                        className="absolute hidden"
                        colorInterpolationFilters="sRGB"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <filter id="goo">
                            <feGaussianBlur
                              in="SourceGraphic"
                              stdDeviation="6"
                              result="blur"
                            />
                            <feColorMatrix
                              in="blur"
                              type="matrix"
                              values="1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 19 -9"
                              result="goo"
                            />
                            <feComposite
                              in="SourceGraphic"
                              in2="goo"
                              operator="atop"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 z-30 pl-4 pt-4 flex-shrink-0 rounded-tl-2xl bg-white | lg:rounded-tl-3xl | dark:bg-black">
                    <svg
                      className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute -bottom-px left-px transform -translate-x-full rotate-180 dark:text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                    >
                      <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                    </svg>

                    <svg
                      className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute top-px -right-px transform -translate-y-full rotate-180 dark:text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                    >
                      <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                    </svg>

                    <div className="inline-flex flex-col items-start  | lg:flex-row  lg:space-x-6">
                      <div className="hidden lg:block">
                        <Buttons
                          onClick={() =>
                            setModalVideoUrl("https://youtu.be/gWz_HMuqDIE")
                          }
                          bg={"bg-[#d0ff71]"}
                          text={"Play video"}
                          color={"text-black"}
                          icon={<IoMdPlay className="w-3 h-3 text-black" />}
                          rotateIcon={"rotate-0"}
                        />
                      </div>
                      <Buttons
                        bg={"bg-black dark:bg-[#26282c]"}
                        text={"Follow Andy on"}
                        color={"text-white"}
                        link={"/testimonials"}
                        rotateIcon={"rotate-45"}
                        Texticon={<FaLinkedin className="w-4 h-4 text-white" />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Testimonials  */}
      <Testimonials
        buttonText="Read more Reviews"
        buttonLink="/reviews"
        image="/images/g-review.png"
        title="People love us, and we love them"
      />

      {/* Our culture  */}
      <div className="w-full pb-20 | lg:pb-24 | 2xl:pb-40">
        <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
          <div className="w-full flex lg:justify-between flex-col | lg:flex-row">
            <div className="px-2 | lg:px-3 | xl:px-4 relative w-full mb-10  inline-flex | lg:mb-0 lg:w-8/16">
              <div className="w-full relative aspect-1/1 | md:aspect-16/9 | lg:pb-0 lg:h-full">
                <div className="bg-white rounded-tl-2xl absolute bottom-0 right-0 z-20 w-32 h-14 | lg:rounded-tl-3xl lg:h-20 | dark:bg-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="absolute top-px -right-px w-10 h-10 lg:w-12 lg:h-12 fill-current text-white transform -translate-y-full rotate-180 dark:text-black"
                  >
                    <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="absolute -bottom-px left-px w-10 h-10 lg:w-12 lg:h-12 fill-current text-white transform -translate-x-full rotate-180 dark:text-black"
                  >
                    <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                  </svg>
                </div>
                <div className="w-full h-full rounded-2xl transform-gpu overflow-hidden absolute top-0 left-0 bg-gray-50 | dark:bg-black | lg:rounded-3xl">
                  <Image
                    src="/images/our-culture.png"
                    layout="fill"
                    className="w-full h-full absolute top-0 left-0 object-cover object-center"
                    alt="love"
                  />
                </div>
              </div>
            </div>
            <div className="px-2 | lg:px-3 | xl:px-4 inline-flex items-center w-full | lg:min-h-140 lg:justify-center lg:w-8/16 lg:py-20 | 2xl:min-h-160 ">
              <div className="w-full space-y-8 | lg:max-w-xl ">
                <div className="flex flex-col space-y-3 | lg:space-y-5 items-start">
                  <div className="inline-flex items-center space-x-2  ">
                    <div className="bg-black | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                    <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">
                      Our Culture
                    </div>
                  </div>
                  <h2 className="text-xl | md:text-2-5xl | xl:text-3xl | 4xl:text-4xl font-medium tracking-tight text-black  | dark:text-gray-100 leading-none text-balance">
                    We’ve created an environment where everyone feels
                    comfortable and open, but we can have a laugh along the way
                  </h2>
                </div>
                <div className="w-full relative ">
                  <p className="text-base | xl:text-md text-black dark:text-gray-200 relative z-10 text-pretty font-light leading-7  mb-6">
                    We produce good work for good people, and with the idea that
                    staff and the client will be happy throughout the full
                    process. This in return will bring more work our way,
                    whether that's via recommendation or further work from that
                    client.
                  </p>
                </div>
                <div className="w-full relative ">
                  <div className="w-full bg-[#d0ff71] rounded-2xl relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 17 11"
                      fill="none"
                      className="absolute top-0 left-0 w-5 h-5 m-6 fill-current text-black dark:text-white"
                    >
                      <path d="M0 6.646C0 3.107 2.531 1.002 4.11.032c.2-.123.416.133.262.312A8.202 8.202 0 002.92 2.777 4.023 4.023 0 110 6.647zm8.955 0c0-3.539 2.531-5.644 4.11-6.613.2-.123.416.132.263.31a8.202 8.202 0 00-1.454 2.434 4.023 4.023 0 11-2.92 3.87z" />
                    </svg>

                    <div className="text-lg | md:text-xl  font-medium tracking-tight text-black leading-tighter text-pretty indent-14 p-6">
                      My vision has always been to look after the clients we
                      work with, but to also look after the staff just as much.
                      That will get the best results for everyone.
                    </div>
                    <div className="w-full flex flex-col items-start | lg:flex-row lg:justify-end lg:items-end">
                      <div className="flex-shrink-0 px-6 pb-4 | lg:flex-1">
                        <div className="flex items-end space-x-2 | lg:space-x-3">
                          <div className="w-9 h-9 rounded-md | lg:w-12 lg:h-12 lg:rounded-lg inline-flex overflow-hidden relative">
                            <div className="relative overflow-hidden w-full">
                              <Image
                                src="/images/andy.png"
                                alt="Picture of the author"
                                layout="fill"
                                className="object-cover object-center"
                              />
                            </div>
                          </div>
                          <div className="leading-tight tracking-tight">
                            <div className="text-black | dark:text-gray-600">
                              Andy Golpys
                            </div>
                            <div className="font-light text-xs | lg:text-sm text-gray-600 | dark:text-gray-300">
                              Co-Founder
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white pl-3 items-end justify-end relative rounded-tl-2xl flex-1 inline-flex w-24 pt-10 -mt-8 ml-auto | lg:w-auto lg:pt-3 lg:flex-none lg:rounded-tl-3xl lg:mt-0 lg:h-auto lg:ml-0 | dark:bg-black">
                        <svg
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100"
                          xmlSpace="preserve"
                          className="w-8 h-8 lg:w-10 lg:h-10 text-white fill-current absolute -bottom-px left-px transform -translate-x-full rotate-180 dark:text-black"
                        >
                          <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                        </svg>

                        <svg
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100"
                          xmlSpace="preserve"
                          className="w-8 h-8 lg:w-10 lg:h-10 text-white fill-current absolute top-px -right-px transform -translate-y-full rotate-180 dark:text-black"
                        >
                          <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                        </svg>

                        <div className="w-full hidden | lg:block">
                          <Buttons
                            link="/culture"
                            bg={"bg-black dark:bg-[#26282c]"}
                            text={"Learn about our culture"}
                            color={"text-white"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blogs  */}
      <BlogCarousel title={"Latest from our studio"} />
    </>
  );
}
