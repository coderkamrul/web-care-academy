
import Image from "next/image"
import Link from "next/link";

export default function BlogCard({ image, read, title, description, user, url }) {
    
  return (
    <div className="px-2 | lg:px-3 xl:px-4">
      <div className="w-full">
        <Link data-cursor href={"blog/" + url} className="flex flex-col items-start group">
          <div className="w-full relative mb-5">
            <div className="w-full relative overflow-hidden rounded-bl-xl mb-3 pl-px | lg:rounded-bl-2xl">
              <div className="absolute bottom-0 left-0 z-20 bg-white rounded-tr-2xl flex transition-transform duration-400 transform pt-2 pr-2 | lg:pr-3 lg:pt-3 | xl:translate-y-full xl:-translate-x-full lg:rounded-tr-3xl | xl:group-hover:translate-x-0 xl:group-hover:translate-y-0 | dark:bg-black">
                <svg
                  id="Layer_1_top"
                  className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute top-px left-0 transform -translate-y-full rotate-180 dark:text-black"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  viewBox="0 0 100 100"
                  xmlSpace="preserve"
                >
                  <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                </svg>

                <svg
                  id="Layer_1_bottom"
                  className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute -bottom-px right-px transform translate-x-full rotate-180 dark:text-black"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  viewBox="0 0 100 100"
                  xmlSpace="preserve"
                >
                  <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                </svg>

                <div className="rounded-xl transform-gpu overflow-hidden relative w-12 h-12 bg-gray-50 | dark:bg-black | lg:w-16 lg:h-16 | lg:rounded-2xl">
                  <div className="relative overflow-hidden w-full">
                    <Image
                      src={user}
                      className="w-12 h-12 lg:w-16 lg:h-16 object-cover"
                      alt="avatar"
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full relative z-10 transform-gpu rounded-2xl overflow-hidden bg-gray-50 | dark:bg-black lg:rounded-3xl">
                <div className="w-full transform scale-110 transition-transform | xl:group-hover:-translate-y-2.5">
                  <div className="relative overflow-hidden w-full">
                    <Image
                      src={image}
                      alt={title}
                      width={800}
                      height={450}
                      className="w-full h-full "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center space-x-2 mb-1 mt-4 ">
              <div className="bg-black | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
              <div className="font-light text-xs  text-gray-800 | dark:text-gray-200">
                {read || "2 min read"}
              </div>
            </div>
            <div className="text-lg | md:text-xl | xl:text-1xl | 4xl:text-2xl font-medium tracking-normal text-black | dark:text-gray-100 leading-tighter text-pretty pr-8 mb-5 | lg:pr-16">
              {title}
            </div>
            <div className="font-normal text-gray-800 line-clamp-2 text-balance text-sm | lg:text-base | dark:text-gray-200">
              <p>
                {description}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
