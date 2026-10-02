"use client"

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useMotion } from "@/components/motion-provider"

const ScrollContext = createContext<(target: number | string) => void>(() => {})
export function useSmoothScroll() { return useContext(ScrollContext) }

export function LenisProvider({ children }: { children: ReactNode }) {
    const instance = useRef<Lenis | null>(null)
    const { enabled, ready } = useMotion()
    const scrollTo = useCallback((target: number | string) => {
        if (instance.current) instance.current.scrollTo(target, { immediate: true })
        else {
            const element = typeof target === "string" ? document.querySelector(target) : null
            const top = typeof target === "number" ? target : element ? element.getBoundingClientRect().top + window.scrollY - 96 : 0
            window.scrollTo({ top, behavior: "instant" })
        }
    }, [])

    useEffect(() => {
        if (!enabled || !ready) return
        const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)")
        let current: Lenis | null = null
        const tick = (time: number) => current?.raf(time * 1000)
        const visibility = () => document.hidden ? current?.stop() : current?.start()
        const setup = () => {
            current?.destroy()
            current = null
            instance.current = null
            gsap.ticker.remove(tick)
            if (!media.matches) return
            current = new Lenis({ lerp: 0.09, smoothWheel: true, autoRaf: false, anchors: { offset: -96 } })
            instance.current = current
            current.on("scroll", ScrollTrigger.update)
            gsap.ticker.add(tick)
        }
        setup()
        media.addEventListener("change", setup)
        document.addEventListener("visibilitychange", visibility)
        return () => {
            media.removeEventListener("change", setup)
            document.removeEventListener("visibilitychange", visibility)
            gsap.ticker.remove(tick)
            current?.destroy()
            instance.current = null
        }
    }, [enabled, ready])
    return <ScrollContext.Provider value={scrollTo}>{children}</ScrollContext.Provider>
}
