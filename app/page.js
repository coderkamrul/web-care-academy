"use client";
import Buttons from "@/components/Buttons";
import ButtonSecondary from "@/components/ButtonSecondary";
import ExpertiseCard from "@/components/ExpertiseCard";
import LogoCarousel from "@/components/LogoCarousel";
import ProjectCard from "@/components/ProjectCard";
import { IoMdPlay } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import {React, useState } from "react";
import Marquee from "@/components/Marquee";
import BlogCarousel from "@/components/BlogCarousel";
import VideoModal from "@/components/Modal";

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const [modalVideoUrl, setModalVideoUrl] = useState(null);

  const cards = [
    {
      image: "/images/brand-identity.png",
      text: "Brand Identity",
      link: "/brandidentity",
    },
    {
      image: "/images/brand-identity.png",
      text: "UI/UX Design",
      link: "/uiux",
    },
    {
      image: "/images/brand-identity.png",
      text: "Development",
      link: "/development",
    },
    {
      image: "/images/brand-identity.png",
      text: "Marketing",
      link: "/marketing",
    },
    {
      image: "/images/brand-identity.png",
      text: "Strategy",
      link: "/strategy",
    },
  ];
  return (
    <>
      <VideoModal
        videoUrl={modalVideoUrl}
        isOpen={!!modalVideoUrl}
        onClose={() => setModalVideoUrl(null)}
      />
      {/* Hero  */}
      <main className="w-full pt-20 pb-10 | lg:pt-32 lg:pb-16 | xl:pt-40">
        <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40 | 3xl:px-40 | 4xl:px-60">
          <div className="w-full relative flex flex-wrap">
            {/* Video Card  */}
            <div className="absolute top-0 right-0 flex h-full z-20 py-4 px-6 | lg:py-6 lg:px-10">
              <div className="sticky bottom-6 left-0 self-end">
                <button
                  onClick={() =>
                    setModalVideoUrl("https://youtu.be/gWz_HMuqDIE")
                  }
                  className="w-auto relative inline-flex items-center rounded-full py-1.5 pl-1.5 pr-8 transition-none group cursor-pointer text-left"
                >
                  <div className="absolute top-0 left-0 w-full h-full z-0 rounded-full bg-white | dark:bg-black"></div>
                  <div className="w-14 h-14  mr-3 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden relative z-20 transform transition-all duration-400 left-0 | lg:group-hover:translate-x-47 | dark:bg-black">
                    <Image
                      src="/images/cta-video.png"
                      alt="Video CTA"
                      width={56}
                      height={56}
                      loading="lazy"
                      className="w-14 h-14 object-cover"
                    />
                  </div>
                  <div className="tracking-tight leading-tight relative z-10 transform transition duration-500 | lg:group-hover:-translate-x-12">
                    <div className="dark:text-gray-100 text-sm">
                      Hear from Shahin
                    </div>
                    <div className="font-light text-gray-700 | dark:text-gray-300 text-sm">
                      Founder of Web Care
                    </div>
                  </div>
                </button>
              </div>
            </div>
            {/* Video Background  */}
            <div className="px-2 | lg:px-3 | xl:px-4 w-full relative">
              <div className="w-full relative rounded-2xl transform-gpu overflow-hidden aspect-9/16 bg-gray-50 | md:aspect-1/1 | dark:bg-black lg:rounded-3xl lg:aspect-16/9">
                <video
                  className="w-full h-full object-cover lg:hidden block"
                  playsInline
                  autoPlay
                  loop
                  muted
                  loading="lazy"
                >
                  <source
                    src="/images/showreel-2024-portrait_cropped.mp4"
                    type="video/mp4"
                    className="max-w-[1023px]"
                  />
                  Your browser does not support the video tag.
                </video>
                <video
                  className="w-full h-full object-cover lg:block hidden"
                  playsInline
                  autoPlay
                  loop
                  muted
                  loading="lazy"
                >
                  <source
                    src="/images/shape-showreel-dasktop.mp4"
                    type="video/mp4"
                    className="max-w-[1023px]"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            {/* Left Side heading section  */}
            <div className="px-2 | lg:px-3 | xl:px-4 absolute -left-3 top-0 z-20 flex flex-col items-start pb-8 w-auto | lg:left-20 | xl:left-40">
              <div className="w-20 bg-white h-40 absolute top-0 left-5 z-10 transform -translate-x-full | lg:w-44 | dark:bg-black"></div>
              <svg
                id="Layer_1"
                className="w-10 h-10 text-white z-30 fill-current absolute top-40 left-3 -mt-px ml-px transform -translate-x-full xl:left-4 dark:text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
              >
                <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
              </svg>
              <svg
                id="Layer_1"
                className="w-10 h-10 text-white z-30 fill-current absolute -mt-px -ml-px top-40 -left-17 xl:-left-36 dark:text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
              >
                <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
              </svg>
              {/* top hiya  */}
              <div className="w-full bg-white | dark:bg-black">
                <div className="inline-flex items-center space-x-2  relative z-20 mb-3 px-3 mt-px | lg:px-6 ">
                  <div className="bg-gray-600 | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                  <div className="font-light text-xs | lg:text-sm text-gray-600 | dark:text-white">
                    Hiya, we’re Shape
                  </div>
                  <div className="inline-flex animate-waving origin-bottom-right">
                    👋
                  </div>
                </div>
              </div>
              {/* heading  */}
              <div className="w-auto relative">
                <svg
                  id="Layer_1"
                  className="w-9 h-9 lg:w-10 lg:h-10 text-white z-30 fill-current absolute -mt-px top-0.5 right-px transform -translate-y-10 translate-x-full dark:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                >
                  <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                </svg>
                <div className="w-auto relative">
                  <div className="relative">
                    <h1 className="[filter:url(#goo)] inline font-normal text-[32px] | sm:text-4xl | md:text-6xl | xl:text-6xl | 2xl:text-7xl leading-none tracking-tight text-black | dark:text-white bg-white | dark:bg-black pt-16 pb-3 ">
                      <span className=" flex-shrink-0 truncate inline relative pl-3  | lg:pl-5 z-2">
                        A web design and&nbsp;&nbsp;
                        <br />
                      </span>
                      <span className=" flex-shrink-0 truncate inline relative pl-3 | lg:pl-5 z-1">
                        branding agency&nbsp;&nbsp; <br />
                      </span>
                      <span className=" flex-shrink-0 truncate inline relative pl-3 | lg:pl-5 z-0">
                        in Bangladesh&nbsp;&nbsp; <br />
                      </span>
                    </h1>
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
              </div>
              {/* buttons section  */}
              <div className="relative bg-white rounded-b-xl pr-3 pl-3 pb-2 mt-2.5 pt-1 inline-flex | lg:rounded-b-2xl lg:pt-3 lg:mt-0 lg:pr-8 lg:pl-5 lg:pb-5 | moz--mt-4-5 | dark:bg-black">
                <svg
                  id="Layer_1"
                  className="w-10 h-10 text-white fill-white absolute -mt-px -ml-px right-px transform translate-x-full dark:text-black dark:fill-black  top-1 lg:top-3 xl:top-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  data-windows-remove="top-1|lg:top-4|xl:top-4.5"
                  data-windows-add="top-1|lg:top-3|xl:top-3"
                  data-android-remove="top-1|lg:top-4"
                  data-android-add="top-0|lg:top-4"
                >
                  <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                </svg>

                <svg
                  id="Layer_1"
                  className="w-10 h-10 text-white z-40 fill-current dark:fill-black absolute bottom-px -ml-px left-3 transform translate-y-full lg:hidden dark:text-grayDark-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                >
                  <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                </svg>
                {/* buttons  */}
                <div className="flex flex-col space-y-3 | lg:flex-row lg:space-y-0 lg:space-x-7">
                  {/* primary button  */}
                  <Buttons
                    bg={"bg-black dark:bg-gray-800"}
                    text={"View our work"}
                    color={"text-white"}
                  />
                  {/* secondary  button  */}

                  <ButtonSecondary
                    text={"Meet the team"}
                    visiblity={"hidden"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* who are we?  */}
      <section className="w-full">
        <div className="w-full overflow-hidden">
          <div className="w-full pb-20 | lg:pb-24 | 2xl:pb-42 ">
            <div className="px-0">
              <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40 w-full flex flex-wrap justify-between">
                <div className="px-2 | lg:px-3 | xl:px-4 w-full | lg:w-4/16">
                  <div className="inline-flex items-center space-x-2 mb-2 | lg:mt-4 ">
                    <div className="bg-gray-600 | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                    <div className="font-light text-sm | lg:text-sm text-gray-600 | dark:text-white">
                      Who are we?
                    </div>
                  </div>
                </div>
                {/* about text  */}
                <div className="px-2 | lg:px-3 | xl:px-4 flex flex-col items-start space-y-8 w-full | lg:w-11/16">
                  <h2 className="text-xl | md:text-[32px] | xl:text-[45px] font-medium  text-black  | dark:text-white leading-[1.3] lg:leading-[1.2] text-balance lg:indent-48">
                    <p>
                      An independent{" "}
                      <a
                        href="https://madebyshape.co.uk/web-design/"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        web design
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://madebyshape.co.uk/branding/"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        branding agency
                      </a>{" "}
                      in Bangladesh set up in 2020 who care, build
                      relationships, have industry experience, and win awards.
                    </p>
                  </h2>
                  {/* buttons  */}
                  <div className="flex flex-wrap">
                    <div className="mr-5 mb-3 w-auto | lg:mr-8">
                      <Buttons
                        bg={"bg-[#d0ff71]"}
                        text={"About Web Care"}
                        color={"text-black"}
                      />
                    </div>
                    <div className="mb-3 w-auto | lg:mr-5">
                      <ButtonSecondary
                        text={"Meet the Team"}
                        visiblity={"block"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto relative w-full | xl:w-15/16">
                <div className="w-full relative z-0 mt-10 -mb-5 | lg:mt-16 || swiper js-carousel-28 swiper-initialized swiper-horizontal swiper-pointer-events">
                  <LogoCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* our work  */}
      <section className="w-full">
        <div className="w-full pb-20 | lg:pb-24 | 2xl:pb-40 ">
          <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
            <div className="flex flex-wrap -mb-16">
              <div className="px-2 | lg:px-3 | xl:px-4 w-full mb-6 | lg:hidden">
                <div className="flex flex-col space-y-3 | lg:space-y-5 items-start">
                  <div className="inline-flex items-center space-x-2  ">
                    <div className="bg-gray-800 | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                    <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">
                      Our Work
                    </div>
                  </div>
                  <h2 className="text-4xl font-medium tracking-normal text-black  | dark:text-gray-100 leading-none text-balance max-w-sm | xl:max-w-md | 4xl:max-w-lg">
                    Take a look at our projects
                  </h2>
                </div>
              </div>
              <div className="px-2 | lg:px-3 | xl:px-4 w-full | md:w-8/16 md:mt-20">
                {/* project cards  */}
                <ProjectCard
                  video={"/images/project-1.mp4"}
                  title={"Refreshing Gary Neville's digital presence"}
                  tags={["Branding", "Website", "SEO"]}
                  category={"Gary Neville"}
                  year={"2023"}
                />
                <ProjectCard
                  image={"/images/project-2.png"}
                  title={
                    "A workplace consultancy creating inspiring environments"
                  }
                  tags={["design", "develop"]}
                  category={"Sketch Studios"}
                  year={"2024"}
                />
                <div className="w-full hidden | lg:flex">
                  <div className="w-full justify-center text-center flex mb-10">
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-2xl | md:text-3xl | xl:text-4xl | 2xl:text-5xl font-medium tracking-tight text-black  | dark:text-gray-100 leading-none text-balance mb-5">
                        Like what <br /> you see?
                      </h2>
                      <Buttons
                        bg={"bg-[#d0ff71]"}
                        text={"Contact us"}
                        color={"text-black"}
                        link={"/contact"}
                      />
                      <div className="relative overflow-hidden w-full pt-2">
                        <Image
                          src="/images/google-reviews.png"
                          alt="CTA Image"
                          width={200}
                          height={200}
                          loading="lazy"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-2 | lg:px-3 | xl:px-4 w-full | md:w-8/16 ">
                <div className="w-full justify-center mb-16 hidden | lg:flex lg:mb-20">
                  <div className="flex flex-col space-y-3 | lg:space-y-5 items-start">
                    <div className="inline-flex items-center space-x-2  ">
                      <div className="bg-gray-800 | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                      <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">
                        Our Work
                      </div>
                    </div>
                    <h2 className="text-2-5xl | md:text-3xl | lg:text-4xl | 2xl:text-6xl | 4xl:text-7xl font-medium tracking-normal text-black  | dark:text-gray-100 leading-none text-balance max-w-sm | xl:max-w-md | 4xl:max-w-lg">
                      Take a look at our projects
                    </h2>
                  </div>
                </div>
                {/* project cards  */}
                <ProjectCard
                  image={"/images/project-2.png"}
                  title={"Furniture designed to the greatest extent"}
                  tags={["design", "develop", "build"]}
                  category={"Nth Degree"}
                  year={"2024"}
                />
                <ProjectCard
                  image={"/images/project-2.png"}
                  title={"Redefining a leading global talent group"}
                  tags={["design", "develop", "build"]}
                  category={"YMU"}
                  year={"2024"}
                />
                <div className="w-full flex | lg:hidden">
                  <div className="w-full justify-center text-center flex mb-10">
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-2xl | md:text-3xl | xl:text-4xl | 2xl:text-5xl font-medium tracking-tight text-black  | dark:text-gray-100 leading-none text-balance mb-5">
                        Like what <br /> you see?
                      </h2>
                      <Buttons
                        bg={"bg-[#d0ff71]"}
                        text={"Contact us"}
                        color={"text-black"}
                        link={"/contact"}
                      />
                      <div className="relative overflow-hidden w-full pt-2">
                        <Image
                          src="/images/google-reviews.png"
                          alt="CTA Image"
                          width={200}
                          height={200}
                          loading="lazy"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise  */}
      <section className="w-full py-0">
        <div className="px-0">
          <div className="w-full py-20 | lg:py-24 | 2xl:py-32 | 4xl:py-40 bg-black  rounded-2xl transform-gpu | lg:rounded-3xl | dark:bg-[#1a1b1e]">
            <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
              <div className="w-full flex flex-wrap justify-between mb-10 | lg:mb-20">
                <div className="px-2 | lg:px-3 | xl:px-4 w-full mb-2 | lg:mb-0 lg:w-5/16">
                  <div className="inline-flex items-center space-x-2  ">
                    <div className="bg-white w-1.5 h-1.5 rounded-full"></div>
                    <div className="font-light text-sm | lg:text-base text-white">
                      Our Expertise
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap w-full | lg:w-11/16">
                  <div className="px-2 | lg:px-3 | xl:px-4 w-full mb-5 | lg:mb-0 lg:w-9/16 | xl:w-10/16">
                    <h2 className="text-2xl | md:text-3xl | xl:text-4xl | 2xl:text-5xl font-medium tracking-normal text-white leading-none text-balance max-w-xl  | xl:indent-32 | 2xl:max-w-2xl">
                      How we take your business to the next level
                    </h2>
                  </div>
                  <div className="px-2 | lg:px-3 | xl:px-4 w-full | sm:w-10/16 | lg:w-7/16 | xl:w-6/16">
                    <div className="w-full relative mb-5">
                      <p className="w-full relative mb-5 text-white">
                        We are a digital marketing agency with expertise, and
                        we’re on a mission to help you take the next step in
                        your business.
                      </p>
                    </div>
                    <Buttons
                      bg={"bg-[#d0ff71]"}
                      text={"See all services"}
                      color={"text-black"}
                      link={"/expertise"}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-wrap justify-between">
                <div className="px-2 | lg:px-3 | xl:px-4 h-auto flex w-full mt-12 order-2 | lg:order-1 lg:w-5/16">
                  <div className="w-full sticky bottom-6 self-end left-0">
                    <button
                      onClick={() => setModalVideoUrl("/images/project-1.mp4")}
                      className="w-auto cursor-pointer relative inline-flex items-center rounded-full py-1.5 pl-1.5 pr-8 transition-none group text-left"
                    >
                      <div className="absolute top-0 left-0 w-full h-full z-0 rounded-full bg-white | dark:bg-black"></div>
                      <div className="w-14 h-14  mr-3 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden relative z-20 transform transition-all duration-400 left-0 | lg:group-hover:translate-x-47 | dark:bg-black">
                        <Image
                          src="/images/cta-video.png"
                          alt="Video CTA"
                          width={56}
                          height={56}
                          loading="lazy"
                          className="w-14 h-14 object-cover"
                        />
                      </div>
                      <div className="tracking-tight leading-tight relative z-10 transform transition duration-500 | lg:group-hover:-translate-x-12">
                        <div className="dark:text-gray-100 text-sm">
                          Hear from Shahin
                        </div>
                        <div className="font-light text-gray-700 | dark:text-gray-300 text-sm">
                          Founder of Web Care
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="px-2 | lg:px-3 | xl:px-4 w-full order-1 | lg:order-2 lg:w-11/16">
                  {cards.map((card, index) => (
                    <ExpertiseCard
                      key={index}
                      {...card}
                      isActive={hoveredIndex === null || hoveredIndex === index}
                      onHover={() => setHoveredIndex(index)}
                      onLeave={() => setHoveredIndex(null)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Sharing the love  */}
      <section className="w-full relative">
        <div className="absolute -top-12 left-0 bg-black rounded-t-3xl h-80 w-full | dark:bg-[#1a1b1e]"></div>
        <div className="w-full pb-20 | lg:pb-24 | 2xl:pb-40 ">
          <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
            <div className="w-full flex flex-wrap">
              <div className="px-2 | lg:px-3 | xl:px-4 w-full relative">
                <div className="flex flex-wrap w-full relative cursor-pointer h-[595px] md:h-[80vh] lg:min-h-120">
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
                      src="/images/love.png"
                      fill
                      loading="lazy"
                      className="w-full h-full absolute top-0 left-0 object-cover object-center aspect-16/9"
                      alt="love"
                    />
                  </div>
                  <div className="flex flex-col items-start absolute top-0 left-0 rounded-2xl transform-gpu z-20 pointer-none mx-2  | md:m-6 | lg:rounded-3xl lg:m-10">
                    <div className="relative || mt-6 z-20">
                      <div className="absolute top-0 left-3 | lg:left-6 z-20 ">
                        <svg
                          className="text-black fill-current w-5 h-5 lg:left-6 lg:w-8 lg:h-8 dark:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 17 11"
                          fill="none"
                        >
                          <path d="M0 6.646C0 3.107 2.531 1.002 4.11.032c.2-.123.416.133.262.312A8.202 8.202 0 002.92 2.777 4.023 4.023 0 110 6.647zm8.955 0c0-3.539 2.531-5.644 4.11-6.613.2-.123.416.132.263.31a8.202 8.202 0 00-1.454 2.434 4.023 4.023 0 11-2.92 3.87z" />
                        </svg>
                      </div>
                      <div className="text-xl font-medium [filter:url(#goo)] | md:text-2xl | lg:text-3xl | 2xl:text-5xl leading-none tracking-tight text-black | dark:text-gray-100 bg-white | dark:bg-black py-2 | lg:py-3 inline">
                        <div className="indent-14 | lg:indent-24 hidden relative pl-3 pr-5 | lg:pl-5 ">
                          Web Care created
                          <br />
                          something better then I ever
                          <br />
                          could have imagined
                        </div>
                        <span className="pl-14 | lg:pl-24 flex-shrink-0 truncate inline relative z-2 ">
                          Web Care created&nbsp;&nbsp;
                        </span>
                        <br />
                        <span className=" flex-shrink-0 truncate inline relative pl-3 | lg:pl-5 z-1">
                          something better than I ever&nbsp;&nbsp;
                        </span>
                        <br />
                        <span className=" flex-shrink-0 truncate inline relative pl-3 | lg:pl-5 z-0">
                          could have imagined&nbsp;&nbsp;
                        </span>
                      </div>
                    </div>
                    <div className="w-auto relative bg-white rounded-xl z-10 rounded-t-none p-3 -mt-px | lg:p-4 | dark:bg-black">
                      <svg
                        className="w-8 h-8 text-white dark:text-black fill-current absolute right-px transform translate-x-full top-1.5 dark:text-grayDark-600 lg:top-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                      >
                        <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                      </svg>
                      <div className="flex items-end space-x-2 | lg:space-x-3">
                        <div className="w-9 h-9 rounded-md | lg:w-12 lg:h-12 lg:rounded-lg inline-flex overflow-hidden relative">
                          <div className="relative overflow-hidden w-full">
                            <Image
                              src="/images/client.png"
                              className="w-full absolute top-0 left-0 h-full "
                              fill
                              loading="lazy"
                              alt="client"
                            />
                          </div>
                        </div>
                        <div className="leading-tight tracking-normal">
                          <div className="text-black font-normal text-sm | dark:text-white">
                            Hannah Wessel
                          </div>
                          <div className="font-light text-[10px] | lg:text-xs text-gray-400 | dark:text-grayDark-200">
                            Co-Founder, Stoneletters
                          </div>
                        </div>
                      </div>
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
                        text={"View more testimonilas"}
                        color={"text-white"}
                        link={"/testimonials"}
                        rotateIcon={"rotate-45"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHaring  */}
      <section className="w-full pb-20 | lg:pb-24 | 2xl:pb-40">
        <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
          <div className="flex flex-wrap items-start justify-between relative z-10">
            <div className="px-2 | lg:px-3 | xl:px-4 relative w-full flex flex-wrap | lg:mb-0 lg:w-9/16 | 2xl:w-8/16">
              <div className="order-2 | lg:order-1">
                <div className="inline-flex items-center space-x-2 w-auto mb-3 | xl:absolute xl:top-2 xl:left-4 ">
                  <div className="bg-black | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                  <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">
                    Sharing the love
                  </div>
                </div>
                <div className="w-full relative xl:indent-48  lg:pr-16">
                  <h2 className="mb-3 text-pretty tracking-tight text-black | dark:text-white text-2xl md:text-3xl xl:text-4xl leading-[1.2] font-medium">
                    A web design agency in Manchester that cares about you and
                    your brand, no matter the size or what industry your
                    business is in.
                  </h2>
                </div>
              </div>
            </div>
            <div className="px-2 | lg:px-3 | xl:px-4 w-full | lg:w-7/16 ">
              <div className="w-full relative mb-10 xl:pr-10">
                <p className="text-sm xl:text-base text-gray-800 dark:text-gray-50 font-sans-primary relative z-10 text-pretty font-light leading-7 mb-6">
                  Born in 2020, Web Care Academy is an Award-Winning Web Design
                  Agency based in Manchester specialising in
                  <div className="relative group inline-block">
                    <Link
                      href="/web-design"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black"
                    >
                      Web Design
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Web Design
                    </span>
                  </div>
                  ,
                  <div className="relative group inline-block">
                    <Link
                      href="/branding"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black"
                    >
                      Branding
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Branding
                    </span>
                  </div>
                  ,
                  <div className="relative group inline-block">
                    <Link
                      href="/ecommerce"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black"
                    >
                      eCommerce
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      eCommerce
                    </span>
                  </div>
                  , Digital Marketing and
                  <div className="relative group inline-block">
                    <Link
                      href="/search-engine-optimisation"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black"
                    >
                      Organic SEO
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Organic SEO
                    </span>
                  </div>
                  .
                  <br />
                </p>

                <p className="text-sm xl:text-base text-gray-800 dark:text-gray-50 font-sans-primary relative z-10 text-pretty font-light leading-7 mb-6">
                  Our content management system of choice is
                  <div className="relative group inline-block">
                    <Link
                      href="/craft-cms"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black"
                    >
                      Craft CMS
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Craft CMS
                    </span>
                  </div>{" "}
                  rather than WordPress, allowing you to manage your website
                  pages, content and SEO easily. We're proud to be a verified
                  Craft CMS and
                  <div className="relative group inline-block">
                    <Link
                      href="/craft-commerce"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black"
                    >
                      Craft Commerce
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Craft Commerce
                    </span>
                  </div>{" "}
                  professional partner. And we build
                  <div className="relative group inline-block">
                    <Link
                      href="/shopify"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black"
                    >
                      Shopify
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shopify
                    </span>
                  </div>{" "}
                  projects every week, a super intuitive eCommerce platform for
                  clients to take their business to the next level.
                  <br />
                </p>

                <p className="text-sm xl:text-base text-gray-800 dark:text-gray-50 font-sans-primary relative z-10 text-pretty font-light leading-7 mb-6">
                  So, if you need a professional Manchester Web Design Agency to
                  support you with your branding or website design,
                  <div className="relative group inline-block">
                    <Link
                      href="/contact"
                      className="underline duration-500 rounded-md py-0.5 px-1 xl:hover:bg-primary-600 text-black dark:bg-gray-800 dark:text-gray-50 xl:hover:text-black"
                    >
                      get in touch
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      get in touch
                    </span>
                  </div>{" "}
                  with us today.
                </p>
              </div>
              <Buttons
                bg={"bg-[#d0ff71]"}
                text={"About Web Care"}
                color={"text-black"}
                link={"/about"}
              />
            </div>
          </div>
        </div>
      </section>
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

      {/* blog carousel  */}
   

      <BlogCarousel/>
    </>
  );
}
