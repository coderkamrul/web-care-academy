import React from "react";

const PlateCorner = () => {
  return (
    <div className="bg-white absolute top-0 left-0 rounded-br-2xl w-5/16 h-12 
                    lg:rounded-br-3xl lg:w-3/16 lg:h-20 
                    dark:bg-black">
      {/* Top-right corner */}
      <svg
        className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute -top-px right-px transform translate-x-full dark:text-black"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
      </svg>

      {/* Bottom-left corner */}
      <svg
        className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-current absolute bottom-px -left-px transform translate-y-full dark:text-black"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
      </svg>
    </div>
  );
};

export default PlateCorner;
