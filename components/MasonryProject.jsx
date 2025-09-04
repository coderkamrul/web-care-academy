import React from 'react'
import ProjectCard from './ProjectCard'
import Buttons from './Buttons'

const TestimonialSection = () => (
    <div className="w-full mb-20 hidden lg:flex">
        <div className="w-full flex justify-center">
            <div className="max-w-xl relative 4xl:max-w-3xl">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 17 11"
                    fill="none"
                    className="w-6 h-6 text-black fill-current absolute top-0 left-0 dark:text-gray-100"
                >
                    <path d="M0 6.646C0 3.107 2.531 1.002 4.11.032c.2-.123.416.133.262.312A8.202 8.202 0 002.92 2.777 4.023 4.023 0 110 6.647zm8.955 0c0-3.539 2.531-5.644 4.11-6.613.2-.123.416.132.263.31a8.202 8.202 0 00-1.454 2.434 4.023 4.023 0 11-2.92 3.87z" />
                </svg>
                <h2 className="text-xl xl:text-2xl 2xl:text-3xl font-sans-primary tracking-tight text-black dark:text-gray-100 leading-tighter text-balance indent-20 mb-5">
                    Shape understands the client's concept &amp; turns ideas into a reality
                </h2>
                <div className="flex items-end space-x-2 lg:space-x-3">
                    <div className="w-9 h-9 rounded-md lg:w-12 lg:h-12 lg:rounded-lg overflow-hidden relative bg-[#d0ff71] flex items-center justify-center">
                        <div className="text-xl mt-px text-black">S</div>
                    </div>
                    <div className="leading-tight tracking-tight">
                        <div className="text-black dark:text-gray-100">Stacy</div>
                        <div className="font-light text-xs lg:text-sm text-gray-400 dark:text-gray-200">Miller Metcalfe</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const CTASection = () => (
    <div className="w-full flex flex-col items-center text-center mb-16 | lg:mb-28">
        <h2 className="text-3xl | xl:text-4xl | 2xl:text-5xl tracking-tight font-medium text-black  | dark:text-white leading-none text-balance lg:mb-3">You're still here?!</h2>
        <div className="w-full relative mb-5">
            <p className="text-xs | xl:text-md text-black dark:text-gray-200 relative z-10 text-pretty font-light leading-7  mb-6">You must really like us...</p></div>
        <Buttons
            text="Contact us"
            link="/contact"
            color={"text-black"}
            bg={"bg-[#d0ff71]"}
        />
    </div>
)

export default function MasonryProject({projects}) {


    const createMasonryLayout = () => {
        const items = []
        const column1 = []
        const column2 = []

        projects.forEach((project, index) => {
            if (index === 1) {
                const cta = (
                    <div key={`cta-${index}`} className="w-full">
                        <TestimonialSection />
                    </div>
                )
                if (column1.length <= column2.length) {
                    column1.push(cta)
                } else {
                    column2.push(cta)
                }
            }
            if (index === 3) {
                const cta = (
                    <div key={`cta-${index}`} className="w-full">
                        <CTASection />
                    </div>
                )
                if (column1.length <= column2.length) {
                    column1.push(cta)
                } else {
                    column2.push(cta)
                }
            }

            const projectCard = (
                <div key={project.id} className="px-2 lg:px-3 xl:px-4 w-full">
                    <ProjectCard
                        video={project.video}
                        title={project.title}
                        tags={project.tags}
                        category={project.category}
                        year={project.year}
                        slug={project.slug}
                    />
                </div>
            )

            // Distribute projects between columns
            if (column1.length <= column2.length) {
                column1.push(projectCard)
            } else {
                column2.push(projectCard)
            }
        })

        return { column1, column2 }
    }

    const { column1, column2 } = createMasonryLayout()

    return (
        <div className="flex flex-wrap md:flex-nowrap gap-0">
            <div className="w-full md:w-1/2">{column1}</div>
            <div className="w-full md:w-1/2">{column2}</div>
        </div>
    )
}
