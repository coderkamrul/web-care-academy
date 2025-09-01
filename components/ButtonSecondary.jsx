import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ButtonSecondary({ text, visiblity }) {
  return (
    <div className={`${visiblity} | lg:inline-flex`}>
      <div className="relative group inline-flex items-center">
        <Link
          href="/"
          className="inline-flex relative group outline-none link | focus:outline-none "
        >
          <div className="inline-flex items-center justify-center relative leading-tight shadow-none overflow-hidden rounded-full border-default text-gray-800 dark:text-white py-1 mt-1 pr-3">
            <div className="relative inline-flex top-px text-sm flex-shrink-0">
              {text || "Meet the team"}
            </div>
          </div>
          <span className="absolute left-0 -bottom-0 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right"></span>
          <div className="mt-1 flex items-center justify-center z-20 transition-transform transform">
            <div className="relative overflow-hidden text-black | dark:text-white">
              <div className="relative top-0 left-0 transition-transform transform xl:group-hover:translate-x-full xl:group-hover:-translate-y-full">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="absolute top-0 left-0 transition-transform transform translate-y-full -translate-x-full  xl:group-hover:translate-x-0 xl:group-hover:translate-y-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
