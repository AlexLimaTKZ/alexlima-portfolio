"use client"

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react"
import { useLanguage } from "@/components/language-provider"
import { IntroLoader } from "@/components/intro-loader"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"

const MotionContext = createContext({ enabled: true, ready: false, toggle: () => {} })
export function useMotion() { return useContext(MotionContext) }

export function MotionProvider({ children }: { children: ReactNode }) {
    const root = useRef<HTMLDivElement>(null)
    const [enabled, setEnabled] = useState(true)
    const [ready, setReady] = useState(false)
    const finishIntro = useCallback(() => setReady(true), [])
    const { language } = useLanguage()

    useGSAP(() => {
        if (!enabled || !ready || !root.current) return
        const media = gsap.matchMedia()
        media.add("(prefers-reduced-motion: no-preference)", () => {
            const cleanups: (() => void)[] = []
            const intro = gsap.timeline({ defaults: { ease: "power3.out" } })
            intro.from("[data-hero-char]", { yPercent: 115, rotation: 5, duration: 1.2, stagger: 0.024 })
                .from("[data-hero-enter]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.35)
                .from("[data-hero-art]", { scale: 0.88, opacity: 0, duration: 1.3 }, 0.15)

            gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(element => {
                gsap.from(element, { y: 38, opacity: 0, duration: 0.85, ease: "power3.out",
                    scrollTrigger: { trigger: element, start: "top 94%", once: true } })
            })
            gsap.utils.toArray<HTMLElement>("[data-line-title]").forEach(element => {
                gsap.from(element.querySelectorAll("[data-title-word]"), { yPercent: 110, rotation: 3, duration: 0.9, stagger: 0.07, ease: "power3.out",
                    scrollTrigger: { trigger: element, start: "top 92%", once: true } })
            })
            gsap.utils.toArray<HTMLElement>("[data-reading]").forEach(element => {
                gsap.fromTo(element.querySelectorAll("[data-reading-word]"), { opacity: 0.22 }, {
                    opacity: 1, stagger: 0.1, ease: "none",
                    scrollTrigger: { trigger: element, start: "top 80%", end: "bottom 52%", scrub: 0.5 } })
            })
            gsap.utils.toArray<HTMLElement>("[data-count]").forEach(element => {
                gsap.fromTo(element, { innerText: 0 }, { innerText: Number(element.dataset.count), snap: { innerText: 1 }, duration: 1.6, ease: "power2.out",
                    scrollTrigger: { trigger: element, start: "top 90%", once: true } })
            })
            gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach(element => {
                const tween = gsap.fromTo(element, { xPercent: 0 }, { xPercent: -50, duration: 38, ease: "none", repeat: -1, paused: true })
                let hovered = false
                const sync = () => {
                    if (!hovered && !document.hidden && ScrollTrigger.isInViewport(element)) tween.play()
                    else tween.pause()
                }
                const pause = () => { hovered = true; sync() }
                const resume = () => { hovered = false; sync() }
                element.addEventListener("pointerenter", pause)
                element.addEventListener("pointerleave", resume)
                document.addEventListener("visibilitychange", sync)
                ScrollTrigger.create({ trigger: element, start: "top bottom", end: "bottom top", onToggle: sync })
                cleanups.push(() => {
                    element.removeEventListener("pointerenter", pause)
                    element.removeEventListener("pointerleave", resume)
                    document.removeEventListener("visibilitychange", sync)
                })
            })
            gsap.utils.toArray<HTMLElement>("[data-spin]").forEach(element => {
                gsap.to(element, { rotation: 360, duration: 45, ease: "none", repeat: -1,
                    scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" } })
            })
            return () => cleanups.forEach(cleanup => cleanup())
        })
        media.add("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
            gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach(element => {
                gsap.fromTo(element, { yPercent: -7, scale: 1.12 }, { yPercent: 7, scale: 1.12, ease: "none",
                    scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: 0.7 } })
            })
            gsap.to("[data-hero-art]", { y: 35, ease: "none",
                scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 0.8 } })
        })
        let active = true
        document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh() })
        const refresh = () => ScrollTrigger.refresh()
        window.addEventListener("load", refresh, { once: true })
        return () => { active = false; window.removeEventListener("load", refresh); media.revert() }
    }, { scope: root, dependencies: [language, enabled, ready], revertOnUpdate: true })

    return <MotionContext.Provider value={{ enabled, ready, toggle: () => setEnabled(value => !value) }}><div ref={root} className="motion-root"><IntroLoader onComplete={finishIntro} />{children}</div></MotionContext.Provider>
}
