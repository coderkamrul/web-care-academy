import Link from 'next/link';
import React from 'react'
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import Buttons from './Buttons';
import Image from 'next/image';
import { FaPhone } from "react-icons/fa6";
export default function Footer() {
  return (
    <div className="w-full p-4 -mt-4 rounded-t-2xl | lg:rounded-t-3xl lg:p-6 lg:-mt-6 | xl:p-10 xl:-mt-10 bg-white | dark:bg-black">
      <div className="w-full relative bg-black rounded-bl-2xl rounded-tr-2xl pt-3 pb-16 overflow-hidden | lg:rounded-tr-none lg:pb-10 lg:pt-16 lg:rounded-b-3xl | dark:bg-[#1a1b1e]">
        <div className="absolute bottom-2 left-0 flex w-5/16 pl-2 justify-center | md:justify-start md:pl-6 | text-white lg:hidden">
          WebCare.
        </div>
        <div className="absolute top-0 left-0 pr-5 pb-5 z-30 bg-white | dark:bg-black">
          <div className="absolute top-0 left-0 transform translate-x-full w-full bg-white | dark:bg-black z-20">
            <div className="w-full aspect-1/1 bg-black rounded-tl-2xl | lg:rounded-tl-3xl | dark:bg-[#1a1b1e]"></div>
          </div>
          <div className="absolute bottom-0 right-0 transform w-full bg-black z-20 | dark:bg-[#1a1b1e]">
            <div className="w-full aspect-1/1 bg-white | dark:bg-black rounded-br-2xl | lg:rounded-br-3xl"></div>
          </div>
          <div className="absolute bottom-0 left-0 transform translate-y-full w-full bg-white | dark:bg-black z-20">
            <div className="w-full aspect-1/1 bg-black rounded-tl-2xl | lg:rounded-tl-3xl | dark:bg-[#1a1b1e]"></div>
          </div>
          <div className="relative z-20">
            <div className="flex flex-col items-start space-y-1.5">
              <Link
                href="/linkedin"
                className="inline-flex items-center justify-center bg-[#d0ff71] text-black translate-z-0 rounded-full w-8 h-8 duration-400 | xl:hover:bg-black xl:hover:text-white | lg:dark:hover:bg-bg-[#1a1b1e]"
              >
                <FaLinkedin />
              </Link>
              <Link
                href="/linkedin"
                className="inline-flex items-center justify-center bg-[#d0ff71] text-black translate-z-0 rounded-full w-8 h-8 duration-400 | xl:hover:bg-black xl:hover:text-white | lg:dark:hover:bg-bg-[#1a1b1e]"
              >
                <FaLinkedin />
              </Link>
              <Link
                href="/linkedin"
                className="inline-flex items-center justify-center bg-[#d0ff71] text-black translate-z-0 rounded-full w-8 h-8 duration-400 | xl:hover:bg-black xl:hover:text-white | lg:dark:hover:bg-bg-[#1a1b1e]"
              >
                <FaLinkedin />
              </Link>
              <Link
                href="/linkedin"
                className="inline-flex items-center justify-center bg-[#d0ff71] text-black translate-z-0 rounded-full w-8 h-8 duration-400 | xl:hover:bg-black xl:hover:text-white | lg:dark:hover:bg-bg-[#1a1b1e]"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 bg-white | dark:bg-black flex justify-center pl-4 rounded-tl-2xl | lg:rounded-tl-none lg:top-0 lg:bottom-auto lg:rounded-bl-3xl lg:px-0 lg:w-full lg:max-w-sm">
          <div className="absolute top-0 left-0 transform -translate-x-full w-12 hidden | lg:block bg-white | dark:bg-black z-20">
            <div className="w-full aspect-1/1 bg-black rounded-tr-2xl | lg:rounded-tr-3xl | dark:bg-[#1a1b1e]"></div>
          </div>
          <div className="absolute bottom-0 right-0 transform translate-y-full w-12 hidden | lg:block bg-white | dark:bg-black z-20">
            <div className="w-full aspect-1/1 bg-black rounded-tr-2xl | lg:rounded-tr-3xl | dark:bg-[#1a1b1e]"></div>
          </div>
          <svg
            id="Layer_1_bottom"
            className="w-10 h-10 text-white fill-current absolute left-px -bottom-px transform -translate-x-full rotate-180 dark:text-black lg:hidden"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            viewBox="0 0 100 100"
            xmlSpace="preserve"
          >
            <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
          </svg>

          <svg
            id="Layer_1_top"
            className="w-10 h-10 text-white fill-current absolute -right-px top-px transform -translate-y-full rotate-180 dark:text-black lg:hidden"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            viewBox="0 0 100 100"
            xmlSpace="preserve"
          >
            <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
          </svg>
          <Link
            href="#top"
            className="inline-flex text-black items-center space-x-1 font-light group transition-none pt-3 pb-1.5 | lg:pt-1.5 lg:pb-3 | dark:text-gray-100"
          >
            <div className="text-xs | lg:text-base">
              Sh*t I’ve gone too far, send me back up
            </div>
            <div className="animate-bounce">👆</div>
          </Link>
        </div>
        <div className="w-full flex flex-wrap justify-between mb-10 ml-20 pt-4 relative z-30 | md:mb-16 md:ml-28 md:pt-8 | lg:pt-0 lg:mb-20 lg:flex-nowrap lg:ml-28 xl:ml-40">
          <div className="w-full mb-10 flex flex-wrap flex-col | md:flex-row md:flex-nowrap md:mb-24 | lg:items-start lg:justify-start lg:flex-col lg:flex-wrap lg:pl-0 lg:mb-0 lg:w-7/16 | xl:w-6/16">
            <h2 className="text-xl | md:text-2-5xl | xl:text-3xl | 4xl:text-4xl font-medium tracking-tight text-white leading-tighter text-balance max-w-1xs mb-5 pr-10 | lg:max-w-xs | xl:h-auto | 4xl:max-w-sm">
              Do you like
              <br />
              what you see?
            </h2>
            <div className="flex items-start flex-col space-y-5 | md:mt-1 md:flex-row md:items-center md:space-y-0 md:space-x-5 | lg:mt-0 lg:space-y-5 lg:space-x-0 lg:items-start lg:flex-col | xl:w-full xl:items-center xl:flex-row xl:space-y-0 xl:space-x-8">
              <Buttons
                bg={"bg-[#d0ff71]"}
                text={"Start a project"}
                color={"text-black"}
                link={"/contact"}
              />
              <Link href="testimonials">
                <Image src="/images/reviews.png" alt='reviews' width={100} height={50}/>
              </Link>
            </div>
          </div>
          {/* Footer card one  */}
          <div className='w-8/16 relative z-20 transform -translate-x-12 | md:w-4/16 | lg:w-4/16 | xl:w-3/16'>
            <div className="text-gray-300 font-light mb-3 text-sm | dark:text-gray-100">Learn</div>
            <ul className='space-y-2'>
                <li className='flex items-center space-x-2'>
                    <Link href="/about" className='text-white relative link text-sm | md:text-sm |  | dark:text-gray-200 lg:dark:hover:text-gray-100 || group'>
                    About
                    <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right"></span>
                    </Link>
                </li>
                <li className='flex items-center space-x-2'>
                    <Link href="/about" className='text-white relative link text-sm | md:text-sm |  | dark:text-gray-200 lg:dark:hover:text-gray-100 || group'>
                    Testimonials
                    <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right"></span>
                    </Link>
                </li>
                <li className='flex items-center space-x-2'>
                    <Link href="/about" className='text-white relative link text-sm | md:text-sm |  | dark:text-gray-200 lg:dark:hover:text-gray-100 || group'>
                    Blog
                    <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right"></span>
                    </Link>
                </li>
            </ul>
          </div>
          {/* Footer card two  */}
          <div className='w-8/16 relative z-20 transform -translate-x-12 | md:w-4/16 | lg:w-4/16 | xl:w-3/16'>
            <div className="text-gray-300 font-light mb-3 text-sm | dark:text-gray-100">Explore</div>
            <ul className='space-y-2'>
                <li className='flex items-center space-x-2'>
                    <Link href="/" className='text-white relative link text-sm | md:text-sm |  | dark:text-gray-200 lg:dark:hover:text-gray-100 || group'>
                    Home
                    <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right"></span>
                    </Link>
                </li>
                <li className='flex items-center space-x-2'>
                    <Link href="/work" className='text-white relative link text-sm | md:text-sm |  | dark:text-gray-200 lg:dark:hover:text-gray-100 || group'>
                    Work
                    <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right"></span>
                    </Link>
                    <div className="-mt-0.5 uppercase pointer-events-none rounded-full z-20 bg-[#d0ff71] text-black text-[10px] pt-0.5 pb-px px-2 leading-tighter tracking-tight">New</div>
                </li>
                <li className='flex items-center space-x-2'>
                    <Link href="/services" className='text-white relative link text-sm | md:text-sm |  | dark:text-gray-200 lg:dark:hover:text-gray-100 || group'>
                    Services
                    <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right"></span>
                    </Link>
                </li>
                <li className='flex items-center space-x-2'>
                    <Link href="/contact" className='text-white relative link text-sm | md:text-sm |  | dark:text-gray-200 lg:dark:hover:text-gray-100 || group'>
                    Contact
                    <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right"></span>
                    </Link>
                </li>
            </ul>
          </div>
          <div className='w-full mt-5 max-w-xs transform -translate-x-12 | md:mt-0 | lg:mt-20 | xl:max-w-sm | 2xl:max-w-md'>
            <div className='flex flex-col items-start'>
                <div className='text-gray-200 font-light mb-3 text-sm dark:text-grayDark-100'>Get in touch</div>
                <Link href="tel:+8801302032326" className='inline-flex items-center space-x-4 mb-1 text-white text-sm | lg:text-base | lg:dark:hover:text-gray-100 | dark:text-gray-200'>
                    <FaPhone className='w-3 h-3'/>
                    <div className='link text-sm group relative'>01302 032 326
                    <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right"></span>
                    </div>
                </Link>
                <Link href="mailto:hello@webcareacademy.com" className='inline-flex items-center space-x-4 mb-8 text-white text-sm | lg:text-base | lg:dark:hover:text-gray-100 | dark:text-gray-200'>
                    <FaEnvelope className='w-3 h-3'/>
                    <div className='link text-sm group relative'>hello@webcareacademy.com
                    <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right"></span>
                    </div>
                </Link>
                <span className='inline-flex space-x-4 mb-1 text-white text-sm | lg:text-base | lg:dark:hover:text-gray-100 | dark:text-gray-200'>
                    <FaMapMarkerAlt className='w-3 h-3 mt-1'/>
                    <p className='link text-sm group relative leading-[1.6]'>
                    Web Care Academy
                    <br/>
                    Cumilla
                    <br/>
                    Dhaka, Bangladesh
                    </p>
                </span>
            </div>
          </div>
        </div>
        <div className='w-full justify-center mb-12 hidden | lg:flex'>
            <div className="text-white leading-none tracking-tight text-3xl text-center font-medium | lg:text-[9vw]">Crafting since 2020</div>
        </div>
        <div className='w-full flex flex-wrap items-center justify-between px-6 | lg:px-20 | xl:px-24'>
            <div className='inline-flex flex-row items-start pr-8 | lg:space-x-5 lg:items-center'>
                <span className='text-white fill-current hidden lg:inline-block'>WebCare.</span>
                <div className='inline-flex flex-row text-gray-300 w-auto text-xs | md:text-xs | lg:text-xs | dark:text-gray-300'>
                    <div>© Web Care Academy Ltd 2025</div>
                    <div className="mx-2 | lg:mx-5 sr-only">|</div>
                    <div className='sr-only'>Company Reg Number 10529058</div>
                </div>
            </div>
            <div className='inline-flex flex-row text-gray-300 w-auto text-[10px] | md:text-xs | lg:text-xs | dark:text-gray-300'>
                <Link href="/" className='link | xl:hover:text-white | lg:dark:hover:text-gray-100'>Web Care Academy</Link>
                <div className="mx-2 | lg:mx-5">|</div>
                <div>All Rights Reserved</div>
                <div className="mx-2 | lg:mx-5">|</div>
                <Link href="/privacy-policy" className='link | xl:hover:text-white hidden lg:block | lg:dark:hover:text-gray-100'>Privacy Policy (you really care?)</Link>
                <Link href="/privacy-policy" className='link lg:hidden | xl:hover:text-white | lg:dark:hover:text-gray-100'>Privacy Policy</Link>
            </div>
        </div>
      </div>
    </div>
  );
}
