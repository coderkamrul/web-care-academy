import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';

export default function SmoothMarquee({ direction = 'left' }) {
  return (
    <div className="relative w-full overflow-hidden py-0" data-cursor>
      {/* Marquee content duplicated for seamless loop */}
      <div
        className={`flex whitespace-nowrap ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {[...Array(10)].map((_, idx) => (
          <div key={idx} className="px-2 lg:px-3 xl:px-4 inline-flex flex-shrink-0 w-auto">
            <Link href="/contact" className="inline-flex flex-shrink-0 items-center">
              <div className="text-[20vw] md:text-[11vw] lg:text-[10vw] 2xl:text-[8vw] font-medium tracking-normal text-black dark:text-gray-100 leading-tight text-balance">
                Let's work together.
              </div>
              <div className="ml-4 mt-2 w-16 h-16 rounded-full bg-[#d0ff71] flex items-center justify-center md:mt-4 lg:mt-3 lg:w-24 lg:h-24 xl:hidden">
                <GoArrowUpRight className="w-10 h-10 text-black" />
              </div>
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          display: inline-flex;
          animation: marquee-left 50s linear infinite;
        }
        .animate-marquee-right {
          display: inline-flex;
          animation: marquee-right 50s linear infinite;
        }
      `}</style>
    </div>
  );
}
