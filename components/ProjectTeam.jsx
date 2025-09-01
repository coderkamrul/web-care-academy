"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { MdOutlinePause } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";

const VideoCard = ({ video, index, activeCard, setActiveCard }) => {
  const videoRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState({ current: 0, duration: 0 });

  useEffect(() => {
    // Stop video if another card is active
    if (activeCard !== index && clicked) {
      const videoEl = videoRef.current;
      videoEl.pause();
      videoEl.currentTime = 0;
      setClicked(false);
      setPlaying(false);
      setHovering(false);
      setProgress(0);
    }
  }, [activeCard]);

  const handleMouseEnter = () => {
    if (clicked) return;
    const videoEl = videoRef.current;
    videoEl.muted = true;
    videoEl.play();
    setHovering(true);
    setPlaying(true);
  };

  const handleMouseLeave = () => {
    if (clicked) return;
    const videoEl = videoRef.current;
    videoEl.pause();
    setHovering(false);
    setPlaying(false);
  };

  const handleClick = () => {
    const videoEl = videoRef.current;

    // Set this card as active
    setActiveCard(index);

    videoEl.muted = false;
    videoEl.currentTime = 0;
    videoEl.play();
    setClicked(true);
    setPlaying(true);
  };

  const togglePlayPause = () => {
    const videoEl = videoRef.current;
    if (videoEl.paused) {
      videoEl.play();
      setPlaying(true);
    } else {
      videoEl.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const videoEl = videoRef.current;
    setProgress((videoEl.currentTime / videoEl.duration) * 100);
    setTime({ current: videoEl.currentTime, duration: videoEl.duration });
  };

  const handleEnded = () => {
    const videoEl = videoRef.current;
    videoEl.pause();
    videoEl.currentTime = 0;
    setClicked(false);
    setPlaying(false);
    setHovering(false);
    setProgress(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="px-2 lg:px-3 xl:px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full relative">
        <div className="w-full relative rounded-2xl bg-gray-50 aspect-9/16 overflow-hidden group lg:rounded-3xl dark:bg-gray-800">
          {!clicked && (
            <div
              className={`w-full h-full absolute top-0 left-0 z-20 transition duration-1000 pointer-events-none ${hovering ? "opacity-0" : "opacity-100"
                }`}
            >
              <Image src={video.thumbnail} alt={video.title} fill className="object-cover object-center" />
            </div>
          )}

          <video
            ref={videoRef}
            src={video.src}
            className="w-full h-full absolute top-0 left-0 z-10 object-cover object-center"
            playsInline
            muted
            controls={false}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          />

          {!clicked && (
            <div
              onClick={handleClick}
              className="absolute top-0 left-0 w-full h-full z-30 flex items-center justify-center cursor-pointer"
            >
              <div className="bg-[#d0ff71] flex-shrink-0 rounded-full flex items-center justify-center transition-transform transform | xl:group-hover:scale-110 w-14 h-14 | md:w-16 md:h-16">
                <FaPlay />
              </div>
            </div>
          )}

          {clicked && (
            <div
              onClick={togglePlayPause}
              className="absolute top-0 left-0 w-full h-full z-30 opacity-0 cursor-pointer"
            ></div>
          )}

          {clicked && (
            <>
              <div className="absolute inline-flex items-center space-x-3 z-40 transition-opacity opacity-100 bottom-6 left-3 lg:bottom-8 lg:left-4 pointer-events-auto">
                <button
                  onClick={togglePlayPause}
                  className="w-10 h-10 bg-gray-900/60 text-white rounded-full cursor-pointer flex items-center justify-center"
                >
                  {playing ? <MdOutlinePause size={16} /> : <IoMdPlay size={16} />}
                </button>
                <div className="text-white text-sm">
                  {formatTime(time.current)}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 z-20 w-full px-5 pb-4">
                <div className="h-0.5 w-full bg-white/30">
                  <div className="h-0.5 bg-[#d0ff71] transition-all" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-full relative mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 17 11"
            className="absolute top-0 left-0 w-5 h-5 fill-current text-black dark:text-white"
          >
            <path d="M0 6.646C0 3.107 2.531 1.002 4.11.032c.2-.123.416.133.262.312A8.202 8.202 0 002.92 2.777 4.023 4.023 0 110 6.647zm8.955 0c0-3.539 2.531-5.644 4.11-6.613.2-.123.416.132.263.31a8.202 8.202 0 00-1.454 2.434 4.023 4.023 0 11-2.92 3.87z" />
          </svg>

          <h2 className="text-lg | md:text-xl | xl:text-1xl | 2xl:text-2xl font-medium tracking-tight text-black  | dark:text-gray-100 leading-tighter indent-10 | lg:indent-14">
            {video.title}
          </h2>
        </div>
      </div>
    </div>
  );
};



const ProjectTeam = () => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const Videos = [
    {
      id: 1,
      title: "Describe working at MadeByShape in three words",
      thumbnail: "/images/ProjectTeam.png",
      src: "/images/Q1-Working-at-Shape-in-3-words-v3.mp4",
    },
    {
      id: 2,
      title: "Describe working at MadeByShape in three words",
      thumbnail: "/images/ProjectTeam.png",
      src: "/images/Q1-Working-at-Shape-in-3-words-v3.mp4",
    },
    {
      id: 3,
      title: "Describe working at MadeByShape in three words",
      thumbnail: "/images/ProjectTeam.png",
      src: "/images/Q1-Working-at-Shape-in-3-words-v3.mp4",
    },
    {
      id: 4,
      title: "Describe working at MadeByShape in three words",
      thumbnail: "/images/ProjectTeam.png",
      src: "/images/Q1-Working-at-Shape-in-3-words-v3.mp4",
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
          425: { slidesPerView: 1.5 }, // tablet
          640: { slidesPerView: 2.5 }, // tablet
          1024: { slidesPerView: 3 }, // laptop
          1280: { slidesPerView: 4, allowTouchMove: false }, // desktop no drag
        }}
      >
        {Videos.map((stat, idx) => (
          <SwiperSlide key={stat.id}>
            <VideoCard
              video={stat}
              index={idx}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Buttons: only for mobile, tablet, laptop */}
      <div className="flex justify-center gap-4 mt-10 xl:hidden">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          className={`w-10 h-10 cursor-pointer flex items-center justify-center rounded-full shadow 
            ${isBeginning
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 shadow-none"
              : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            }`}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
          className={`w-10 h-10 flex cursor-pointer items-center justify-center rounded-full shadow 
            ${isEnd
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 shadow-none"
              : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            }`}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProjectTeam;
