"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
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
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8"
                >
                    <button
                        onClick={scrollToTop}
                        className="rounded-full bg-primary p-3 text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="h-6 w-6" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
