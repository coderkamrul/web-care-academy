"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyContact() {
  const [show, setShow] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const b = document.body.offsetHeight;

      setShow(y > h / 3 && h + y < b - 1000);
      setRotation(y / 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 right-0 my-6 mx-8 z-50 hidden md:block transition duration-300 ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <Link
        href="/contact"
        className="w-28 h-28 relative bg-[#d0ff71] rounded-full flex items-center justify-center group"
      >
        <div className="text-3xl relative top-0">👀</div>
        <div className="absolute top-0 left-0 w-full h-full p-2.5">
          <div
            className="w-full h-full transition-transform duration-300 xl:group-hover:rotate-180"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg
              viewBox="0 0 220 220"
              className="w-full h-full text-black fill-current spin-slow"
            >
              <defs>
                <path
                  id="circlePath"
                  d="
                    M 110, 110
                    m -90, 0
                    a 90,90 0 1,1 180,0
                    a 90,90 0 1,1 -180,0
                  "
                />
              </defs>
              <text fontSize="16" className="tracking-[2] font-normal">
                <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                  Let’s Talk website • Let’s Talk branding • Let’s Talk SEO •
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}
