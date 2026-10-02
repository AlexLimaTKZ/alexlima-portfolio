"use client"

import { useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { Monogram } from "@/components/monogram"
import { portfolioCopy } from "@/lib/portfolio-copy"
import { gsap, useGSAP } from "@/lib/gsap"

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
    const root = useRef<HTMLDivElement>(null)
    const number = useRef<HTMLSpanElement>(null)
    const { language } = useLanguage()
    const copy = portfolioCopy[language]

    useGSAP(() => {
        const element = root.current!
        let alive = true
        let exiting = false
        let exit: gsap.core.Timeline | null = null
        const state = { progress: 0 }
        const tasks = new Set<string>()
        const pending: gsap.core.Tween[] = []
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
        const skip = reduce.matches || !!window.location.hash || window.scrollY > 100
        const started = performance.now()
        const progress = (value: number) => {
            gsap.to(state, { progress: value, duration: 0.45, overwrite: true, ease: "power2.out", onUpdate: () => {
                if (number.current) number.current.textContent = Math.round(state.progress).toString().padStart(2, "0")
                element.style.setProperty("--load-progress", String(state.progress / 100))
            } })
        }
        const leave = () => {
            if (!alive || exiting) return
            exiting = true
            progress(100)
            exit = gsap.timeline({ onComplete: () => {
                element.hidden = true
                onComplete()
            } })
                .to(".loader-mark", { y: -15, scale: 0.92, opacity: 0, duration: 0.35 }, 0.2)
                .to(".loader-meta, .loader-counter", { opacity: 0, duration: 0.2 }, 0.3)
                .to(element, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "power4.inOut" }, 0.5)
        }
        const completeTask = (task: string) => {
            if (!alive || exiting) return
            tasks.add(task)
            const value = (tasks.has("fonts") ? 25 : 0) + (tasks.has("image") ? 15 : 0) + (tasks.has("scene") ? 60 : 0)
            progress(value)
            if (tasks.size === 3) {
                pending.push(gsap.delayedCall(Math.max(0, 0.85 - (performance.now() - started) / 1000), leave))
            }
        }
        const sceneReady = () => completeTask("scene")
        const skipMotion = () => { if (reduce.matches) { element.hidden = true; onComplete() } }
        if (skip) {
            element.hidden = true
            onComplete()
            return
        }
        // Progress tracks the critical fonts, preview image and first rendered 3D frame.
        document.fonts.ready.then(() => completeTask("fonts"))
        const image = document.querySelector<HTMLImageElement>(".peek-image img")
        if (image) image.decode().catch(() => {}).then(() => completeTask("image"))
        else completeTask("image")
        document.addEventListener("hero-scene-ready", sceneReady)
        if (document.querySelector("[data-scene-ready=true]")) sceneReady()
        reduce.addEventListener("change", skipMotion)
        gsap.fromTo(".loader-frame", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" })
        gsap.fromTo("[data-mark-piece]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.65, ease: "power3.out" })
        gsap.to(".loader-mark", { rotationY: 16, rotationX: -8, duration: 1.4, repeat: 1, yoyo: true, ease: "sine.inOut" })
        // A slow device or failed asset must never trap the visitor behind the intro.
        gsap.delayedCall(2.7, leave)
        return () => {
            alive = false
            document.removeEventListener("hero-scene-ready", sceneReady)
            reduce.removeEventListener("change", skipMotion)
            pending.forEach(tween => tween.kill())
            exit?.kill()
            gsap.killTweensOf(state)
        }
    }, { scope: root, dependencies: [onComplete], revertOnUpdate: true })

    return <div ref={root} className="intro-loader" role="status" aria-label={copy.loading}>
        <div className="loader-top"><span>ALEX LIMA</span><span>{copy.loaderLabel}</span></div>
        <div className="loader-center">
            <div className="loader-frame"><i /><i /><i /><i /><Monogram className="loader-mark" /></div>
            <span className="loader-meta">{copy.loaderWords}</span>
        </div>
        <div className="loader-bottom"><span>{copy.loaderNote}</span><span className="loader-counter" aria-hidden="true"><span ref={number}>00</span><small>/ 100</small></span></div>
    </div>
}
