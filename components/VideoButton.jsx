"use client";
import React, { useState, useRef, useEffect } from "react";
import Buttons from "./Buttons";
import { IoIosPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { IoVolumeMute } from "react-icons/io5";
import { HiMiniSpeakerWave } from "react-icons/hi2";

function VideoButton() {
  const [isPlaying, setIsPlaying] = useState(true); // play/pause state
  const [isMuted, setIsMuted] = useState(true); // mute/unmute state
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  // Play/Pause button click
  const handlePlayPauseClick = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      videoRef.current.muted = false; // play with sound
      setIsPlaying(true);
      setIsMuted(false);
    }
  };

  // Video area click
  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (!isPlaying) {
      // If paused, play video with sound
      videoRef.current.play();
      videoRef.current.muted = false;
      setIsPlaying(true);
      setIsMuted(false);
    } else {
      // If playing, toggle mute/unmute
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

// Update custom cursor icon dynamically
useEffect(() => {
  const el = videoContainerRef.current;
  if (!el) return;

  // Update the cursor component
  el._cursorComponent = isMuted || !isPlaying ? (
    <IoVolumeMute className="w-6 h-6 dark:text-black" />
  ) : (
    <HiMiniSpeakerWave className="w-6 h-6 dark:text-black" />
  );

  // 🔥 Force trigger a mousemove so the cursor updates immediately
  const event = new MouseEvent("mousemove", { bubbles: true });
  el.dispatchEvent(event);
}, [isMuted, isPlaying]); // <-- include isPlaying too


  return (
    <div className="w-full pb-20 | lg:pb-24 | 2xl:pb-40">
      <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
        <div className="w-full flex flex-wrap">
          <div className="px-2 | lg:px-3 | xl:px-4 w-full">
            <div className="w-full relative">
              <div
                data-action-cursor
                ref={videoContainerRef}
                className="w-full rounded-2xl overflow-hidden relative z-10 aspect-4/3 | lg:rounded-3xl lg:aspect-16/9"
                onClick={handleVideoClick} // click toggles mute/unmute or play+unmute
              >
                <video
                  ref={videoRef}
                  className="w-full h-full absolute top-0 left-0 object-cover object-center"
                  playsInline
                  autoPlay
                  loop
                  muted={isMuted}
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

              <div className="absolute bottom-0 right-0 z-20 pl-4 pt-4 w-auto flex-shrink-0 bg-white rounded-tl-2xl inline-flex | lg:rounded-tl-3xl | dark:bg-black">
                <svg
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="w-10 h-10 lg:w-12 lg:h-12 absolute -bottom-px left-px transform -translate-x-full rotate-180 text-white dark:text-black fill-current"
                >
                  <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                </svg>
                <svg
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="w-10 h-10 lg:w-12 lg:h-12 absolute top-px -right-px transform -translate-y-full rotate-180 text-white dark:text-black fill-current"
                >
                  <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                </svg>
                <div className="flex-shrink-0 w-28 flex justify-end">
                  <Buttons
                    bg="bg-black dark:bg-[#26282c]"
                    text={isPlaying ? "Pause" : "Play"}
                    color="text-white"
                    icon={
                      isPlaying ? (
                        <IoIosPause className="w-4 h-4 transition-transform duration-300 ease-out text-white" />
                      ) : (
                        <FaPlay className="w-3 h-3 transition-transform duration-300 ease-out text-white" />
                      )
                    }
                    rotateIcon="rotate-0"
                    onClick={handlePlayPauseClick} // play/pause with sound
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoButton;
