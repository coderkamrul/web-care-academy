"use client"

import { useEffect, useRef, useState, cloneElement } from "react"
import { gsap } from "gsap"
import { GoArrowUpRight } from "react-icons/go"
import { usePathname } from "next/navigation"

export default function ActionCursor({ defaultIcon = <GoArrowUpRight className="w-10 h-10 text-black" /> }) {
  const cursorRef = useRef(null)
  const [icon, setIcon] = useState(defaultIcon)
  const activeTargetRef = useRef(null)
  const pathname = usePathname() // ✅ watch route changes

  const isDesktop = () => window.innerWidth >= 1024

  // Smooth cursor movement
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    const xMove = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" })
    const yMove = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" })
    const moveCursor = (e) => {
      xMove(e.clientX)
      yMove(e.clientY)
    }
    window.addEventListener("pointermove", moveCursor)
    window.addEventListener("dragover", moveCursor)
    return () => {
      window.removeEventListener("pointermove", moveCursor)
      window.removeEventListener("dragover", moveCursor)
    }
  }, [])

  // Show/hide cursor on hover — re-run when pathname changes
  useEffect(() => {
    const cursor = cursorRef.current
    const targets = document.querySelectorAll("[data-action-cursor]")
    if (!targets) return

    const show = (el) => {
      if (!isDesktop()) return
      activeTargetRef.current = el
      setIcon(el._cursorComponent || defaultIcon)
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2, ease: "power3.out" })
      el.style.cursor = "none"
    }

    const hide = (el) => {
      if (!isDesktop()) return
      activeTargetRef.current = null
      gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.2, ease: "power3.out" })
      el.style.cursor = ""
      setIcon(defaultIcon)
    }

    const handlers = []
    targets.forEach((el) => {
      const mouseEnter = () => show(el)
      const mouseLeave = () => hide(el)
      el.addEventListener("mouseenter", mouseEnter)
      el.addEventListener("mouseleave", mouseLeave)
      handlers.push({ el, mouseEnter, mouseLeave })
    })

    return () => {
      handlers.forEach(({ el, mouseEnter, mouseLeave }) => {
        el.removeEventListener("mouseenter", mouseEnter)
        el.removeEventListener("mouseleave", mouseLeave)
      })
    }
  }, [defaultIcon, pathname]) // ✅ re-run on route change

  // Live update for dynamic cursor icon
  useEffect(() => {
    const interval = setInterval(() => {
      const activeEl = activeTargetRef.current
      if (activeEl) {
        const newIcon = activeEl._cursorComponent || defaultIcon
        setIcon((prev) => (prev.type !== newIcon.type ? newIcon : prev))
      }
    }, 100)
    return () => clearInterval(interval)
  }, [defaultIcon])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed -top-12 -left-12 w-24 h-24 rounded-full bg-[#d0ff71] flex items-center justify-center z-[99999] opacity-0 scale-50"
      style={{ transform: "translate(0px, 0px)" }}
    >
      {cloneElement(icon)}
    </div>
  )
}
