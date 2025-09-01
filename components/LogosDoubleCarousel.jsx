import React from 'react'
import PlateCorner from './PlateCorner'
import Buttons from './Buttons'
import LogoMarquee from './LogoMarquee';
const logos = [
  "/images/logo-1.svg",
  "/images/logo-2.svg",
  "/images/logo-3.svg",
  "/images/logo-4.svg",
  "/images/logo-5.svg",
  "/images/logo-1.svg",
  "/images/logo-2.svg",
  "/images/logo-3.svg",
  "/images/logo-4.svg",
  "/images/logo-5.svg",
  "/images/logo-1.svg",
  "/images/logo-2.svg",
  "/images/logo-3.svg",
  "/images/logo-4.svg",
  "/images/logo-5.svg",
  "/images/logo-1.svg",
  "/images/logo-2.svg",
  "/images/logo-3.svg",
  "/images/logo-4.svg",
  "/images/logo-5.svg",
  "/images/logo-1.svg",
  "/images/logo-2.svg",
  "/images/logo-3.svg",
  "/images/logo-4.svg",
  "/images/logo-5.svg",
  "/images/logo-1.svg",
  "/images/logo-2.svg",
  "/images/logo-3.svg",
  "/images/logo-4.svg",
  "/images/logo-5.svg",
  "/images/logo-1.svg",
  "/images/logo-2.svg",
  "/images/logo-3.svg",
  "/images/logo-4.svg",
  "/images/logo-5.svg",
  "/images/logo-1.svg",
  "/images/logo-2.svg",
  "/images/logo-3.svg",
  "/images/logo-4.svg",
  "/images/logo-5.svg",
  "/images/logo-1.svg",
  "/images/logo-2.svg",
  "/images/logo-3.svg",
  "/images/logo-4.svg",
  "/images/logo-5.svg",
];

export default function LogosDoubleCarousel() {
  return (
    <div>
        <div className='w-full pb-20 | lg:pb-24 | 2xl:pb-32 px-2 | lg:px-3 | xl:px-4'>
            <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40'>
                <div className='w-full py-20 | lg:py-24 | 2xl:py-32 bg-black relative overflow-hidden rounded-tl-none rounded-2xl transform-gpu | lg:rounded-tl-none lg:rounded-3xl | dark:bg-[#1a1b1e]'>
                    <div className='px-0'>
                        <PlateCorner/>
                        <div className='px-2 | sm:px-6 | xl:px-12 | 2xl:px-40 w-full flex flex-wrap | lg:justify-end'>
                            <div className='px-2 | lg:px-3 | xl:px-4 w-auto flex flex-col items-start'>
                                <div className='flex flex-col space-y-3 | lg:space-y-5 items-start'>
                                    <div className='inline-flex items-center space-x-2  '>
                                        <div className='bg-white w-1.5 h-1.5 rounded-full'></div>
                                        <div className="font-light text-sm | lg:text-base text-white">Shameful Plug</div>
                                    </div>
                                    <h2 className="text-2xl | md:text-3xl | xl:text-[40px] font-medium tracking-tight text-white leading-tight text-balance max-w-2xl | xl:max-w-3xl">
                                    <p>We work with start-up businesses through to global organisations.</p>
                                    </h2>
                                </div>
                                <div className='flex space-x-5 mt-5'>
                                    <Buttons bg={"bg-[#d0ff71]"} text={"Get in touch today"} color={"text-black"} link={"/contact"}/>
                                </div>
                            </div>
                        </div>
                        <div className='mt-12'>
                             <LogoMarquee logos={logos} direction="left" speed={6000} />
                        </div>
                        <div className='mt-12'>
                             <LogoMarquee logos={logos} direction="right" speed={6000} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
