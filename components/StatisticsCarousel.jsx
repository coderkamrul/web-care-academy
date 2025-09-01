"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const StatisticCard = ({ title, value, description }) => {
  const [displayValue, setDisplayValue] = useState(
    typeof value === "number" ? 0 : value
  );

  useEffect(() => {
    if (typeof value !== "number") return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setDisplayValue(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="px-2 lg:px-3 xl:px-4 w-full">
      <h3 className="text-lg md:text-xl font-medium tracking-tight text-black dark:text-white leading-tighter border-b border-gray-200 pb-5 mb-5 dark:border-gray-500">
        {title}
      </h3>
      <div className="text-8xl text-black dark:text-white font-medium leading-none tracking-tight">
        {typeof value === "number"
          ? `${displayValue.toLocaleString()}+`
          : value}
      </div>
      <p className="text-xs lg:text-sm text-gray-700 dark:text-gray-200 font-normal leading-6 mt-3">
        {description}
      </p>
    </div>
  );
};

const StatisticsCarousel = () => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const statistics = [
    {
      id: 1,
      title: "Clients",
      value: 250,
      description:
        "With over a decade of experience, Shape is an energetic, fresh and vibrant team offering creative talent and industry knowledge.",
    },
    {
      id: 2,
      title: "Referrals",
      value: 55,
      description:
        "Over 55% of our projects are referrals from clients already with us. Our clients love to spread the love far and wide.",
    },
    {
      id: 3,
      title: "Male:Female ratio",
      value: "46:46",
      description:
        "In a male-dominated industry, we are proud to say we’re striving for equal gender roles at Shape.",
    },
    {
      id: 4,
      title: "Burritos consumed",
      value: "189",
      description:
        "We’re not lying. We love a burrito and know a good one when we try it. Our favourite spot is Panchos (not an ad, we wish)",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          640: { slidesPerView: 2 }, // tablet
          1024: { slidesPerView: 3 }, // laptop
          1280: { slidesPerView: 4, allowTouchMove: false }, // desktop no drag
        }}
      >
        {statistics.map((stat) => (
          <SwiperSlide key={stat.id}>
            <StatisticCard {...stat} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Buttons: only for mobile, tablet, laptop */}
      <div className="flex justify-left gap-4 mt-5 xl:hidden">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          className={`w-10 h-10 cursor-pointer flex items-center justify-center rounded-full shadow 
            ${isBeginning ? "bg-gray-100 dark:bg-gray-700 text-gray-400 shadow-none" : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"}`}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
          className={`w-10 h-10 flex cursor-pointer items-center justify-center rounded-full shadow 
            ${isEnd ? "bg-gray-100 dark:bg-gray-700 text-gray-400 shadow-none" : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"}`}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default StatisticsCarousel;
