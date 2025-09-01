import ArchedImageCarouselMobile from '@/components/ArchedImageCarouselMobile'
import React from 'react'

export default function NotFound() {
    return (
        <div>
            <section id="hero">
                <ArchedImageCarouselMobile title="404 - Oh Sh*t...<br/> this is embarrassing" des="Hmm, it looks like you’re lost. <br/> So here are some nice pictures of our studio." btntext="Learn more about our team" btncolor="bg-black dark:bg-[#26282c]" link="/meet-the-team"/>
            </section>
        </div>
    )
}
