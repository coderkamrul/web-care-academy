"use client";
import React, { useState } from "react";
import Buttons from "./Buttons";
import Image from "next/image";
import { IoMdPlay } from "react-icons/io";
import VideoModal from "./Modal";

export default function VideoCard({}) {
  const [modalVideoUrl, setModalVideoUrl] = useState(null);
  return (
    <div>
      <VideoModal
        videoUrl={modalVideoUrl}
        isOpen={!!modalVideoUrl}
        onClose={() => setModalVideoUrl(null)}
      />
      {/* Sharing the love  */}
      <section className="w-full relative">
        <div className="w-full pb-20 | lg:pb-24 | 2xl:pb-40 ">
          <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
            <div className="w-full flex flex-wrap">
              <div className="px-2 | lg:px-3 | xl:px-4 w-full relative">
                <div className="flex flex-wrap w-full relative cursor-pointer h-[595px] md:h-[80vh] lg:min-h-120">
                  <button
                    onClick={() => setModalVideoUrl("/images/project-1.mp4")}
                    className="absolute top-0 left-0 w-full h-full z-20 group cursor-pointer"
                  >
                    <div className="sr-only">Play video</div>
                    <div className="absolute top-0 left-0 w-full h-full flex p-6 | lg:p-10 items-end justify-start ">
                      <div className="flex-shrink-0 rounded-full bg-[#d0ff71] flex items-center justify-center transition-transform transform | xl:group-hover:scale-110 w-14 h-14 | md:w-16 md:h-16">
                        <IoMdPlay className="w-3 h-3 | md:w-4 md:h-4 text-black" />
                      </div>
                    </div>
                  </button>
                  <div className="w-full h-full absolute top-0 left-0 rounded-2xl transform-gpu bg-gray-50 overflow-hidden | dark:bg-gray-400 | lg:rounded-3xl ">
                    <Image
                      src="/images/love.png"
                      layout="fill"
                      className="w-full h-full absolute top-0 left-0 object-cover object-center aspect-16/9"
                      alt="love"
                    />
                  </div>
                  <div className="flex flex-col items-start absolute top-0 left-0 rounded-2xl transform-gpu z-20 pointer-none mx-2  | md:m-6 | lg:rounded-3xl lg:m-10">
                    <div className="relative || mt-6 z-20">
                      <div className="absolute top-0 left-3 | lg:left-6 z-20 ">
                        <svg
                          className="text-black fill-current w-5 h-5 lg:left-6 lg:w-8 lg:h-8 dark:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 17 11"
                          fill="none"
                        >
                          <path d="M0 6.646C0 3.107 2.531 1.002 4.11.032c.2-.123.416.133.262.312A8.202 8.202 0 002.92 2.777 4.023 4.023 0 110 6.647zm8.955 0c0-3.539 2.531-5.644 4.11-6.613.2-.123.416.132.263.31a8.202 8.202 0 00-1.454 2.434 4.023 4.023 0 11-2.92 3.87z" />
                        </svg>
                      </div>
                      <div className="text-xl font-medium [filter:url(#goo)] | md:text-2xl | lg:text-3xl | 2xl:text-5xl leading-none tracking-tight text-black | dark:text-gray-100 bg-white | dark:bg-black py-2 | lg:py-3 inline">
                        <div className="indent-14 | lg:indent-24 hidden relative pl-3 pr-5 | lg:pl-5 ">
                          Web Care created
                          <br />
                          something better then I ever
                          <br />
                          could have imagined
                        </div>
                        <span className="pl-14 | lg:pl-24 flex-shrink-0 truncate inline relative z-2 ">
                          Web Care created&nbsp;&nbsp;
                        </span>
                        <br />
                        <span className=" flex-shrink-0 truncate inline relative pl-3 | lg:pl-5 z-1">
                          something better than I ever&nbsp;&nbsp;
                        </span>
                        <br />
                        <span className=" flex-shrink-0 truncate inline relative pl-3 | lg:pl-5 z-0">
                          could have imagined&nbsp;&nbsp;
                        </span>
                      </div>
                      <svg
                        width="0"
                        height="0"
                        className="absolute hidden"
                        colorInterpolationFilters="sRGB"
                      >
                        <defs>
                          <filter id="goo">
                            <feGaussianBlur
                              in="SourceGraphic"
                              stdDeviation="6"
                              result="blur"
                            />
                            <feColorMatrix
                              in="blur"
                              type="matrix"
                              values="1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 19 -9"
                              result="goo"
                            />
                            <feComposite
                              in="SourceGraphic"
                              in2="goo"
                              operator="atop"
                            />
                          </filter>
                        </defs>
                      </svg>

                      <svg
                        width="0"
                        height="0"
                        className="absolute hidden"
                        colorInterpolationFilters="sRGB"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <filter id="goo">
                            <feGaussianBlur
                              in="SourceGraphic"
                              stdDeviation="6"
                              result="blur"
                            />
                            <feColorMatrix
                              in="blur"
                              type="matrix"
                              values="1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 19 -9"
                              result="goo"
                            />
                            <feComposite
                              in="SourceGraphic"
                              in2="goo"
                              operator="atop"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div className="w-auto relative bg-white rounded-xl z-10 rounded-t-none p-3 -mt-px | lg:p-4 | dark:bg-black">
                      <svg
                        className="w-8 h-8 text-white dark:text-black fill-current absolute right-px transform translate-x-full top-1.5 dark:text-grayDark-600 lg:top-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                      >
                        <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                      </svg>
                      <div className="flex items-end space-x-2 | lg:space-x-3">
                        <div className="w-9 h-9 rounded-md | lg:w-12 lg:h-12 lg:rounded-lg inline-flex overflow-hidden relative">
                          <div className="relative overflow-hidden w-full">
                            <Image
                              src="/images/client.png"
                              className="w-full absolute top-0 left-0 h-full "
                              layout="fill"
                              alt="client"
                            />
                          </div>
                        </div>
                        <div className="leading-tight tracking-normal">
                          <div className="text-black font-normal text-sm | dark:text-white">
                            Hannah Wessel
                          </div>
                          <div className="font-light text-[10px] | lg:text-xs text-gray-400 | dark:text-grayDark-200">
                            Co-Founder, Stoneletters
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 z-30 pl-4 pt-4 flex-shrink-0 rounded-tl-2xl bg-white | lg:rounded-tl-3xl | dark:bg-black">
                    <svg
                      className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute -bottom-px left-px transform -translate-x-full rotate-180 dark:text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                    >
                      <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                    </svg>

                    <svg
                      className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute top-px -right-px transform -translate-y-full rotate-180 dark:text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                    >
                      <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                    </svg>

                    <div className="inline-flex flex-col items-start  | lg:flex-row  lg:space-x-6">
                      <div className="hidden lg:block">
                        <Buttons
                          onClick={() =>
                            setModalVideoUrl("https://youtu.be/gWz_HMuqDIE")
                          }
                          bg={"bg-[#d0ff71]"}
                          text={"Play video"}
                          color={"text-black"}
                          icon={<IoMdPlay className="w-3 h-3 text-black" />}
                          rotateIcon={"rotate-0"}
                        />
                      </div>
                      <Buttons
                        bg={"bg-black dark:bg-[#26282c]"}
                        text={"View more testimonilas"}
                        color={"text-white"}
                        link={"/testimonials"}
                        rotateIcon={"rotate-45"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
