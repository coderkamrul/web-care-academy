import React, { useState } from 'react'
import Buttons from './Buttons';
import Link from 'next/link';
import axios from 'axios';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        howDidYouHearAboutUs: "",
        message: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false }); // clear error on change
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = true;
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
        if (!formData.phone.trim()) newErrors.phone = true;
        if (!formData.howDidYouHearAboutUs.trim()) newErrors.howDidYouHearAboutUs = true;
        if (!formData.message.trim()) newErrors.message = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await axios.post("/api/contact", formData);
            if (res.status === 200) {
                alert("Form submitted successfully ✅");
                setFormData({ name: "", email: "", phone: "", howDidYouHearAboutUs: "", message: "" });
                setErrors({});
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong ❌");
        }
    };

    const isFloating = (field) => formData[field].length > 0;

    // function to add red border if field has error
    const getInputClass = (field) =>
        `peer w-full block appearance-none translate-z-0 px-5 pt-7 pb-2.5 rounded-xl border border-solid ${
            errors[field] ? 'border-red-500 dark:border-red-500' : 'border-gray-150'
        } shadow-none outline-none leading-tight text-sm text-gray-800 placeholder-gray-600 placeholder-opacity-70 dark:text-gray-100 dark:placeholder-gray-200 dark:bg-[#1a1b1e] ring-3 ring-transparent ring-opacity-0 focus:border-gray-400 focus:shadow-none focus:ring-4 focus:ring-gray-200 focus:ring-opacity-10 focus:outline-none dark:focus:ring-gray-800 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-200 dark:focus:border-gray-200 dark:ring-transparent`;

    return (
        <div>
            <form className=''>
                <div className='w-full'>
                    <div className='flex flex-col | md:flex-row md:items-center'>
                        {/* Name */}
                        <div className='mb-4 md:px-2 w-full | md:w-auto md:flex-1'>
                            <div className='w-full relative'>
                                <input
                                    type="text"
                                    name="name"
                                    id="form-input-name"
                                    placeholder=" "
                                    required
                                    autoComplete="on"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={getInputClass("name")}
                                />
                                <label
                                    htmlFor="form-input-name"
                                    className={`absolute ml-5 top-4 pointer-events-none origin-bottom-left text-gray-600 dark:text-gray-200 transition-all duration-300 text-base ${
                                        isFloating("name") ? "-translate-y-4 scale-60 text-gray-900 dark:text-gray-400" : "translate-y-0 scale-100 text-gray-600 dark:text-gray-200"
                                    } peer-focus:-translate-y-4 peer-focus:scale-60 peer-focus:text-gray-900 dark:peer-focus:text-gray-400`}
                                >
                                    Name
                                </label>
                            </div>
                        </div>

                        {/* Email */}
                        <div className='mb-4 md:px-2 w-full | md:w-auto md:flex-1'>
                            <div className='w-full relative'>
                                <input
                                    type="email"
                                    name="email"
                                    id="form-input-email"
                                    placeholder=" "
                                    required
                                    autoComplete="on"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={getInputClass("email")}
                                />
                                <label
                                    htmlFor="form-input-email"
                                    className={`absolute ml-5 top-4 pointer-events-none origin-bottom-left text-gray-600 dark:text-gray-200 transition-all duration-300 text-base ${
                                        isFloating("email") ? "-translate-y-4 scale-60 text-gray-900 dark:text-gray-400" : "translate-y-0 scale-100 text-gray-600 dark:text-gray-200"
                                    } peer-focus:-translate-y-4 peer-focus:scale-60 peer-focus:text-gray-900 dark:peer-focus:text-gray-400`}
                                >
                                    Email
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col | md:flex-row md:items-center'>
                        {/* Phone */}
                        <div className='mb-4 md:px-2 w-full | md:w-auto md:flex-1'>
                            <div className='w-full relative'>
                                <input
                                    type="phone"
                                    name="phone"
                                    id="form-input-phone"
                                    placeholder=" "
                                    required
                                    autoComplete="on"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={getInputClass("phone")}
                                />
                                <label
                                    htmlFor="form-input-phone"
                                    className={`absolute ml-5 top-4 pointer-events-none origin-bottom-left text-gray-600 dark:text-gray-200 transition-all duration-300 text-base ${
                                        isFloating("phone") ? "-translate-y-4 scale-60 text-gray-900 dark:text-gray-400" : "translate-y-0 scale-100 text-gray-600 dark:text-gray-200"
                                    } peer-focus:-translate-y-4 peer-focus:scale-60 peer-focus:text-gray-900 dark:peer-focus:text-gray-400`}
                                >
                                    Phone <span className='text-gray-400 ml-1 | dark:text-gray-500'>(Optional)</span>
                                </label>
                            </div>
                        </div>

                        {/* How Did You Hear About Us */}
                        <div className='mb-4 md:px-2 w-full | md:w-auto md:flex-1'>
                            <div className='w-full relative'>
                                <select
                                    name="howDidYouHearAboutUs"
                                    id="howDidYouHearAboutUs"
                                    required
                                    autoComplete="on"
                                    value={formData.howDidYouHearAboutUs}
                                    onChange={handleChange}
                                    className={getInputClass("howDidYouHearAboutUs")}
                                >
                                    <option value="" disabled hidden></option>
                                    <option value="Google">Google</option>
                                    <option value="friendOrFamily">Friend or family</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="wordOfMouth">Word Of Mouth</option>
                                    <option value="newsletter">Newsletter</option>
                                </select>
                                <label
                                    htmlFor="howDidYouHearAboutUs"
                                    className={`absolute ml-5 top-4 pointer-events-none origin-bottom-left text-gray-600 dark:text-gray-200 transition-all duration-300 text-base ${
                                        isFloating("howDidYouHearAboutUs") ? "-translate-y-4 scale-60 text-gray-900 dark:text-gray-400" : "translate-y-0 scale-100 text-gray-600 dark:text-gray-200"
                                    } peer-focus:-translate-y-4 peer-focus:scale-60 peer-focus:text-gray-900 dark:peer-focus:text-gray-400`}
                                >
                                    How Did You Hear About Us ?
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className='flex flex-col | md:flex-row md:items-center'>
                        <div className='mb-4 md:px-2 w-full | md:w-auto md:flex-1'>
                            <div className='w-full relative'>
                                <textarea
                                    type="textarea"
                                    name="message"
                                    id="form-input-message"
                                    placeholder=" "
                                    required
                                    autoComplete="off"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={getInputClass("message") + " min-h-32 resize-y"}
                                />
                                <label
                                    htmlFor="form-input-message"
                                    className={`absolute ml-5 top-4 pointer-events-none origin-bottom-left text-gray-600 dark:text-gray-200 transition-all duration-300 text-base ${
                                        isFloating("message") ? "-translate-y-4 scale-60 text-gray-900 dark:text-gray-400" : "translate-y-0 scale-100 text-gray-600 dark:text-gray-200"
                                    } peer-focus:-translate-y-4 peer-focus:scale-60 peer-focus:text-gray-900 dark:peer-focus:text-gray-400 bg-white dark:bg-[#1a1b1e]`}
                                >
                                    Tell us about your project
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className='flex flex-col | md:flex-row md:items-center'>
                        <div className="mb-4 md:px-2 w-full | md:w-full">
                            <label className="inline-flex items-center w-full cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="g8n6R9MO8"
                                    value="1"
                                    className="form-checkbox border-gray-200 border-solid bg-transparent text-gray-600 | dark:text-gray-300 font-medium w-4 h-4 rounded"
                                />
                                <span className="ml-2 pt-0.5 | dark:text-gray-200 text-sm">
                                    Subscribe to our newsletter for all the latest Shape goss!
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col | md:flex-row md:items-center">
                        <div className="mb-6 md:px-2 w-full | md:w-full">
                            <div className="text-xs text-gray-700 | dark:text-gray-300">
                                By submitting this form I accept the
                                <Link href="/privacy-policy">Privacy Policy</Link> of this site.
                            </div>
                        </div>
                    </div>

                    <Buttons
                        bg={"bg-black | dark:bg-[#26282c]"}
                        text={"Send Message"}
                        color={"text-white"}
                        onClick={handleSubmit} />
                </div>
            </form>
        </div>
    )
}
