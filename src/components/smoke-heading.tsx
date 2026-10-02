"use client"

import { useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { useMotion } from "@/components/motion-provider"
import { portfolioCopy } from "@/lib/portfolio-copy"
import { gsap, useGSAP } from "@/lib/gsap"

export function SmokeHeading() {
    const root = useRef<HTMLHeadingElement>(null)
    const smoke = useRef<HTMLCanvasElement>(null)
    const { language } = useLanguage()
    const { enabled, ready } = useMotion()
    const copy = portfolioCopy[language]

    useGSAP(() => {
        if (!enabled || !ready) return
        const media = gsap.matchMedia()
        media.add("(prefers-reduced-motion: no-preference)", () => {
            const element = root.current!
            const word = element.querySelector<HTMLElement>(".hero-morph")!
            const phrases = Array.from(element.querySelectorAll<HTMLElement>(".hero-phrase"))
            const canvas = smoke.current!
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            let current = 0
            let viewport = true
            let alive = true
            let timeline: gsap.core.Timeline | null = null
            let delayed: gsap.core.Tween | null = null
            let started = 0
            let width = 0
            let height = 0
            type Puff = { x: number; y: number; r: number; speed: number; life: number }
            let puffs: Puff[] = []
            const renderSmoke = () => {
                const age = (performance.now() - started) / 1000
                ctx.clearRect(0, 0, width, height)
                for (const puff of puffs) {
                    const progress = Math.min(1, age / puff.life)
                    const opacity = Math.sin(progress * Math.PI) * 0.095
                    const radius = puff.r * (0.6 + progress * 2)
                    const x = puff.x + progress * puff.speed
                    const y = puff.y - progress * 45
                    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
                    gradient.addColorStop(0, `rgba(209, 238, 149, ${opacity})`)
                    gradient.addColorStop(0.48, `rgba(200, 223, 188, ${opacity * 0.5})`)
                    gradient.addColorStop(1, "rgba(200, 223, 188, 0)")
                    ctx.fillStyle = gradient
                    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
                }
                if (age > 1.8) { gsap.ticker.remove(renderSmoke); ctx.clearRect(0, 0, width, height); puffs = [] }
            }
            const emitSmoke = (phrase: HTMLElement) => {
                const rect = word.getBoundingClientRect()
                width = rect.width + 100
                height = rect.height + 100
                const dpr = Math.min(window.devicePixelRatio, 1.5)
                canvas.width = Math.ceil(width * dpr)
                canvas.height = Math.ceil(height * dpr)
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
                puffs = Array.from(phrase.querySelectorAll<HTMLElement>(".morph-char")).flatMap((letter, i) => {
                    const bounds = letter.getBoundingClientRect()
                    return [0, 1, 2].map(n => ({ x: bounds.left - rect.left + bounds.width * 0.5 + 50, y: bounds.top - rect.top + bounds.height * (0.35 + n * 0.12) + 50, r: 15 + (i * 7 + n * 13) % 23, speed: 35 + (i * 13 + n * 17) % 45, life: 1.2 + n * 0.2 }))
                })
                started = performance.now()
                gsap.ticker.add(renderSmoke)
            }
            const schedule = (delay = 3.8) => {
                delayed = gsap.delayedCall(delay, () => { if (viewport && !document.hidden) change(); else schedule(0.8) })
            }
            const change = () => {
                if (!alive) return
                const next = (current + 1) % phrases.length
                const outgoing = phrases[current]
                const incoming = phrases[next]
                emitSmoke(outgoing)
                word.dataset.word = String(next)
                timeline = gsap.timeline({ onComplete: () => { current = next; schedule() } })
                    .to(outgoing.querySelectorAll(".morph-char"), { opacity: 0, filter: "blur(13px)", y: -24, x: 13, rotation: -4, duration: 0.65, stagger: { each: 0.035, from: "random" }, ease: "power2.in" })
                    .set(outgoing, { visibility: "hidden" })
                    .set(incoming, { visibility: "visible", opacity: 1 }, 0.48)
                    .fromTo(incoming.querySelectorAll(".morph-char"), { opacity: 0, y: 18, x: -8, rotation: 3, filter: "blur(12px)" }, { opacity: 1, y: 0, x: 0, rotation: 0, filter: "blur(0px)", duration: 0.95, stagger: 0.028, ease: "power3.out" }, 0.48)
            }
            const sync = () => {
                if (document.hidden || !viewport) {
                    timeline?.pause(); delayed?.pause(); gsap.ticker.remove(renderSmoke)
                    ctx.clearRect(0, 0, width, height)
                } else { timeline?.resume(); delayed?.resume() }
            }
            const observer = new IntersectionObserver(entries => { viewport = entries[0].isIntersecting; sync() }, { threshold: 0.15 })
            observer.observe(element)
            document.addEventListener("visibilitychange", sync)
            schedule(4.5)
            return () => {
                alive = false
                delayed?.kill(); timeline?.kill()
                gsap.killTweensOf(phrases.flatMap(phrase => Array.from(phrase.querySelectorAll(".morph-char"))))
                gsap.ticker.remove(renderSmoke)
                ctx.clearRect(0, 0, width, height)
                observer.disconnect()
                document.removeEventListener("visibilitychange", sync)
                gsap.set(phrases, { clearProps: "all" })
                gsap.set(phrases.flatMap(phrase => Array.from(phrase.querySelectorAll(".morph-char"))), { clearProps: "all" })
                word.dataset.word = "0"
            }
        })
        return () => media.revert()
    }, { scope: root, dependencies: [language, enabled, ready], revertOnUpdate: true })

    const longest = copy.heroVariants.reduce((a, b) => a.length > b.length ? a : b)
    return <h1 ref={root} className="hero-title" aria-label={copy.heroLines.join(" ")}>
        <span className="hero-line" aria-hidden="true">{Array.from(copy.heroLines[0]).map((letter, i) => <span className="char-mask" key={i}><span data-hero-char>{letter === " " ? "\u00a0" : letter}</span></span>)}</span>
        <span className="hero-line hero-line-serif hero-morph" data-word="0" aria-hidden="true">
            <span className="hero-word-size">{longest}</span>
            {copy.heroVariants.map((phrase, i) => <span className="hero-phrase" key={phrase}>{Array.from(phrase).map((letter, n) => <span className="morph-char" data-hero-char={i === 0 ? "" : undefined} key={n}>{letter === " " ? "\u00a0" : letter}</span>)}</span>)}
            <canvas ref={smoke} className="hero-smoke" />
        </span>
    </h1>
}
