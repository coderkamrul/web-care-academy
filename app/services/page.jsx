import BlogCarousel from "@/components/BlogCarousel";
import ServiceCategory from "@/components/ServiceCategory";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const designServices = [
  {
    id: 1,
    title: "Brand Identity",
    link: "/services/brand-identity",
  },
  {
    id: 2,
    title: "Web Design",
    link: "/services/web-design",
  },
  {
    id: 3,
    title: "eCommerce",
    link: "/services/eCommerce",
  },
  {
    id: 4,
    title: "Wordpress",
    link: "/services/Wordpress",
  },
  {
    id: 5,
    title: "Graphic Design",
    link: "/services/graphic-design",
  },
];

export default function page() {
  return (
    <>
      <div className="w-full pt-20 pb-10 | lg:pt-32 lg:pb-16 | xl:pt-40">
        <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
          <div className="flex flex-wrap justify-between mb-3 | md:mb-5 | lg:mb-0">
            <div className="px-2 | lg:px-3 | xl:px-4 w-full relative">
              <div className="inline-flex items-center space-x-2 w-auto mb-3 | lg:absolute lg:top-3 lg:left-4 ">
                <div className="bg-black | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                <div className="font-light text-sm text-black | dark:text-white">
                  Services
                </div>
              </div>
              <h1 className="text-4xl | lg:text-[4vw] font-medium tracking-tight text-black | dark:text-white leading-0.9 text-balance lg:indent-32">
                We’re a digital <br />
                marketing agency <br />
                with expertise
              </h1>
            </div>
          </div>
          <div className="w-full flex flex-wrap | md:justify-end">
            <div className="px-2 | lg:px-3 | xl:px-4">
              <div className="w-full relative max-w-xl pr-10 | lg:pr-0 lg:max-w-2xl lg:pl-10">
                <h2 className="mb-3 text-pretty font-medium tracking-tight text-black | dark:text-white text-lg md:text-2-5xl xl:text-4xl leading-tight">
                  We bring our passion for good design to brave brands and
                  deliver something you can shout about.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>


      <ServiceCategory
        title="Design"
        desc="Brand designers and web designers in-house crafting visuals to match your brand values."
        designServices={designServices} />
      <ServiceCategory
        title="Develop"
        desc="Web development to the highest standards, and matching the latest industry requirements."
        designServices={designServices} />
      <ServiceCategory
        title="Support"
        desc="Lean on our in-house team to support with your design, development and seo needs."
        designServices={designServices} />

        <BlogCarousel title={"Latest from our studio"} />
    </>
  );
}

