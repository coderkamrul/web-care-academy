import Image from "next/image";
import React from "react";
import Images from "./Images";
import Buttons from "./Buttons";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function ArchedImageCarouselMobile({ title, des, btntext, btncolor, link }) {
  return (
    <div className="w-full  | xl:block">
      <div className="">
        <div className={`w-full pt-20 pb-10 | lg:pt-32 lg:pb-16 | xl:pt-40 relative xl:-mt-10 mb-10 | lg:mb-20 | 2xl:mt-0 xl:h-[95vh] lg:min-h-[900px] ${title ? "h-[50vh]" : ""
          } `}>
          <div className="px-0">
            <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40 w-full flex flex-wrap justify-center relative z-30 -mb-10 | lg:-mb-14">
              <div className="px-2 | lg:px-3 | xl:px-4">
                <h1 className="text-3xl | sm:text-5xl | md:text-6xl | xl:text-8xl font-medium tracking-tight text-black  | dark:text-white leading-none text-balance text-center">
                  {title
                    ? <span dangerouslySetInnerHTML={{ __html: title }}></span>
                    : <>
                      Good design
                      <br />
                      makes life better.
                    </>
                  }
                </h1>
              </div>
            </div>
            <div className="w-full overflow-hidden pt-5 mt-4 lg:mt-0 relative pointer-events-none transition-opacity h-[38vw] opacity-100">
              <Images />
            </div>
            <div className="w-full absolute left-0 -bottom-0 | lg:bottom-20 | xl:bottom-0 2xl:bottom-10">
              <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40 w-full flex flex-wrap justify-center text-center">
                <div className="px-2 | lg:px-3 | xl:px-4 relative">
                  {des &&
                    <p className="text-base | xl:text-md text-black dark:text-gray-200 font-sans-primary relative z-10 text-pretty font-light leading-7  mb-6"><span dangerouslySetInnerHTML={{ __html: des }}></span></p>
                  }
                  <Buttons
                    bg={btncolor ? btncolor : "bg-[#d0ff71]"}
                    text={btntext ? btntext : "Learn about us"}
                    color={btncolor ? "text-white" : "text-black"}
                    link={link ? link : "#178"}
                    icon={btncolor ? <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ease-out text-white`} /> : <ArrowDownRight className={`w-4 h-4 transition-transform duration-300 ease-out dark:text-black`} />}
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
