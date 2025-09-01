"use client";
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function AutoScrollCarousel({ children }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Optional: adjust autoplay speed dynamically
    swiper.params.autoplay = {
      delay: 0, // 0 for continuous
      disableOnInteraction: false, // keep autoplay even after drag
      pauseOnMouseEnter: true,
    };

    swiper.params.speed = 5000; // slide speed (ms)
    swiper.params.freeMode = true; // allow dragging freely
    swiper.params.loop = true; // infinite loop

    swiper.autoplay.start();
  }, []);

  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      onBeforeInit={(swiper) => (swiperRef.current = swiper)}
      spaceBetween={20} // adjust spacing between slides
      slidesPerView="auto"
      freeMode
      loop
      grabCursor
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={5000}
    >
      {children.map((child, i) => (
        <SwiperSlide key={i} style={{ width: "auto" }}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
