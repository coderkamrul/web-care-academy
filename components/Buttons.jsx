import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Buttons({ bg , text,Texticon, color, link , icon, rotateIcon, onClick}  ) {

  
  return (
    <div className="">
      <div className="relative group inline-flex items-center">
        {/* SVG Filter (kept once in DOM) */}
        <svg
          width="0"
          height="0"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <defs>
            <filter id="buttonFilter" colorInterpolationFilters="sRGB">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="5"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 19 -9"
                result="buttonFilter"
              />
              <feComposite
                in="SourceGraphic"
                in2="buttonFilter"
                operator="atop"
              />
              <feBlend in="SourceGraphic" in2="buttonFilter" />
            </filter>
          </defs>
        </svg>

        {/* Button */}
        {onClick ? (
          <button
          onClick={onClick}
          style={{ filter: "url(#buttonFilter)" }}
          className="inline-flex relative outline-none focus:outline-none cursor-pointer"
        >
          {/* Main Pill */}
          <div
            className={`w-auto inline-flex items-center justify-center relative leading-tight overflow-hidden rounded-full ${color} py-2 px-5 ${bg} `}
          >
            <span className="relative text-sm tracking-tight">
              {text || "Start a project"} {Texticon ? Texticon : null}
            </span>
          </div>

          {/* Circle with Icon */}
          <div
            className={`${bg} flex-shrink-0 overflow-hidden flex items-center justify-center -ml-1 rounded-full transform transition-transform duration-300 ease-out w-9 h-9 group-hover:translate-x-3 group-hover:${rotateIcon || "rotate-45"}`}
            
          >
          {icon ?
          icon :

            <ArrowUpRight className={`w-4 h-4 ${color} transition-transform duration-300 ease-out`}/>
          }
          </div>
        </button>
        ):(
        <Link
          href={link || "#"}
          style={{ filter: "url(#buttonFilter)" }}
          className="inline-flex relative outline-none focus:outline-none"
        >
          {/* Main Pill */}
          <div
            className={`w-auto inline-flex items-center justify-center relative leading-tight overflow-hidden rounded-full ${color} py-2 px-5 ${bg} `}
          >
            <span className="relative text-sm tracking-tight flex gap-2 items-center">
              {text || "Start a project"} {Texticon ? Texticon : null}
            </span>
          </div>

          {/* Circle with Icon */}
          <div
            className={`${bg} flex-shrink-0 overflow-hidden flex items-center justify-center -ml-1 rounded-full transform transition-transform duration-300 ease-out w-9 h-9 group-hover:translate-x-3 group-hover:${rotateIcon || "rotate-45"}`}
            
          >
          {icon ?
          icon :

            <ArrowUpRight className={`w-4 h-4 ${color} transition-transform duration-300 ease-out`}/>
          }
          </div>
        </Link>
        )}
      </div>
    </div>
  );
}
