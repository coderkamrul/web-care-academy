

export default function BlogHeroSkeleton({ error, slug }) {
    function slugToTitle(slug) {
        if (!slug) return "";
        const title = slug
            .replace(/[-_]/g, " ")
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        return title.length > 31 ? title.slice(0, 25) + "…" : title;
    }
    return (
        <div className="w-full pt-20 pb-10 lg:pt-32 lg:pb-16 xl:pt-40 md:mb-10">
            <div className="pl-2 sm:pl-6 xl:pl-12 2xl:pl-40">
                <div className="w-full relative overflow-hidden flex flex-wrap justify-between md:min-h-140 xl:min-h-160">

                    {/* Left Section */}
                    <div className="w-full flex flex-col justify-between items-start relative z-20 order-2 md:order-1">

                        <div className="w-full relative mt-5 mb-5 md:mt-28">

                            {/* Top SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                                className="w-8 h-8 md:w-12 md:h-12 text-white fill-current absolute top-1 -ml-px mt-px left-5/16 z-30 transform -translate-y-20 rotate-180 hidden md:block 2xl:left-4/16 dark:text-black"
                            >
                                <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                            </svg>

                            {/* Bottom SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                                className="w-8 h-8 md:w-12 md:h-12 text-white fill-current absolute bottom-0 mb-px -ml-px left-5/16 z-30 transform translate-y-12 hidden md:block 2xl:left-4/16 dark:text-black"
                            >
                                <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                            </svg>

                            {/* Title skeleton */}
                            <div className="w-auto rounded-r-2xl mt-2 pl-4 pr-4 md:pl-0 md:w-7/16 md:-mt-7 md:bg-white dark:md:bg-black md:p-10 md:pr-6 md:rounded-r-3xl 2xl:w-7/16">
                                <div className="flex flex-col space-y-3 lg:space-y-5">

                                    {/* Read time circle + line */}
                                    <div className="inline-flex items-center space-x-2 md:left-2 md:relative lg:absolute lg:left-3 lg:top-10">
                                        <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                                        <div className="w-12 h-3 bg-gray-400 dark:bg-gray-600 rounded"></div>
                                    </div>

                                    {/* Title lines skeleton (3 lines) */}
                                    <div className="space-y-2 md:pl-2 py-4 w-full">
                                        <div className="w-4/6 h-10 bg-gray-400 dark:bg-gray-600 rounded lg:ml-32 xl:ml-40 text-2xl lg:text-4xl text-white">{error}</div>
                                        <div className="w-5/6 h-10 bg-gray-400 dark:bg-gray-600 rounded text-lg lg:text-2xl 2xl:text-4xl text-white flex items-center p-1"><span>{slugToTitle(slug)}</span></div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Author skeleton */}
                        <div className="pl-4 md:pl-2 flex items-end space-x-3 lg:space-x-5">
                            <div className="w-16 h-16 rounded-lg lg:rounded-xl bg-gray-400 dark:bg-gray-600"></div>
                            <div className="flex flex-col space-y-2">
                                <div className="w-24 h-2 bg-gray-400 dark:bg-gray-600 rounded"></div>
                                <div className="w-32 h-3 bg-gray-400 dark:bg-gray-600 rounded"></div>
                                <div className="w-20 h-2 bg-gray-400 dark:bg-gray-600 rounded"></div>
                            </div>
                        </div>

                    </div>

                    {/* Right Section (Hero image placeholder) */}
                    <div className="w-full h-60 relative order-1 sm:h-96 md:order-2 md:absolute md:h-full md:right-0 md:top-0 md:pl-[31.25%] md:pr-0 2xl:pl-[25%]">
                        <div className="w-full h-full relative overflow-hidden rounded-bl-2xl bg-gray-300 dark:bg-gray-700 md:rounded-r-none md:rounded-l-3xl">

                            {/* Small top-left SVG for mobile */}
                            <div className="w-28 h-14 bg-white dark:bg-black absolute top-0 left-0 z-20 rounded-br-2xl md:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    className="w-10 h-10 text-white fill-current absolute bottom-px -left-px z-30 transform translate-y-full dark:text-black"
                                >
                                    <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    className="w-10 h-10 text-white fill-current absolute -top-px right-px z-30 transform translate-x-full dark:text-black"
                                >
                                    <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                                </svg>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
