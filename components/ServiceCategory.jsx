import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ServiceCategory({designServices, title, desc}) {
    return (
        <div className="w-full">
            <div className="w-full pb-10 | lg:pb-16 | 2xl:pb-24">
                <div className="px-2 | sm:px-6 | xl:px-12 | 2xl:px-40">
                    <div className="px-2 | lg:px-3 | xl:px-4 w-full">
                        <div className="border-t border-solid border-gray-100 pt-10 | dark:border-gray-300"></div>
                    </div>
                    <div className="w-full flex flex-wrap mb-10 | lg:mb-40">
                        <div className="px-2 | lg:px-3 | xl:px-4 w-full">
                            <div className="w-full">
                                <h2 className="text-[20vw] | lg:text-[20vw] font-medium tracking-tight text-black  | dark:text-white leading-none text-balance">{title}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap justify-between">
                        <div className="px-2 | lg:px-3 | xl:px-4 w-full mb-5 | lg:mb-0 lg:w-7/16">
                            <h2 className="text-2xl | md:text-3xl | xl:text-4xl font-medium tracking-tight text-black  | dark:text-white leading-tight text-balancepr-10 | lg:pr-0">
                                {desc}</h2>
                        </div>
                        <div className="px-2 | lg:px-3 | xl:px-4 w-full mb-5 | lg:w-8/16">
                            {designServices.map((service, index) => (
                                <Link key={index} href={service.link} data-cursor className="w-full flex items-center justify-between border-b border-solid border-gray-100 py-4 group dark:border-gray-300 dark:text-white transition-all transform duration-300 | xl:hover:border-gray-600 lg:dark:hover:border-gray-100">
                                    <div className="inline-flex items-center space-x-6">
                                        <div className="font-light text-sm relative z-10">
                                            0{index + 1}</div>
                                        <div className="text-lg transition-transform transform duration-300 | xl:group-hover:translate-x-2">
                                            {service.title}</div>
                                    </div>
                                    <div className="flex-shrink-0 w-7 h-7 bg-[#d0ff71] rounded-full flex items-center justify-center | dark:bg-gray-400 | xl:hidden">
                                        <ArrowUpRight className="text-black w-3 h-3" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
