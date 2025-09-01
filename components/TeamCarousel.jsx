"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import TeamCard from "./TeamCard";

const teamMembers = [
  {
    name: "Natasia Rubin",
    designation: "Content Writer",
    profileImage: "/images/Profile.png",
    galleryImages: [
      "/images/blog-1.png",
      "/images/design-1.png",
      "/images/design-2.png",
    ],
    profileUrl: "/about/natasia-rubin",
    linkedin: "https://www.linkedin.com/in/natasiarubin/",
  },
  {
    name: "Jane Doe",
    designation: "UI/UX Designer",
    profileImage: "/images/Profile.png",
    galleryImages: [
      "/images/blog-1.png",
      "/images/design-3.png",
      "/images/design-4.png",
    ],
    profileUrl: "/about/jane-doe",
    linkedin: "https://www.linkedin.com/in/jane-doe/",
  },
  {
    name: "John Smith",
    designation: "Web Developer",
    profileImage: "/images/Profile.png",
    galleryImages: [
      "/images/blog-1.png",
      "/images/blog-1.png",
      "/images/blog-1.png",
    ],
    profileUrl: "/about/john-smith",
    linkedin: "https://www.linkedin.com/in/john-smith/",
  },
  {
    name: "Emily Brown",
    designation: "Marketing Specialist",
    profileUrl: "/about/emily-brown",
    linkedin: "https://www.linkedin.com/in/emily-brown/",
  },
  {
    name: "Emily Brown",
    designation: "Marketing Specialist",
    profileImage: "/images/Profile.png",
    galleryImages: [
      "/images/blog-1.png",
      "/images/blog-1.png",
      "/images/blog-1.png",
    ],
    profileUrl: "/about/emily-brown",
    linkedin: "https://www.linkedin.com/in/emily-brown/",
  },
  {
    name: "Emily Brown",
    designation: "Marketing Specialist",
    profileImage: "/images/Profile.png",
    profileUrl: "/about/emily-brown",
  },
];

export default function TeamCarousel() {
  return (
    <div className="relative w-full py-16">
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={30}
        freeMode={true}
        loop={true}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={15000}
        breakpoints={{
          1280: { slidesPerView: 4 },
          1024: { slidesPerView: 3.5 },
          640: { slidesPerView: 2.5 },
          0: { slidesPerView: 1.5 },
        }}
      >
        {teamMembers.map((member, index) => {
          // stagger up/down including loop clones
          const marginTopClass = index % 2 === 0 ? "mt-0" : "mt-12";
          return (
            <SwiperSlide key={index} className="flex justify-center">
              <div className={marginTopClass}>
                <TeamCard member={member} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
