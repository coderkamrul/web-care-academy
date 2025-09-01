"use client";
import Buttons from '@/components/Buttons';
import ContactForm from '@/components/ContactForm';
import { ArrowDownRight, ArrowUpRight, Contact } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import  {React, useRef, useState } from 'react'
import { FaBehance, FaGithub, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPlay } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoMdPlay } from 'react-icons/io'
import { MdOutlinePause } from 'react-icons/md'


const faqData = [
  {
    id: 1,
    question: "How long does a website project usually take to complete?",
    answer: "<p>Most projects take between <strong>4–8 weeks</strong>, depending on complexity and how fast feedback is provided.</p>",
  },
  {
    id: 2,
    question: "Do you provide website maintenance after launch?",
    answer: "<p>Yes ✅, we offer <a href='/maintenance' className='text-blue-600 underline'>ongoing maintenance packages</a> to keep your site secure and updated.</p>",
  },
  {
    id: 3,
    question: "Can you redesign my existing website?",
    answer: "<p>Absolutely! We specialize in <em>modern redesigns</em> while keeping your brand identity consistent.</p>",
  },
  {
    id: 4,
    question: "Can you redesign my existing website?",
    answer: "<p>Absolutely! We specialize in <em>modern redesigns</em> while keeping your brand identity consistent.</p>",
  },
  {
    id: 5,
    question: "Can you redesign my existing website?",
    answer: "<p>Absolutely! We specialize in <em>modern redesigns</em> while keeping your brand identity consistent.</p>",
  },
  {
    id: 6,
    question: "Can you redesign my existing website?",
    answer: "<p>Absolutely! We specialize in <em>modern redesigns</em> while keeping your brand identity consistent.</p>",
  },
];

export default function page() {
  const videoRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState({ current: 0, duration: 0 });
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleClick = () => {
    const videoEl = videoRef.current;
    // Set this card as active

    videoEl.muted = false;
    videoEl.currentTime = 0;
    videoEl.play();
    setClicked(true);
    setPlaying(true);
  };


  const togglePlayPause = () => {
    const videoEl = videoRef.current;
    if (videoEl.paused) {
      videoEl.play();
      setPlaying(true);
    } else {
      videoEl.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const videoEl = videoRef.current;
    setProgress((videoEl.currentTime / videoEl.duration) * 100);
    setTime({ current: videoEl.currentTime, duration: videoEl.duration });
  };

  const handleEnded = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Reset to muted autoplay mode
    videoEl.muted = true;
    videoEl.currentTime = 0;
    videoEl.play();

    // Reset states
    setClicked(false);
    setPlaying(false);
    setProgress(0);
  };


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div className="w-full pt-20 pb-10 | lg:pt-32 lg:pb-16 | xl:pt-40">
        <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40 '>
          <div className='w-full flex justify-between border-b border-solid border-gray-100 pb-10 | lg:pb-10 | dark:border-gray-600'>
            <div className='px-2 | lg:px-3 | xl:px-4 relative w-11/16 mb-10 | lg:mb-0 lg:w-12/16 | 2xl:w-13/16'>
              <div className='w-full relative'>
                <h1 className="inline-flex items-center space-x-2 relative mb-3 | lg:absolute lg:top-8 lg:left-0 ">
                  <div className="bg-black | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                  <div className="font-light text-sm | lg:text-base text-black | dark:text-gray-100">Contact</div>
                </h1>
                <h2 className="text-[9vw] | md:text-[9vw] | lg:text-[8vw] font-medium tracking-tight text-black | dark:text-white leading-none text-balance lg:indent-32 | xl:indent-48">
                  It's nice to<br />
                  meet ya
                  <Link href="#form" className="relative ml-4 lg:ml-6 top-2 bg-[#d0ff71] rounded-full transform inline-flex w-9 h-9 | md:w-16 md:h-16 | lg:top-3 lg:w-[6vw] lg:h-[6vw] | xl:hover:rotate-45 xl:hover:scale-90 duration-500">

                    <div className="sr-only">Scroll to next section</div>
                    <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
                      <ArrowDownRight className='w-5 h-5 lg:w-10 lg:h-10 text-black' />
                    </div>
                  </Link>
                </h2>
              </div>
            </div>
            <div className='px-2 | lg:px-3 | xl:px-4 w-6/12 | sm:w-4/12 | md:w-3/12 | lg:w-2/12 | xl:w-2/12 | 2xl:w-2/12 '>
              <div className=''>
                <div className='w-full relative rounded-2xl bg-gray-50 aspect-9/14  overflow-hidden group transform-gpu | lg:rounded-3xl | dark:bg-gray-800'>
                  <video ref={videoRef}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    src='/images/contact-page-video.mp4' playsInline muted autoPlay controlsList="nodownload nofullscreen noremoteplayback" className='w-full h-full absolute top-0 left-0 z-10 object-cover object-center pb-px || js-video js-video-with-sound js-video-421146 js-video-playing'></video>

                  {!clicked && (
                    <div
                      onClick={handleClick}
                      className="absolute top-0 left-0 w-full h-full z-30 flex items-end justify-end p-5 cursor-pointer"
                    >
                      <div className="bg-[#d0ff71] flex-shrink-0 rounded-full flex items-center justify-center transition-transform transform | xl:group-hover:scale-110 w-14 h-14 | md:w-16 md:h-16">
                        <FaPlay className='text-black' />
                      </div>
                    </div>
                  )}

                  {clicked && (
                    <div
                      onClick={togglePlayPause}
                      className="absolute top-0 left-0 w-full h-full z-30 opacity-0 cursor-pointer"
                    ></div>
                  )}
                  {clicked && (
                    <>
                      <div className="absolute inline-flex items-center space-x-3 z-40 transition-opacity opacity-100 bottom-6 left-3 lg:bottom-8 lg:left-4 pointer-events-auto">
                        <button
                          onClick={togglePlayPause}
                          className="w-10 h-10 bg-gray-900/60 text-white rounded-full cursor-pointer flex items-center justify-center"
                        >
                          {playing ? <MdOutlinePause size={16} /> : <IoMdPlay size={16} />}
                        </button>
                        <div className="text-white text-sm">
                          {formatTime(time.current)}
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 z-20 w-full px-5 pb-4">
                        <div className="h-0.5 w-full bg-white/30">
                          <div className="h-0.5 bg-[#d0ff71] transition-all" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="form" className="pt-32 -mt-32"></div>
      <div className='w-full'>
        <div className='w-full pb-20 | lg:pb-24 | 2xl:pb-40'>
          <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
            <div className='w-full flex flex-wrap justify-between | lg:-mt-4'>
              <div className='px-2 | lg:px-3 | xl:px-4 w-full mb-10 order-2 | lg:order-1 lg:mb-0 lg:w-5/16'>
                <div className="w-full relative pr-5 | lg:max-w-sm | lg:pr-0  mb-5">
                  <p className="text-base | xl:text-md text-black dark:text-white relative z-10 text-pretty font-light leading-7  mb-6">For general enquiries, please fill out the form to get in touch. Alternatively, if you know your project details — head over to our project planner for a more refined step-by-step process.</p>
                </div>
                <Buttons
                  bg={"bg-[#d0ff71]"}
                  text={"Go to project planner"}
                  color={"text-black"}
                  link={"/project-planner"} />
                <div className="w-full mt-6 flex flex-col | xl:flex-row xl:space-x-4">
                  <div className="text-gray-600 font-light text-sm | dark:text-gray-300">Hate contact forms?</div>
                  <Link href="mailto:hello@webcareacademy.com" className="link | relative dark:text-gray-100 group">
                    hello@webcareacademy.com
                    <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right"></span>
                  </Link>
                </div>
              </div>
              <div className='px-2 | lg:px-3 | xl:px-4 w-full order-1 mb-10 | lg:mb-0 lg:order-2 lg:w-10/16'>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full pb-20 | lg:pb-24 | 2xl:pb-40'>
          <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
            <div className='px-2 | lg:px-3 | xl:px-4 w-full relative flex flex-wrap'>
              <div className='w-full bg-gray-50 rounded-2xl transform-gpu flex flex-wrap justify-between p-8 | lg:rounded-3xl lg:p-10 | dark:bg-[#1a1b1e]'>

                <div className='w-full | lg:w-6/16 lg:py-12'>
                  <h2 className='text-2xl | md:text-3xl | xl:text-4xl font-medium tracking-tight text-black  | dark:text-white leading-none text-balance mb-3'>
                    Our Manchester Studio
                  </h2>
                  <div className="w-full relative mb-5 | lg:max-w-sm lg:mb-10">
                    <p className="text-base | xl:text-md text-black dark:text-gray-200 font-normal relative z-10 text-pretty leading-7  mb-6">Just a short drive from Manchester city centre, our Studio is in a very convenient location, near two train stations, a motorway, and the east Lancashire road.
                    </p>
                  </div>
                  <div className='w-full flex flex-col space-y-5 mb-10 | md:space-y-0 md:flex-row md:space-x-5'>
                    <div className='flex-1'>
                      <div className="text-gray-700 font-light text-sm mb-2 | dark:text-gray-300">Studio Address</div>
                      <div className='flex space-x-3'>
                        <div className='flex-shrink-0 pt-1.5'>
                          <FaMapMarkerAlt className='text-black | dark:text-gray-100' />
                        </div>
                        <div className='dark:text-gray-200 text-sm'>
                          <p>MadeByShape<br />1 Gibfield Park Avenue<br />Atherton Manchester<br />M46 0SU</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex-1'>
                      <div className="text-gray-700 font-light text-sm mb-2 | dark:text-gray-300">Follow us</div>
                      <div className='flex items-center space-x-1.5'>
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
                          <FaXTwitter />
                        </Link>
                        <Link
                          href="/linkedin"
                          className="inline-flex items-center justify-center bg-[#d0ff71] text-black translate-z-0 rounded-full w-8 h-8 duration-400 | xl:hover:bg-black xl:hover:text-white | lg:dark:hover:bg-bg-[#1a1b1e]"
                        >
                          <FaGithub />
                        </Link>
                        <Link
                          href="/linkedin"
                          className="inline-flex items-center justify-center bg-[#d0ff71] text-black translate-z-0 rounded-full w-8 h-8 duration-400 | xl:hover:bg-black xl:hover:text-white | lg:dark:hover:bg-bg-[#1a1b1e]"
                        >
                          <FaInstagram />
                        </Link>
                        <Link
                          href="/linkedin"
                          className="inline-flex items-center justify-center bg-[#d0ff71] text-black translate-z-0 rounded-full w-8 h-8 duration-400 | xl:hover:bg-black xl:hover:text-white | lg:dark:hover:bg-bg-[#1a1b1e]"
                        >
                          <FaBehance />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <Buttons
                    bg={"bg-black | dark:bg-[#26282c]"}
                    text={"Get directions"}
                    color={"text-white"}
                    link={"https://goo.gl/maps/3n1y3pX4mGz4Z5eA9"} />
                </div>

                <div className='w-full h-60 relative overflow-hidden transform-gpu rounded-xl mt-10 bg-gray-100 | md:h-80 | dark:bg-gray-400 | lg:rounded-2xl lg:mt-0 lg:h-auto lg:w-9/16'>
                  <Image src="/images/contact-cover.png" alt="Contact illustration" width={1200} height={675} className=' w-full h-full object-cover' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full pb-20 | lg:pb-24 | 2xl:pb-40'>
          <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
            <div className='w-full flex flex-wrap justify-between'>
              <div className='px-2 | lg:px-3 | xl:px-4 w-full mb-10 | lg:mb-0 lg:w-5/16 | xl:w-5/16'>
                <div className='w-full | lg:sticky lg:top-32 lg:left-0'>
                  <div className='flex flex-col space-y-3 | lg:space-y-5 items-start'>
                    <h2 className="inline-flex items-center space-x-2  ">
                      <div className="bg-black | dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
                      <div className="font-light text-sm text-black | dark:text-gray-100">Anything else?</div>
                    </h2>
                    <h2 className="text-2xl | md:text-3xl mb-8 | xl:text-4xl font-medium tracking-tight text-black  | dark:text-white leading-none text-balance max-w-lg | lg:max-w-none">
                      The answers to your questions.
                    </h2>
                    <Buttons
                      bg={"bg-[#d0ff71]"}
                      text={"View all FAQs"}
                      color={"text-black"}
                      link={"/faq"} />
                  </div>
                </div>
              </div>
              <div className='px-2 | lg:px-3 | xl:px-4 w-full | lg:w-10/16 | xl:w-9/16'>
                <div className="w-full">
                  {faqData.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <div
                        key={faq.id}
                        className="w-full rounded-2xl bg-gray-50 mb-4 lg:rounded-3xl dark:bg-[#1a1b1e]"
                      >
                        {/* Toggle button */}
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="flex justify-between items-center text-left cursor-pointer w-full p-6 focus:outline-none"
                        >
                          <h3 className="text-lg 4xl:text-xl font-sans-primary tracking-tight text-black dark:text-gray-100 leading-tighter text-balance pr-10">
                            {faq.question}
                          </h3>

                          {/* Rotating icon */}
                          <div
                            className={`flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                              } dark:bg-[#26282c]`}
                          >
                            <ArrowUpRight className="text-white w-4 h-4" />
                          </div>
                        </button>

                        {/* Collapsible content */}
                        <div
                          className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                          <div className="w-full pl-6 pb-6 pr-6 lg:pr-28">
                            <div
                              className="w-full relative prose dark:prose-invert max-w-none"
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
