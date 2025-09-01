
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/design-1.png",
  "/images/blog-1.png",
  "/images/design-2.png",
  "/images/design-3.png",
  "/images/design-4.png",
  "/images/design-1.png",
  "/images/blog-1.png",
  "/images/design-2.png",
  "/images/design-3.png",
  "/images/design-4.png",
  "/images/design-1.png",
  "/images/blog-1.png",
  "/images/design-2.png",
  "/images/design-3.png",
  "/images/design-4.png",
  "/images/design-1.png",
  "/images/blog-1.png",
  "/images/design-2.png",
  "/images/design-3.png",
  "/images/design-4.png",
  "/images/design-1.png",
  "/images/blog-1.png",
  "/images/design-2.png",
  "/images/design-3.png",
  "/images/blog-1.png",
  "/images/design-4.png",
  "/images/design-3.png",
];

export default function InfiniteCarousel() {
  const containerRef = useRef(null);
  const [angle, setAngle] = useState(0);

  const imageCount = images.length;
  const rotationStep = 360 / imageCount; // spacing between images

  useEffect(() => {
    let animationFrameId;

    const rotate = () => {
      setAngle((prev) => prev - 0.05); // rotation speed
      animationFrameId = requestAnimationFrame(rotate);
    };

    rotate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full h-[222vw] relative overflow-hidden">
      <div
        ref={containerRef}
        className="absolute top-1/2 left-1/2 w-[100vw] h-[220vw] origin-center -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        {images.map((src, index) => {
          const rotation = index * rotationStep;
          return (
            <div
              key={index}
              className="absolute top-0 left-1/2 h-1/2 origin-bottom-left w-[19vw] mx-[1vw]"
              style={{ transform: `rotate(${rotation}deg) translateX(-50%)` }}
            >
              <div
                className="relative overflow-hidden w-full"
                style={{ paddingTop: "100%" }}
              >
                <Image
                layout="fill"
                  src={src}
                  alt={`Image ${index}`}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl transform-gpu bg-gray-50 dark:bg-grayDark-400 lg:rounded-3xl"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
