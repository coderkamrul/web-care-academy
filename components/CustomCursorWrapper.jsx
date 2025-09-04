
// "use client"
// import { useEffect, useRef } from "react"
// import { gsap } from "gsap"
// import { GoArrowUpRight } from "react-icons/go"
// import { usePathname } from "next/navigation"

// export default function CustomCursor() {
//   const cursorRef = useRef(null)
//   const pathname = usePathname() // track page changes

//   const isDesktop = () => window.innerWidth >= 1024

//   // Smooth cursor movement
//   useEffect(() => {
//     const cursor = cursorRef.current
//     const xMove = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" })
//     const yMove = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" })

//     const moveCursor = (e) => {
//       xMove(e.clientX)
//       yMove(e.clientY)
//     }

//     const moveTouch = (e) => {
//       if (e.touches.length > 0) {
//         xMove(e.touches[0].clientX)
//         yMove(e.touches[0].clientY)
//       }
//     }

//     window.addEventListener("pointermove", moveCursor)
//     window.addEventListener("dragover", moveCursor)
//     window.addEventListener("touchmove", moveTouch)

//     return () => {
//       window.removeEventListener("pointermove", moveCursor)
//       window.removeEventListener("dragover", moveCursor)
//       window.removeEventListener("touchmove", moveTouch)
//     }
//   }, [])

//   // Use event delegation for hover detection
//   useEffect(() => {
//     const cursor = cursorRef.current

//     const handleMouseOver = (e) => {
//       if (!isDesktop()) return
//       if (e.target.closest("[data-cursor]")) {
//         gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2, ease: "power3.out" })
//         e.target.style.cursor = "none"
//       }
//     }

//     const handleMouseOut = (e) => {
//       if (!isDesktop()) return
//       if (e.target.closest("[data-cursor]")) {
//         gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.2, ease: "power3.out" })
//         e.target.style.cursor = ""
//       }
//     }

//     document.addEventListener("mouseover", handleMouseOver)
//     document.addEventListener("mouseout", handleMouseOut)

//     return () => {
//       document.removeEventListener("mouseover", handleMouseOver)
//       document.removeEventListener("mouseout", handleMouseOut)
//     }
//   }, [pathname]) // re-run on route change

//   return (
//     <div
//       ref={cursorRef}
//       className="pointer-events-none fixed -top-12 -left-12 w-24 h-24 rounded-full bg-[#d0ff71] flex items-center justify-center z-[99999] opacity-0 scale-50"
//       style={{ transform: "translate(0px, 0px)" }}
//     >
//       <GoArrowUpRight className="w-10 h-10 text-black" />
//     </div>
//   )
// }

"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { GoArrowUpRight } from "react-icons/go"
import { usePathname } from "next/navigation"

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const pathname = usePathname() // track page changes

  const isDesktop = () => window.innerWidth >= 1024

  // Smooth cursor movement
  useEffect(() => {
    const cursor = cursorRef.current
    const xMove = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" })
    const yMove = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" })

    const moveCursor = (e) => {
      xMove(e.clientX)
      yMove(e.clientY)
    }

    const moveTouch = (e) => {
      if (e.touches.length > 0) {
        xMove(e.touches[0].clientX)
        yMove(e.touches[0].clientY)
      }
    }

    window.addEventListener("pointermove", moveCursor)
    window.addEventListener("dragover", moveCursor)
    window.addEventListener("touchmove", moveTouch)

    return () => {
      window.removeEventListener("pointermove", moveCursor)
      window.removeEventListener("dragover", moveCursor)
      window.removeEventListener("touchmove", moveTouch)
    }
  }, [])

  // Reset cursor on route change
  useEffect(() => {
    if (!isDesktop()) return
    const cursor = cursorRef.current
    gsap.set(cursor, { opacity: 0, scale: 0.5 }) // hide/reset
  }, [pathname])

  // Hover detection
  useEffect(() => {
    const cursor = cursorRef.current

    const handleMouseOver = (e) => {
      if (!isDesktop()) return
      if (e.target.closest("[data-cursor]")) {
        gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2, ease: "power3.out" })
        e.target.style.cursor = "none"
      }
    }

    const handleMouseOut = (e) => {
      if (!isDesktop()) return
      if (e.target.closest("[data-cursor]")) {
        gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.2, ease: "power3.out" })
        e.target.style.cursor = ""
      }
    }

    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [pathname]) // still re-attach on route change

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed -top-12 -left-12 w-24 h-24 rounded-full bg-[#d0ff71] flex items-center justify-center z-[99999] opacity-0 scale-50"
      style={{ transform: "translate(0px, 0px)" }}
    >
      <GoArrowUpRight className="w-10 h-10 text-black" />
    </div>
  )
}
