"use client";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";

export default function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (hovered && member.galleryImages?.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % member.galleryImages.length);
      }, 200); // change image every 1.2s
    } else {
      setCurrentImageIndex(0); // reset to profile image
    }
    return () => clearInterval(interval);
  }, [hovered, member.galleryImages]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full">
        <div className="w-full flex flex-wrap relative group pl-px">
          <Link
            href={member.profileUrl}
            className="w-full h-full absolute top-0 left-0 z-10"
          >
            <div className="sr-only">{member.name}'s profile</div>
          </Link>

          {/* Top Right Buttons */}
          <div className="absolute top-3 right-3 z-20 inline-flex items-center space-x-1.5">
            {member.linkedin && (
              <Link
                href={member.linkedin}
                className="inline-flex items-center justify-center bg-[#d0ff71] text-black rounded-full w-8 h-8 duration-400 xl:hover:bg-black xl:hover:text-white lg:dark:hover:bg-black"
              >
                <FaLinkedin />
              </Link>
            )}
            <Link
              href={member.profileUrl}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#d0ff71] transition-transform transform duration-500 xl:group-hover:rotate-90"
            >
              <Plus className="w-4 h-4 text-black" />
            </Link>
          </div>

          {/* Images */}
          <div className="w-full relative">
            <div className="w-full rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-400 lg:rounded-3xl">
              <div className="relative w-full h-full">
                {/* Profile image (default) */}
                {member.profileImage ? (
                <Image
                  src={member.profileImage}
                  alt={member.name}
                  width={800}
                  height={1067}
                  className={`w-full h-full object-cover object-center ${
                    member.galleryImages && (hovered ? "opacity-0" : "opacity-100")
                  }`}
                />
                ) :(
                  <Image
                  src='/images/placeholderblur.png'
                  alt={member.name}
                  width={800}
                  height={1067}
                  className={`w-full h-full object-cover object-center ${
                    member.galleryImages && (hovered ? "opacity-0" : "opacity-100")
                  }`}
                />
                )}

                {/* Gallery images (slideshow on hover) */}
                {member.galleryImages?.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt={member.name}
                    width={800}
                    height={1067}
                    className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
                      hovered && currentImageIndex === i
                        ? "visible opacity-100"
                        : "hidden opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="w-full absolute bottom-0 left-0 pr-14 z-20">
            <div className="w-auto relative inline-flex flex-wrap rounded-tr-2xl pt-3 pointer-events-none pr-5 lg:rounded-tr-3xl lg:pr-8 bg-white dark:bg-black">
              <div>
                {/* Bottom Right */}
                <svg
                  className="w-10 h-10 lg:w-12 lg:h-12 fill-current absolute -bottom-px right-px transform translate-x-full rotate-180 text-white dark:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  xmlSpace="preserve"
                >
                  <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                </svg>

                {/* Top Left */}
                <svg
                  className="w-10 h-10 lg:w-12 lg:h-12 fill-current absolute top-px left-0 transform -translate-y-full rotate-180 text-white dark:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  xmlSpace="preserve"
                >
                  <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                </svg>

                <div className="dark:text-white text-xs lg:text-sm pb-1">
                  {member.name}
                </div>
                <div className="font-normal text-gray-500 leading-tight text-[11px] lg:text-xs dark:text-gray-400">
                  {member.designation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
