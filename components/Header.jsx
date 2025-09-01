"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowBigRight, ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

const Header = () => {
  const headerRef = useRef(null);
  const [lastScroll, setLastScroll] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const SHRINK_THRESHOLD = 50;
  const HIDE_THRESHOLD = 500;
  const menuRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const prevStyles = useRef({ width: "100%", opacity: 0 });
  const headerWrapRef = useRef(null);
  const pathname = usePathname()

  // ✅ Animate open/close
  useEffect(() => {
    const header = headerRef.current;
    const menu = menuRef.current;
    if (!header || !menu) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    if (isOpen) {
      // Save current width + opacity
      const cs = getComputedStyle(header);
      prevStyles.current.width = cs.width;
      prevStyles.current.opacity =
        parseFloat(cs.getPropertyValue("--header-bg-opacity")) || 0;

      document.body.style.overflow = "hidden"; // stop scroll

      // OPEN sequence
      tl.to(header, { width: "94vw", "--header-bg-opacity": 1, duration: 0.4 })
        .fromTo(
          menu,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.4, clearProps: "height" }
        )
        .fromTo(
          menu.querySelectorAll("a, li, button"),
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 },
          "-=0.2"
        );
    } else {
      document.body.style.overflow = ""; // restore scroll

      // CLOSE sequence
      tl.to(menu.querySelectorAll("a, li, button"), {
        y: -10,
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
      })
        .to(menu, { height: 0, opacity: 0, duration: 0.3 })
        .to(header, {
          width: prevStyles.current.width,
          "--header-bg-opacity": prevStyles.current.opacity,
          duration: 0.4,
        });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        headerRef.current &&
        !headerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const headerWrap = headerWrapRef.current;
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const isDesktop = window.innerWidth >= 1024;
      const shrinkWidth = isDesktop ? "60rem" : "16rem";

      if (currentScroll <= 0) {
        // Top of page → wide + transparent background
        headerWrap.style.pointerEvents = "auto";
        gsap.to(header, {
          width: "99vw",
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          backdropFilter: "blur(0px)",
        });

        header.style.setProperty("--header-bg-opacity", "0"); // custom var
      } else if (currentScroll > lastScroll) {
        // Scrolling down
        headerWrap.style.pointerEvents = "auto";
        if (currentScroll > HIDE_THRESHOLD) {
          gsap.to(header, {
            y: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            backdropFilter: "blur(10px)",
          });
        } else if (currentScroll > SHRINK_THRESHOLD) {
          gsap.to(header, {
            width: shrinkWidth,
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            backdropFilter: "blur(10px)",
          });

          header.style.setProperty("--header-bg-opacity", "0.8"); // show bg
        }
      } else {
        // Scrolling up
        headerWrap.style.pointerEvents = "auto";
        gsap.to(header, {
          y: 0,
          width: shrinkWidth,
          opacity: 1,
          duration: 0.5,
          backdropFilter: "blur(10px)",
          ease: "power2.out",
        });

        header.style.setProperty("--header-bg-opacity", "0.8"); // show bg
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div id="top" ref={headerWrapRef} className="overflowx-hidden fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full rounded-full">
      <div className="relative  inline-flex justify-center z-20 py-2 | lg:py-3 w-full">
        <div className="w-full flex justify-center transition-transform transform duration-1000 translate-y-0">
          <header
            ref={headerRef}
            className="flex w-full z-50 flex-wrap items-center justify-between relative px-2 py-1 rounded-3xl transition-borderRadius | lg:p-4 lg:rounded-full 
         
             [background-color:rgb(245_245_245/var(--header-bg-opacity))]
             dark:[background-color:rgb(38_40_44/var(--header-bg-opacity))]"
            style={{ "--header-bg-opacity": 0 }}
          >
            <div className="ml-2 relative z-10 | lg:ml-4 lg:mr-6">
              <Link href={"/"} className="transition-none | dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 75"
                  className="fill-current w-30 h-10 lg:w-32 lg:h-12"
                >
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="40"
                    fontWeight="bold"
                  >
                    Web Care.
                  </text>
                </svg>
              </Link>
            </div>

            <nav className="hidden | lg:inline-flex">
              <ul className="flex space-x-7 | xl:space-x-10">
                <li
                  className="relative group z-50"
                  onMouseEnter={() => setShowOverlay(true)}
                  onMouseLeave={() => setShowOverlay(false)}
                >
                  <Link
                    href="/services"
                    className="group relative text-gray-900 dark:text-white font-medium text-sm"
                  >
                    <div className="absolute -top-3 -right-4 pointer-events-none rounded-full z-20 bg-[#d0ff71] text-gray-600 text-xs pt-px px-1.5 leading-tighter tracking-tight">
                      13
                    </div>
                    Services
                    <span className={`absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right ${pathname == "/services" && "scale-x-100"}`}></span>
                  </Link>
                  {/* Mega Menu  */}
                  <div className="absolute z-50 flex-shrink-0 top-10 pt-10 left-2/3 transition transform -translate-x-1/3 pointer-events-none opacity-0 group-hover:pointer-events-auto cursor-auto  group-hover:opacity-100 -translate-y-4">
                    <div className="flex p-8 relative rounded-2xl bg-white shadow-[0_0_60px_-15px_rgba(0,0,0,0.2)]  w-[44rem] | lg:rounded-3xl | dark:bg-[#1a1b1e]">
                      <div className="w-3 h-3 bg-white absolute -top-1.5 rounded-[1px] left-1/3 -translate-x-full transform rotate-45 | dark:bg-[#1a1b1e]"></div>
                      <div className="inline-flex flex-col items-start w-7/12 pr-2">
                        <Link
                          href="/webcare"
                          className="group/link flex flex-col w-full gap-1 rounded-2xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-black dark:text-white transition-all duration-300 ease-in-out"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">Web Design</div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100" />
                          </div>
                          <div className="text-xs font-light text-gray-400 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                            Deliver your business to a wider audience
                          </div>
                        </Link>
                        <Link
                          href="/webcare"
                          className="group/link flex flex-col w-full gap-1 rounded-2xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-black dark:text-white transition-all duration-300 ease-in-out"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">Craft CMS</div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100" />
                          </div>
                          <div className="text-xs font-light text-gray-400 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                            The most reliable way to build a website
                          </div>
                        </Link>
                        <Link
                          href="/webcare"
                          className="group/link flex flex-col w-full gap-1 rounded-2xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-black dark:text-white transition-all duration-300 ease-in-out"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">Branding</div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100" />
                          </div>
                          <div className="text-xs font-light text-gray-400 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                            Creating brands you're proud of
                          </div>
                        </Link>
                        <Link
                          href="/webcare"
                          className="group/link flex flex-col w-full gap-1 rounded-2xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-black dark:text-white transition-all duration-300 ease-in-out"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">SEO</div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100" />
                          </div>
                          <div className="text-xs font-light text-gray-400 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                            Get your brand seen online
                          </div>
                        </Link>
                        <Link
                          href="/webcare"
                          className="group/link flex flex-col w-full gap-1 rounded-2xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-black dark:text-white transition-all duration-300 ease-in-out"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">Shopify</div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100" />
                          </div>
                          <div className="text-xs font-light text-gray-400 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                            Custom Shopify store in 4 weeks
                          </div>
                        </Link>
                      </div>
                      <div className="w-5/12 pl-3 inline-flex">
                        <Link
                          href="/image"
                          className="group/imagebox w-full inline-flex flex-col items-start justify-between bg-gray-50 rounded-2xl p-5 group | dark:bg-black"
                        >
                          <div className="w-full flex flex-wrap">
                            <div className="w-full flex justify-between items-center mb-2">
                              <div className="text-md leading-tight | dark:text-white">
                                View all Services
                              </div>
                              <div className="opacity-0 transition transform -translate-x-2 translate-y-2 | xl:group-hover:translate-y-0 xl:group-hover:translate-x-0 xl:group-hover:opacity-100">
                                <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/imagebox:translate-x-0 group-hover/imagebox:translate-y-0 group-hover/imagebox:opacity-100" />
                              </div>
                            </div>
                            <div className="w-full text-sm font-light text-gray-400 | 4xl:text-sm mb-5 | dark:text-white">
                              We don’t stop there, check out all the services we
                              offer here at Shape
                            </div>
                          </div>
                          <div className="w-full relative">
                            <div className="relative overflow-hidden w-full">
                              <Image
                                src={"/sercives.webp"}
                                alt="Branding"
                                width={300}
                                height={200}
                                className=" rounded-md w-full h-full"
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="relative">
                  <Link
                    href="/work"
                    className="group relative text-gray-900 dark:text-white font-medium text-sm"
                  >
                    Work
                    <span className={`absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right ${pathname == "/work" && "scale-x-100"}`}></span>
                  </Link>
                </li>
                <li className="relative group" onMouseEnter={() => setShowOverlay(true)}
                  onMouseLeave={() => setShowOverlay(false)}>
                  <Link
                    href="/about"
                    className="group relative text-gray-900 dark:text-white font-medium text-sm"
                  >
                    About
                    <span className={`absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right ${pathname == "/about" && "scale-x-100"}`}></span>
                    {/* Mega Menu  */}
                  </Link>
                  <div className="absolute flex-shrink-0 top-10 pt-10 left-2/3 transition transform -translate-x-1/3 pointer-events-none opacity-0 group-hover:pointer-events-auto cursor-auto  group-hover:opacity-100 -translate-y-4">
                    <div className="flex p-8 relative rounded-2xl bg-white shadow-[0_0_60px_-15px_rgba(0,0,0,0.2)] w-[44rem] | lg:rounded-3xl | dark:bg-[#1a1b1e]">
                      <div className="w-3 h-3 bg-white absolute -top-1.5 rounded-[1px] left-1/3 -translate-x-full transform rotate-45 | dark:bg-[#1a1b1e]"></div>
                      <div className="inline-flex flex-col items-start w-7/12 pr-2">
                        <Link
                          href="/about"
                          className="group/link flex flex-col w-full gap-1 rounded-2xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-black dark:text-white transition-all duration-300 ease-in-out"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">About us</div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100" />
                          </div>
                          <div className="text-xs font-light text-gray-400 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                            An award winning agency in Manchester
                          </div>
                        </Link>
                        <Link
                          href="/meet-the-team"
                          className="group/link flex flex-col w-full gap-1 rounded-2xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-black dark:text-white transition-all duration-300 ease-in-out"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">Meet the Team</div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100" />
                          </div>
                          <div className="text-xs font-light text-gray-400 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                            Putting faces to names
                          </div>
                        </Link>
                        <Link
                          href="/webcare"
                          className="group/link flex flex-col w-full gap-1 rounded-2xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-black dark:text-white transition-all duration-300 ease-in-out"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">Branding</div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100" />
                          </div>
                          <div className="text-xs font-light text-gray-400 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                            Creating brands you're proud of
                          </div>
                        </Link>
                        <Link
                          href="/webcare"
                          className="group/link flex flex-col w-full gap-1 rounded-2xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-black dark:text-white transition-all duration-300 ease-in-out"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">SEO</div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100" />
                          </div>
                          <div className="text-xs font-light text-gray-400 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                            Get your brand seen online
                          </div>
                        </Link>
                        <Link
                          href="/webcare"
                          className="group/link flex flex-col w-full gap-1 rounded-2xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-black dark:text-white transition-all duration-300 ease-in-out"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">Shopify</div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100" />
                          </div>
                          <div className="text-xs font-light text-gray-400 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                            Custom Shopify store in 4 weeks
                          </div>
                        </Link>
                      </div>
                      <div className="w-5/12 pl-3 inline-flex">
                        <Link
                          href="/image"
                          className="group/imagebox w-full inline-flex flex-col items-start justify-between bg-gray-50 rounded-2xl p-5 group | dark:bg-black"
                        >
                          <div className="w-full flex flex-wrap">
                            <div className="w-full flex justify-between items-center mb-2">
                              <div className="text-md leading-tight | dark:text-white">
                                View all Services
                              </div>
                              <div className="opacity-0 transition transform -translate-x-2 translate-y-2 | xl:group-hover:translate-y-0 xl:group-hover:translate-x-0 xl:group-hover:opacity-100">
                                <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white opacity-0 transition-all duration-300 ease-in-out -translate-x-2 translate-y-2 group-hover/imagebox:translate-x-0 group-hover/imagebox:translate-y-0 group-hover/imagebox:opacity-100" />
                              </div>
                            </div>
                            <div className="w-full text-sm font-light text-gray-400 | 4xl:text-sm mb-5 | dark:text-white">
                              We don’t stop there, check out all the services we
                              offer here at Shape
                            </div>
                          </div>
                          <div className="w-full relative">
                            <div className="relative overflow-hidden w-full">
                              <Image
                                src={"/sercives.webp"}
                                alt="Branding"
                                width={300}
                                height={200}
                                className=" rounded-md w-full h-full"
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="relative">
                  <Link
                    href="/blog"
                    className="group relative text-gray-900 dark:text-white font-medium text-sm"
                  >
                    Blog
                    <span className={`absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right ${pathname == "/blog" && "scale-x-100"}`}></span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    href="/contact"
                    className="group relative text-gray-900 dark:text-white font-medium text-sm"
                  >
                    Contact
                    <span className={`absolute left-0 -bottom-0.5 h-px w-full bg-current transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right ${pathname == "/contact" && "scale-x-100"}`}></span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="pr-2 inline-flex items-center relative z-10 gap-2 | lg:space-x-4">
              <ThemeToggle />
              {/* Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden outline-none focus:outline-none cursor-pointer"
              >
                {isOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>

              <div className="hidden | lg:inline-flex">
                <div className="relative group inline-flex items-center">
                  {/* SVG Filter (kept once in DOM) */}
                  <svg
                    width="0"
                    height="0"
                    style={{ position: "absolute" }}
                    aria-hidden="true"
                  >
                    <defs>
                      <filter
                        id="buttonFilter"
                        colorInterpolationFilters="sRGB"
                      >
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
                  <Link
                    href="/contact"
                    style={{ filter: "url(#buttonFilter)" }}
                    className="inline-flex relative outline-none focus:outline-none"
                  >
                    {/* Main Pill */}
                    <div className="w-auto inline-flex items-center justify-center relative leading-tight overflow-hidden rounded-full bg-[#d0ff71] text-gray-900 py-2 px-5">
                      <span className="relative text-sm tracking-tight">
                        Start a project
                      </span>
                    </div>

                    {/* Circle with Icon */}
                    <div className="bg-[#d0ff71] flex-shrink-0 overflow-hidden flex items-center justify-center -ml-1 rounded-full transform transition-transform duration-300 ease-out w-9 h-9 group-hover:translate-x-3 group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4 text-black transition-transform duration-300 ease-out" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </header>
          {showOverlay && (
            <div className="fixed inset-0 bg-[rgb(245_245_245_/_0%)] backdrop-blur-[10px] transition -top-3 duration-400 z-40 w-screen h-screen"></div>
          )}
          {/* Mobile Menu  */}

          <div
            ref={menuRef}
            className="overflow-hidden absolute bg-[#f5f5f5] dark:bg-[#26282c] w-[94vw] rounded-3xl p-4"
            style={{ height: 0, opacity: 0 }}
          >
            <MobileMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
