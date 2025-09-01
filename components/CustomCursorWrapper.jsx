// "use client"
// import { useEffect, useRef } from "react"
// import { gsap } from "gsap"
// import { GoArrowUpRight } from "react-icons/go"
// import { usePathname } from "next/navigation"

// export default function CustomCursor() {
//   const cursorRef = useRef(null)
//   const pathname = usePathname() // track page changes

//   const isDesktop = () => window.innerWidth >= 1024

//   useEffect(() => {
//     const cursor = cursorRef.current

//     // Smooth movement without lag
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

//   useEffect(() => {
//     const cursor = cursorRef.current
//     const targets = document.querySelectorAll("[data-cursor]")
//     if (!targets) return

//     const show = (el) => {
//       if (!isDesktop()) return
//       gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2, ease: "power3.out" })
//       el.style.cursor = "none"
//     }

//     const hide = (el) => {
//       if (!isDesktop()) return
//       gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.2, ease: "power3.out" })
//       el.style.cursor = ""
//     }

//     const handlers = []

//     targets.forEach((el) => {
//       const mouseEnter = () => show(el)
//       const mouseLeave = () => hide(el)
//       el.addEventListener("mouseenter", mouseEnter)
//       el.addEventListener("mouseleave", mouseLeave)
//       handlers.push({ el, mouseEnter, mouseLeave })
//     })

//     return () => {
//       handlers.forEach(({ el, mouseEnter, mouseLeave }) => {
//         el.removeEventListener("mouseenter", mouseEnter)
//         el.removeEventListener("mouseleave", mouseLeave)
//       })
//     }
//   }, [pathname]) // ✅ re-run when page changes

//   return (
//     <div
//       ref={cursorRef}
//       className="pointer-events-none fixed -top-12 -left-12 w-24 h-24 rounded-full bg-[#d0ff71] flex items-center justify-center z-[99999] opacity-0 scale-50"
//       style={{ transform: "translate(0px, 0px)" }} // GSAP uses inline transform
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

  // Track hover on data-cursor elements
  useEffect(() => {
    const cursor = cursorRef.current
    let cleanup = null

    const initCursorTargets = () => {
      const targets = document.querySelectorAll("[data-cursor]")
      if (!targets) return

      const show = (el) => {
        if (!isDesktop()) return
        gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2, ease: "power3.out" })
        el.style.cursor = "none"
      }

      const hide = (el) => {
        if (!isDesktop()) return
        gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.2, ease: "power3.out" })
        el.style.cursor = ""
      }

      const handlers = []

      targets.forEach((el) => {
        const mouseEnter = () => show(el)
        const mouseLeave = () => hide(el)
        el.addEventListener("mouseenter", mouseEnter)
        el.addEventListener("mouseleave", mouseLeave)
        handlers.push({ el, mouseEnter, mouseLeave })
      })

      cleanup = () => {
        handlers.forEach(({ el, mouseEnter, mouseLeave }) => {
          el.removeEventListener("mouseenter", mouseEnter)
          el.removeEventListener("mouseleave", mouseLeave)
        })
      }
    }

    const raf = requestAnimationFrame(() => initCursorTargets())

    return () => {
      cancelAnimationFrame(raf)
      if (cleanup) cleanup()
    }
  }, [pathname])

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
