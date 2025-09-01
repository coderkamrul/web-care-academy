import Link from "next/link";
import Buttons from "./Buttons";

export default function MobileMenu() {
  return (
    <div className="w-full relative z-10 lg:hidden mt-8">
      <div className="w-full px-2 pt-8 pb-3">
        <div className="w-full">
          {/* Small Heading */}
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-gray-600 dark:bg-gray-100 w-1.5 h-1.5 rounded-full"></div>
            <div className="font-light text-xs lg:text-base text-gray-600 dark:text-gray-100">
              Have a look around...
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col items-start space-y-3">
            <li className="relative">
              <div className="absolute -top-3 -right-4 pointer-events-none rounded-full z-20 bg-[#d0ff71] text-gray-600 text-xs pt-px px-2 leading-tight tracking-tight">
                13
              </div>
              <Link
                href="/services"
                className="link text-4xl tracking-tight leading-none transition-none dark:text-white"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/work"
                className="link text-4xl tracking-tight leading-none transition-none dark:text-white"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="link text-4xl tracking-tight leading-none transition-none dark:text-white"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/web-design-blog"
                className="link text-4xl tracking-tight leading-none transition-none dark:text-white"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="link text-4xl tracking-tight leading-none transition-none dark:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="w-full mt-6">
          <Buttons
            bg={"bg-[#d0ff71]"}
            text={"Start a project"}
            color={"text-black"}
          />
        </div>
      </div>
    </div>
  );
}
