"use client";
import { useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';

const LogoCarousel = () => {
  useEffect(() => {
    new Swiper('.js-carousel', {
      modules: [Autoplay],
      loop: true,
      slidesPerView: 4,
      spaceBetween: 10,
      speed: 8000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      centeredSlides: false,
      allowTouchMove: true,
      breakpoints: {
        640: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      },
    });
  }, []);

  const logos = [
    { id: 0, content: <Image src="/images/logo-1.svg" alt='4' width={100} height={100} className="dark:invert w-12 lg:w-32 h-auto"/> },
    { id: 1, content: <Image src="/images/logo-2.svg" alt='4' width={100} height={100} className="dark:invert w-12 lg:w-32 h-auto"/> },
    { id: 2, content: <Image src="/images/logo-7.svg" alt='4' width={100} height={100} className="dark:invert w-12 lg:w-32 h-auto"/> },
    { id: 3, content: <Image src="/images/logo-6.svg" alt='4' width={100} height={100} className="dark:invert w-12 lg:w-32 h-auto"/> },
    { id: 4, content: <Image src="/images/logo-5.svg" alt='4' width={100} height={100} className="dark:invert w-12 lg:w-32 h-auto"/> },
    { id: 5, content: <Image src="/images/logo-4.svg" alt='4' width={100} height={100} className="dark:invert w-12 lg:w-32 h-auto"/> },
    { id: 6, content: <Image src="/images/logo-3.svg" alt='4' width={100} height={100} className="dark:invert w-12 lg:w-32 h-auto"/> },
  ];

  return (
    <div className="relative mx-auto w-full xl:w-[93.75%]">
      <div className="absolute top-0 bottom-0 left-0 w-[50px] lg:w-[100px] z-10 bg-gradient-to-r from-white dark:from-black to-transparent">
        {[...Array(5)].map((_, index) => (
          <div
            key={`left-${index}`}
            className="absolute w-full h-full"
            style={{ backdropFilter: `blur(${index}px)` }}
          />
        ))}
      </div>
      <div className="absolute top-0 bottom-0 right-0 w-[50px] lg:w-[100px] z-10 bg-gradient-to-l from-white dark:from-black to-transparent">
        {[...Array(5)].map((_, index) => (
          <div
            key={`right-${index}`}
            className="absolute w-full h-full"
            style={{ backdropFilter: `blur(${index}px)` }}
          />
        ))}
      </div>
      <div className="swiper js-carousel mt-10 lg:mt-16 -mb-5 px-2 lg:px-3 xl:px-4">
        <div className="swiper-wrapper">
          {logos.map((logo) => (
            <div
              className="swiper-slide flex justify-center items-center w-[300px] lg:w-[320px] xl:w-[340px] px-2 lg:px-3 xl:px-4"
              key={logo.id}
              data-swiper-slide-index={logo.id}
            >
              <div className="w-full flex justify-center items-center py-5">
                <div className="w-[150px] h-[50px]  flex items-center justify-center rounded-lg">
                  {logo.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;