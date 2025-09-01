"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BlogCard from "./BlogCard";
import Buttons from "./Buttons";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { IoIosStar } from "react-icons/io";
import Image from "next/image";

const testimonialdata = [
  {
    profile: "D",
    name: "Daniel Poll",
    brand: "Noramble",
    review: "I’ve been working with Andy and the MadeByShape team for around 12 months now. They’ve been nothing shy of perfect. The team completely designed and rebuilt my website using CraftCMS which has been such a positive change against my old website in WordPress. Can’t recommend Shape enough",
  },
  {
    profile: "D",
    name: "Daniel Poll",
    brand: "Noramble",
    review: "I’ve been working with Andy and the MadeByShape team for around 12 months now. They’ve been nothing shy of perfect. The team completely designed and rebuilt my website using CraftCMS which has been such a positive change against my old website in WordPress. Can’t recommend Shape enough",
  },
  {
    profile: "D",
    name: "Daniel Poll",
    brand: "Noramble",
    review: "I’ve been working with Andy and the MadeByShape team for around 12 months now. They’ve been nothing shy of perfect. The team completely designed and rebuilt my website using CraftCMS which has been such a positive change against my old website in WordPress. Can’t recommend Shape enough",
  },
  {
    profile: "D",
    name: "Daniel Poll",
    brand: "Noramble",
    review: "I’ve been working with Andy and the MadeByShape team for around 12 months now. They’ve been nothing shy of perfect. The team completely designed and rebuilt my website using CraftCMS which has been such a positive change against my old website in WordPress. Can’t recommend Shape enough",
  },
];

export default function Testimonials({title, buttonText, buttonLink, image}) {
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
                {!image && (
                  <>
                  <div className="bg-black | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                  <div className="font-light text-sm  text-black | dark:text-white">
                  Blog
                  </div>
                  </>
                  )}
                    {image && <Image src={image} width={250} height={250} alt={image} className=""></Image>}
                </div>
                <h2 className="text-2xl | md:text-3xl | xl:text-[40px] font-medium tracking-tight text-black  | dark:text-white leading-[1.2] text-balance max-w-xs | lg:max-w-sm">
                  {title || "The latest from our design studio"}
                </h2>
                <Buttons
                  bg={"bg-[#d0ff71]"}
                  text={buttonText}
                  color={"text-black"}
                  link={buttonLink}
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
                  640: { slidesPerView: 1.1 },
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 1.5 }, // 2.5 = 2 full + 1 half visible
                  1440: { slidesPerView: 2.2 }, // 2.5 = 2 full + 1 half visible
                }}
                grabCursor
              >
                {testimonialdata.map((items, i) => (
                  <SwiperSlide key={i}>
                        <div className="px-2 | lg:px-3 xl:px-4 flex h-auto">
                            <div className="bg-gray-50 rounded-2xl w-full flex flex-col items-start justify-between p-6 | lg:rounded-3xl lg:p-10 | dark:bg-gray-800">
                                <div className="w-full mb-5 | lg:mb-10">
                                    <div className="mb-5 flex space-x-1 text-black | lg:mb-10 | dark:text-white">
                                        <IoIosStar className="w-5 h-5"/>
                                        <IoIosStar className="w-5 h-5"/>
                                        <IoIosStar className="w-5 h-5"/>
                                        <IoIosStar className="w-5 h-5"/>
                                        <IoIosStar className="w-5 h-5"/>
                                    </div>
                                    <div className="leading-7 text-sm lg:text-base font-normal | lg:text-md | dark:text-gray-200">
                                        {items.review}
                                    </div>
                                </div>
                                <div className="flex items-end space-x-2 | lg:space-x-3">
                                    <div className="w-9 h-9 rounded-md | lg:w-12 lg:h-12 lg:rounded-lg overflow-hidden relative bg-[#d0ff71] flex items-center justify-center">
                                        <div className="text-xl mt-px dark:text-black font-medium">{items.profile}</div>
                                    </div>
                                    <div className="leading-tight tracking-tight">
                                        <div className="text-black | dark:text-white">{items.name}</div>
                                        <div className="font-light text-xs | lg:text-sm text-gray-600 | dark:text-gray-200">
                                            {items.brand}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
