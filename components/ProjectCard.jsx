import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

export default function ProjectCard({ title, category, year, video, image, tags, link="/projects/1" }) {
  return (
    <div className="w-full mb-16 | lg:mb-28">
      <div className="w-full relative">
          <Link
          data-cursor
            href={link}
            className="w-fell relative group flex flex-col items-start transform rotate-001 || js-cursor-trigger-drag"
          >
            <div className="w-full relative overflow-hidden mb-6">
              <div className="absolute -top-px pt-px -right-px z-20 bg-white pl-3 pb-3 transition-transform duration-300 transform-gpu rotate-001 rounded-bl-3xl | xl:-translate-y-full | xl:group-hover:translate-y-0 | dark:bg-black">
                <svg
                  id="Layer_1"
                  className="w-10 h-10 lg:w-10 lg:h-10 text-white fill-current absolute top-0 left-px transform-gpu -translate-x-full dark:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                >
                  <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                </svg>
                <svg
                  id="Layer_1"
                  className="w-10 h-10 lg:w-10 lg:h-10 text-white fill-current absolute bottom-px right-0 transform-gpu translate-y-full dark:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                >
                  <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                </svg>
                <div className="flex flex-wrap items-center -mb-2 lg:-mb-3 -mr-2">
                  {tags.slice(0, 3).map((tag, index) => (
                    <div
                      key={tag}
                      className={`bg-gray-100 leading-tight rounded-full mr-2 mb-2 lg:mr-3 lg:mb-3 text-sm pt-2 pb-1.5 px-4 dark:bg-[#26282c] dark:text-white ${
                        index >= 2 ? "hidden sm:block" : ""
                      }`}
                    >
                      {tag}
                    </div>
                  ))}

                  {tags.length > 3 && (
                    <div className="hidden sm:flex text-sm pr-6 mb-2 | lg:mb-3 | dark:text-gray-200">
                      +{tags.length - 3}
                    </div>
                  )}
                  {tags.length > 2 && (
                    <div className="flex sm:hidden text-sm pr-6 mb-2 | lg:mb-3 | dark:text-gray-200">
                      +{tags.length - 2}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full rounded-2xl transform-gpu overflow-hidden relative bg-gray-50 | dark:bg-gray-400 | lg:rounded-3xl">
                <div className="w-full relative overflow-hidden">
                  <div className="w-full transform scale-110 transition-transform | xl:group-hover:-translate-y-2.5">
                    <div className="w-full aspect-4/3 overflow-hidden relative">
                      {video ? (
                        <video
                          className="w-full h-full object-cover absolute top-0 left-0"
                          autoPlay
                          loop
                          muted
                          playsInline
                          loading="lazy"
                        >
                          <source src={video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <Image
                          className="w-full h-full object-cover absolute top-0 left-0"
                          src={image}
                          alt="Project Image"
                          loading="lazy"
                          layout="fill"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 mb-2 text-sm | lg:text-sm | dark:text-gray-200">
              <div className="font-light">{year}</div>
              <div className="w-1.5 h-1.5 relative -top-px bg-gray-600 rounded-full | dark:bg-gray-200"></div>
              <div className="font-light">{category}</div>
            </div>
            <h2 className="text-xl | xl:text-3xl font-medium tracking-normal text-gray-900  | dark:text-gray-100 leading-tighter text-balance pr-10">
              {title}
            </h2>
          </Link>
      </div>
    </div>
  );
}
