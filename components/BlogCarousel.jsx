"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BlogCard from "./BlogCard";
import Buttons from "./Buttons";
import { ArrowLeft, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    image: "/images/blog-1.png",
    user: "/images/user-1.png",
    read: "2 min read",
    title: "How to Build a Strong Brand Identity",
    description:
      "Learn the essentials of creating a strong and memorable brand identity.",
  },
  {
    image: "/images/blog-1.png",
    user: "/images/user-1.png",
    read: "4 min read",
    title: "Mastering Next.js for Scalable Web Apps",
    description:
      "A deep dive into building production-ready web applications with Next.js.",
  },
  {
    image: "/images/blog-1.png",
    user: "/images/user-1.png",
    read: "3 min read",
    title: "SEO Strategies That Actually Work in 2025",
    description:
      "Stay ahead with the latest SEO techniques that bring real results.",
  },
  {
    image: "/images/blog-1.png",
    user: "/images/user-1.png",
    read: "2 min read",
    title: "The Future of Web Design Trends",
    description:
      "A glimpse into upcoming design trends and how they will shape the web.",
  },
];

export default function BlogCarousel({title}) {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    

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
    <section>
      <div className="w-full pb-20 | lg:pb-24 | 2xl:pb-32">
        <div className="pl-2 | sm:pl-6 | xl:pl-12 | 2xl:pl-40">
          <div className="w-full flex flex-wrap justify-between">
            <div className="px-2 | lg:px-3 | xl:px-4 inline-flex flex-row items-end justify-between w-full mb-10 | md:pr-6 | lg:pr-0 lg:flex-col lg:items-start lg:justify-between lg:w-4/16 lg:mb-0 | 2xl:w-4/16">
              <div className="flex flex-col space-y-3 | lg:space-y-5 items-start">
                <div className="inline-flex items-center space-x-2  ">
                  <div className="bg-black | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                  <div className="font-light text-sm  text-black | dark:text-white">
                    Blog
                  </div>
                </div>
                <h2 className="text-2xl | md:text-3xl | xl:text-[40px] font-medium tracking-tight text-black  | dark:text-white leading-[1.2] text-balance max-w-xs | lg:max-w-sm">
                  {title || "The latest from our design studio"}
                </h2>
                <Buttons
                  bg={"bg-[#d0ff71]"}
                  text={"View the blog"}
                  color={"text-black"}
                  link={"/blog"}
                />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  ref={prevRef}
                  className={`w-10 h-10 rounded-full inline-flex items-center justify-center 
            bg-gray-100 dark:bg-white dark:text-black
            ${
              isBeginning
                ? "opacity-50 pointer-events-none"
                : "cursor-pointer xl:hover:bg-[#d0ff71]"
            }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  ref={nextRef}
                  className={`w-10 h-10 rounded-full inline-flex items-center justify-center 
            bg-gray-100 dark:bg-white dark:text-black
            ${
              isEnd
                ? "opacity-50 pointer-events-none"
                : "cursor-pointer xl:hover:bg-[#d0ff71]"
            }`}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="w-full | lg:w-12/16">
              <Swiper
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={1.2}
                onBeforeInit={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                breakpoints={{
                  640: { slidesPerView: 1.5 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 2.5 }, // 2.5 = 2 full + 1 half visible
                }}
                grabCursor
              >
                {blogPosts.map((blog, i) => (
                  <SwiperSlide key={i}>
                    <BlogCard
                      image={blog.image}
                      user={blog.user}
                      read={blog.read}
                      title={blog.title}
                      description={blog.description}
                      url={blog.url}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
