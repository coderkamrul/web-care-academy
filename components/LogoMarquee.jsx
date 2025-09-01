"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";

const LogoMarquee = ({ logos, direction = "left", speed = 6000 }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      allowTouchMove={false} // disable drag
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: direction === "right",
      }}
      speed={speed} // slow + smooth
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
      }}
      className="w-full"
    >
      {logos.map((logo, index) => (
        <SwiperSlide
          key={index}
          className="flex items-center justify-center px-4"
        >
          <div className="w-full flex items-center justify-center overflow-hidden rounded-2xl transform-gpu bg-white h-28 lg:rounded-3xl lg:h-40 2xl:h-44 dark:bg-grayDark-600">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-12 relative  md:h-12 md:px-14 lg:px-14 2xl:px-16 2xl:h-14">
                <Image
                  src={logo}
                  alt={`logo-${index}`}
                  className="object-contain px-8 pointer-events-none select-none"
                  draggable="false"
                  fill
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LogoMarquee;
