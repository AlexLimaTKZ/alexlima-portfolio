"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
    const followerX = useSpring(cursorX, springConfig)
    const followerY = useSpring(cursorY, springConfig)

    const moveCursor = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
        if (!isVisible) setIsVisible(true)
    }, [cursorX, cursorY, isVisible])

    useEffect(() => {
        // Detect touch devices
        const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
        requestAnimationFrame(() => {
            setIsTouchDevice(hasTouch)
        })
        if (hasTouch) return

        window.addEventListener("mousemove", moveCursor)
        
        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)
        
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseenter", handleMouseEnter)

        // Track hover state on interactive elements
        const interactiveSelectors = "a, button, [data-cursor-hover], input, textarea, [role='button']"
        
        const handleElementEnter = () => setIsHovering(true)
        const handleElementLeave = () => setIsHovering(false)

        const elements = document.querySelectorAll(interactiveSelectors)
        elements.forEach((el) => {
            el.addEventListener("mouseenter", handleElementEnter)
            el.addEventListener("mouseleave", handleElementLeave)
        })

        // MutationObserver to track new interactive elements
        const observer = new MutationObserver(() => {
            const newElements = document.querySelectorAll(interactiveSelectors)
            newElements.forEach((el) => {
                el.addEventListener("mouseenter", handleElementEnter)
                el.addEventListener("mouseleave", handleElementLeave)
            })
        })
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            document.removeEventListener("mouseleave", handleMouseLeave)
            document.removeEventListener("mouseenter", handleMouseEnter)
            elements.forEach((el) => {
                el.removeEventListener("mouseenter", handleElementEnter)
                el.removeEventListener("mouseleave", handleElementLeave)
            })
            observer.disconnect()
        }
    }, [moveCursor])

    if (isTouchDevice) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Dot (precise position) */}
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-foreground"
                        style={{
                            x: cursorX,
                            y: cursorY,
                            translateX: "-50%",
                            translateY: "-50%",
                            width: isHovering ? 0 : 6,
                            height: isHovering ? 0 : 6,
                            mixBlendMode: "difference",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.15 }}
                    />
                    {/* Follower ring (delayed, springy) */}
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-2 border-foreground"
                        style={{
                            x: followerX,
                            y: followerY,
                            translateX: "-50%",
                            translateY: "-50%",
                            mixBlendMode: "difference",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            width: isHovering ? 56 : 36,
                            height: isHovering ? 56 : 36,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                            width: { type: "spring", stiffness: 300, damping: 20 },
                            height: { type: "spring", stiffness: 300, damping: 20 },
                            opacity: { duration: 0.15 },
                        }}
                    />
                </>
            )}
        </AnimatePresence>
    )
}
