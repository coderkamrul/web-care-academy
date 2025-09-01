"use client";

import { useState } from "react";
import axios from "axios";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await axios.post("/api/newsletter", { email });
            if (res.status === 200) {
                setStatus("success");
                setEmail("");
            }
        } catch (err) {
            setStatus("error");
        }
    };
    const isFloating = () => email.length > 0;

    const getInputClass = (email) =>
        `peer w-full block appearance-none translate-z-0 px-5 pt-7 pb-2.5 rounded-xl border border-solid shadow-none outline-none leading-tight text-sm text-gray-800 placeholder-gray-600 placeholder-opacity-70 dark:text-gray-100 dark:placeholder-gray-200 dark:bg-[#1a1b1e] ring-3 ring-transparent ring-opacity-0 focus:border-gray-400 focus:shadow-none focus:ring-4 focus:ring-gray-200 focus:ring-opacity-10 focus:outline-none dark:focus:ring-gray-800 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-200 dark:focus:border-gray-200 dark:ring-transparent bg-white`;
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col space-y-4"
        >
            <div className="flex flex-col space-y-3 | lg:space-y-5 items-start">
                <div className="inline-flex items-center space-x-2  ">
                    <div className="bg-black | dark:bg-white w-1.5 h-1.5 rounded-full"></div>
                    <div className="font-light text-sm text-black | dark:text-white">Spam Free Newsletter</div>
                </div>
                <h3 className="text-2xl | md:text-3xl | xl:text-4xl 2xl:text-5xl font-medium tracking-tight text-black  | dark:text-white leading-none text-balance">Receive the most up to date insights strategies</h3>
            </div>

            <div className="w-full mt-5">
                <div className="w-full flex items-center space-x-3">

                    <div className='w-full relative'>
                        <input
                            type="email"
                            name="email"
                            id="form-input-email"
                            placeholder=""
                            required
                            autoComplete="on"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={getInputClass("email")}
                        />
                        <label
                            htmlFor="form-input-email"
                            className={`absolute ml-5 top-4 pointer-events-none origin-bottom-left text-gray-600 dark:text-gray-200 transition-all duration-300 text-base ${isFloating("email") ? "-translate-y-4 scale-60 text-gray-900 dark:text-gray-400" : "translate-y-0 scale-100 text-gray-600 dark:text-gray-200"
                                } peer-focus:-translate-y-4 peer-focus:scale-60 peer-focus:text-gray-900 dark:peer-focus:text-gray-400`}
                        >
                            Email Address
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-14 h-14 cursor-pointer flex-shrink-0 rounded-full bg-[#010202] flex items-center justify-center transform transition ring-4 ring-[#010202] ring-opacity-0 | dark:ring-[#d0ff71] dark:ring-opacity-0 dark:bg-[#d0ff71]  | xl:hover:rotate-12 | focus:outline-none focus:ring-opacity-20 dark:focus:ring-opacity-20"
                    >{status === "loading" ? 
                    <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24">
                        <path
                            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                            stroke="currentColor" strokeWidth="5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path
                            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                            stroke="currentColor" strokeWidth="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                        </path>
                    </svg> :
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="16"
                            height="16"
                            className="w-5 h-5 text-[#d0ff71] fill-current mr-0.5 dark:text-black"
                        >
                            <path d="M0 288L512 0l-64 480-176.2-75.5L208 512l-48-16V384l224-224-251 185L0 288z" />
                        </svg>}
                    </button>
                </div>
            </div>

            {status === "success" && (
                <p className="text-green-600 text-sm">Thanks for subscribing!</p>
            )}
            {status === "error" && (
                <p className="text-red-600 text-sm">Something went wrong. Try again.</p>
            )}
        </form>
    );
}
