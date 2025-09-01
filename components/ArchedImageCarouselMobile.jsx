import Image from "next/image";
import React from "react";
import Images from "./Images";
import Buttons from "./Buttons";
import { ArrowDownRight } from "lucide-react";

export default function ArchedImageCarouselMobile() {
  return (
    <div className="w-full  | xl:block">
      <div className="">
        <div className="w-full pt-20 pb-10 | lg:pt-32 lg:pb-16 | xl:pt-40 relative xl:-mt-10 mb-10 | lg:mb-20 | 2xl:mt-0 xl:h-[95vh] lg:min-h-[900px]">
          <div className="px-0">
            <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40 w-full flex flex-wrap justify-center relative z-30 -mb-10 | lg:-mb-14">
              <div className="px-2 | lg:px-3 | xl:px-4">
                <h1 className="text-3xl | sm:text-5xl | md:text-6xl | xl:text-8xl font-medium tracking-tight text-black  | dark:text-white leading-none text-balance text-center">
                  Good design
                  <br />
                  makes life better.
                </h1>
              </div>
            </div>
            <div className="w-full overflow-hidden pt-5 mt-4 lg:mt-0 relative pointer-events-none transition-opacity h-[38vw] opacity-100">
              <Images />
            </div>
            <div className="w-full absolute left-0 -bottom-0 | lg:bottom-20 | xl:bottom-0 2xl:bottom-10">
              <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40 w-full flex flex-wrap justify-center text-center">
                <div className="px-2 | lg:px-3 | xl:px-4 relative">
                  <Buttons
                    bg={"bg-[#d0ff71]"}
                    text={"Learn about us"}
                    color={"text-black"}
                    link={"#178"}
                    icon={<ArrowDownRight className={`w-4 h-4 transition-transform duration-300 ease-out dark:text-black`}/>}
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
