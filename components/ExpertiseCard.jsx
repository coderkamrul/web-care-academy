// import React from "react";
// import CustomCursorWrapper from "./CustomCursorWrapper";
// import Link from "next/link";
// import Image from "next/image";

// export default function ExpertiseCard({ image, text, link }) {
//   return (

//       <div data-cursor className="w-full group border-b border-solid border-gray-400 | dark:border-gray-300">
//         <Link
//           href={link || "#"}
//           className="flex group items-center relative w-full transform group py-4 transition-opacity | lg:py-6"
//         >
//           <div className="relative flex-shrink-0 rotate-001 duration-700 bg-white translate-z-0 rounded-xl overflow-hidden inline-flex items-center justify-center transition-all transform-gpu h-16 md:h-28 lg:rounded-2xl 2xl:h-40 dark:bg-black lg:w-0 w-20 | md:w-36 group-hover:w-36">
//             <div className="w-full h-full transition-opacity | lg:opacity-0 opacity-100 group-hover:opacity-100">
//               <Image
//                 src={image}
//                 alt="Brand Identity"
//                 width={200}
//                 height={200}
//                 className=" w-full h-full absolute top-0 left-0 object-cover object-center"
//               />
//             </div>
//           </div>
//           <div className="inline-flex relative transition-transform transform | lg:translate-x-0 translate-x-6 delay-100">
//             <div className="text-[8vw] | lg:text-[7vw] | 2xl:text-[6vw] font-sans-primary tracking-tight text-white leading-tighter text-balance">
//               {text}
//             </div>
//           </div>
//         </Link>
//       </div>
//   );
// }

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ExpertiseCard({
  image,
  text,
  link,
  isActive,
  onHover,
  onLeave,
}) {
  return (
    <div
      className="w-full group border-b border-solid border-gray-400 dark:border-gray-300"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link
        data-cursor
        href={link || "#"}
        className="flex group items-center relative w-full transform py-4 transition-opacity lg:py-6"
      >
        {/* Image block */}
        <div className="relative flex-shrink-0 rotate-001 duration-700 translate-z-0 rounded-xl overflow-hidden inline-flex items-center justify-center transform-gpu h-16 md:h-28 lg:rounded-2xl 2xl:h-40 lg:w-0 w-20 md:w-36 group-hover:w-36">
          <div className="w-full h-full transition-opacity duration-700 ease-in-out opacity-100 lg:opacity-0 group-hover:opacity-100">
            <Image
              src={image}
              alt={text}
              width={200}
              height={200}
              className="w-full h-full absolute top-0 left-0 object-cover object-center"
            />
          </div>
        </div>

        {/* Text block */}
        <div className="inline-flex relative transition-transform transform lg:translate-x-0 translate-x-6 delay-100">
          <div
            className={`text-[8vw] lg:text-[7vw] 2xl:text-[6vw] font-medium tracking-tight leading-tighter text-balance transition-colors duration-300 
              ${isActive ? "text-white" : "text-gray-400"}`}
          >
            {text}
          </div>
        </div>
      </Link>
    </div>
  );
}
