"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)

        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
                >
                    <button
                        onClick={scrollToTop}
                        className="group flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/30 bg-slate-950/80 dark:bg-slate-900/90 text-cyan-400 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-background"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 text-cyan-400" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
