"use client"

import { useRef, type RefObject } from "react"
import { useLanguage } from "@/components/language-provider"
import { useMotion } from "@/components/motion-provider"
import { Monogram } from "@/components/monogram"
import { gsap, useGSAP } from "@/lib/gsap"
import { portfolioCopy } from "@/lib/portfolio-copy"
import type { createHeroScene } from "@/components/hero-scene"
import { ARMOR_TIMING, type HeroMechanismState } from "@/lib/hero-mechanism"

export function InteractiveMonogram({ plane }: {
    plane: RefObject<HTMLDivElement | null>
}) {
    const root = useRef<HTMLDivElement>(null)
    const canvas = useRef<HTMLCanvasElement>(null)
    const trigger = useRef<HTMLButtonElement>(null)
    const { enabled } = useMotion()
    const { language } = useLanguage()
    const copy = portfolioCopy[language]

    useGSAP((_, contextSafe) => {
        if (!contextSafe) return
        const host = root.current!
        const button = trigger.current!
        // Child layout effects can run before React attaches the parent's ref.
        const surface = plane.current ?? host.closest<HTMLDivElement>(".hero-shock-plane")!
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
        const fine = window.matchMedia("(pointer: fine)")
        let scene: ReturnType<typeof createHeroScene> = null
        let alive = true
        let visible = true
        let held = false
        let hovered = false
        let pointerId: number | null = null
        let elapsed = 0
        let previousTime = 0
        let lastEnergy = -1
        let unavailable = false
        let sequence: gsap.core.Timeline | null = null
        let phase: "idle" | "charging" | "unlocking" | "opening" | "open" | "ascending" | "infusing" | "arcane" | "returning" = "idle"
        const state: HeroMechanismState = { charge: 0, unlock: 0, open: 0, ascent: 0, infusion: 0, alignment: 0, hover: 0, x: 0, y: 0 }
        const xSetter = gsap.quickSetter(surface, "x", "px")
        const ySetter = gsap.quickSetter(surface, "y", "px")
        const turnSetter = gsap.quickSetter(surface, "rotation", "deg")
        const tiltSetter = gsap.quickSetter(surface, "rotationY", "deg")
        const scaleSetter = gsap.quickSetter(surface, "scale")
        const motionAllowed = () => enabled && !reduce.matches && !unavailable
        const restorePlane = () => { xSetter(0); ySetter(0); turnSetter(0); tiltSetter(0); scaleSetter(1) }
        const setPhase = (next: typeof phase) => { phase = next; host.dataset.phase = next }
        setPhase("idle")

        const tick = (time: number) => {
            const delta = previousTime ? Math.min(time - previousTime, 0.05) : 0
            previousTime = time
            if (motionAllowed()) elapsed += delta
            scene?.render(elapsed, state, motionAllowed())
            const energy = Math.max(state.charge, state.open)
            if (energy > 0.002 && motionAllowed()) {
                // The sculpture charges first. The page only reacts gently when the locks release.
                const shock = state.unlock * (1 - state.open)
                xSetter(Math.sin(elapsed * 23) * shock)
                ySetter(Math.cos(elapsed * 19) * shock * 0.6)
                turnSetter(state.open * -0.35)
                tiltSetter(state.open * -2.8)
                scaleSetter(1 - state.open * 0.009)
            } else if (lastEnergy > 0) restorePlane()
            lastEnergy = energy
            host.dataset.charge = state.charge.toFixed(3)
            host.dataset.open = state.open.toFixed(3)
            host.dataset.ascent = state.ascent.toFixed(3)
            host.dataset.infusion = state.infusion.toFixed(3)
            host.style.setProperty("--logo-charge", String(state.charge))
        }
        const syncTicker = () => {
            gsap.ticker.remove(tick)
            previousTime = 0
            if (visible && !document.hidden && motionAllowed()) gsap.ticker.add(tick)
            else if (!document.hidden && visible) tick(0)
        }
        const release = contextSafe((immediate = false) => {
            if (!held && (phase === "idle" || phase === "returning") && !immediate) return
            held = false
            host.dataset.held = "false"
            button.setAttribute("aria-pressed", "false")
            const captured = pointerId
            pointerId = null
            if (captured !== null && button.hasPointerCapture(captured)) button.releasePointerCapture(captured)
            sequence?.kill()
            if (immediate || !motionAllowed()) {
                gsap.set(state, { charge: 0, unlock: 0, open: 0, ascent: 0, infusion: 0, alignment: 0 })
                host.dataset.charge = "0.000"
                host.dataset.open = "0.000"
                host.dataset.ascent = "0.000"
                host.dataset.infusion = "0.000"
                host.style.setProperty("--logo-charge", "0")
                setPhase("idle")
                restorePlane()
                return
            }
            setPhase("returning")
            // Drain the core, bring the lifted plates back, then close the armor.
            const drain = state.infusion > 0.01 ? 0.36 : 0
            const land = state.ascent > 0.01 ? 0.7 : 0
            const rejoin = drain + land
            const close = state.open > 0.01 ? ARMOR_TIMING.close : 0.2
            sequence = gsap.timeline({ onComplete: () => { setPhase("idle"); restorePlane() } })
                .to(state, { infusion: 0, duration: drain, ease: "power2.in" }, 0)
                .to(state, { ascent: 0, duration: land, ease: "power2.inOut" }, drain)
                .to(state, { open: 0, duration: close, ease: "power3.inOut" }, rejoin)
                .to(state, { unlock: 0, duration: 0.2, ease: "power2.inOut" }, rejoin + Math.max(0, close - 0.13))
                .to(state, { charge: 0, duration: 0.48, ease: "power2.out" }, rejoin + Math.max(0, close - 0.25))
                .to(state, { alignment: 0, duration: 0.5, ease: "power2.inOut" }, rejoin + close)
        })
        // Native pointer/focus events must not be interpreted as the immediate-reset boolean.
        const end = () => release()
        const start = contextSafe(() => {
            if (!motionAllowed() || held) return
            sequence?.kill()
            held = true
            host.dataset.held = "true"
            button.setAttribute("aria-pressed", "true")
            setPhase(state.infusion > 0.01 ? "infusing" : state.ascent > 0.01 ? "ascending" : "charging")
            const charge = Math.max(0.12, ARMOR_TIMING.charge * (1 - state.charge))
            const unlock = ARMOR_TIMING.unlock * (1 - state.unlock)
            const open = ARMOR_TIMING.open * (1 - state.open)
            const ascent = ARMOR_TIMING.ascent * (1 - state.ascent)
            const infusion = ARMOR_TIMING.infusion * (1 - state.infusion)
            const openedAt = charge + unlock + open
            const liftAt = openedAt + (state.ascent > 0.01 ? 0 : ARMOR_TIMING.suspension)
            const infuseAt = liftAt + ascent
            sequence = gsap.timeline()
                .to(state, { alignment: 1, duration: 0.5, ease: "power2.out" }, 0)
                .to(state, { charge: 1, duration: charge, ease: "power1.inOut" }, 0)
                .call(() => { if (unlock > 0.01) setPhase("unlocking") }, [], charge)
                .to(state, { unlock: 1, duration: unlock, ease: "power2.out" }, charge)
                .call(() => { if (open > 0.01) setPhase("opening") }, [], charge + unlock)
                .to(state, { open: 1, duration: open, ease: "power2.inOut" }, charge + unlock)
                .call(() => { if (state.ascent < 0.01) setPhase("open") }, [], openedAt)
                .call(() => setPhase("ascending"), [], liftAt)
                .to(state, { ascent: 1, duration: ascent, ease: "none" }, liftAt)
                .call(() => setPhase("infusing"), [], infuseAt)
                .to(state, { infusion: 1, duration: infusion, ease: "power1.inOut" }, infuseAt)
                .call(() => setPhase("arcane"))
        })
        const down = (event: PointerEvent) => {
            if (event.button !== 0 || !motionAllowed()) return
            pointerId = event.pointerId
            button.setPointerCapture(event.pointerId)
            start()
        }
        const move = contextSafe((event: PointerEvent) => {
            if (!motionAllowed() || !fine.matches) return
            const rect = host.getBoundingClientRect()
            gsap.to(state, { x: (event.clientX - rect.left) / rect.width * 2 - 1, y: (event.clientY - rect.top) / rect.height * 2 - 1, duration: 0.65, overwrite: "auto" })
        })
        const enter = contextSafe(() => {
            hovered = true
            if (motionAllowed() && fine.matches) gsap.to(state, { hover: 1, duration: 0.35, overwrite: "auto" })
        })
        const leave = contextSafe(() => {
            hovered = false
            gsap.to(state, { hover: 0, x: 0, y: 0, duration: 0.5, overwrite: "auto" })
        })
        const keyDown = (event: KeyboardEvent) => { if ([" ", "Enter"].includes(event.key)) { event.preventDefault(); start() } }
        const keyUp = (event: KeyboardEvent) => { if ([" ", "Enter"].includes(event.key)) { event.preventDefault(); release() } }
        const preference = () => {
            host.dataset.interactive = String(motionAllowed())
            button.disabled = !motionAllowed()
            if (!motionAllowed()) { release(true); gsap.set(state, { hover: 0, x: 0, y: 0 }); restorePlane() }
            syncTicker()
        }
        const visibility = () => { if (document.hidden) { release(true); leave() }; syncTicker() }
        const observer = new IntersectionObserver(entries => {
            visible = entries[0].isIntersecting
            if (!visible) { release(true); if (hovered) leave() }
            syncTicker()
        }, { threshold: 0.05 })
        observer.observe(host)
        const resize = () => { if (!motionAllowed()) tick(0) }
        button.addEventListener("pointerdown", down)
        button.addEventListener("pointerup", end)
        button.addEventListener("pointercancel", end)
        button.addEventListener("lostpointercapture", end)
        button.addEventListener("pointerenter", enter)
        button.addEventListener("pointerleave", leave)
        button.addEventListener("pointermove", move)
        button.addEventListener("keydown", keyDown)
        button.addEventListener("keyup", keyUp)
        button.addEventListener("blur", end)
        window.addEventListener("blur", end)
        window.addEventListener("resize", resize)
        document.addEventListener("visibilitychange", visibility)
        reduce.addEventListener("change", preference)
        const ready = () => {
            host.dataset.sceneReady = "true"
            document.dispatchEvent(new Event("hero-scene-ready"))
        }
        preference()
        import("@/components/hero-scene").then(({ createHeroScene }) => {
            if (!alive) return
            try {
                scene = createHeroScene(canvas.current!)
                scene?.render(0, state)
                if (scene) host.dataset.rendered = "true"
            } catch {
                // The static vector remains usable when WebGL is unavailable.
                scene?.dispose()
                scene = null
            }
            if (!scene) { unavailable = true; preference() }
            ready()
        }).catch(() => { if (alive) { unavailable = true; preference(); ready() } })
        return () => {
            alive = false
            observer.disconnect()
            gsap.ticker.remove(tick)
            sequence?.kill()
            gsap.killTweensOf(state)
            restorePlane()
            scene?.dispose()
            button.removeEventListener("pointerdown", down)
            button.removeEventListener("pointerup", end)
            button.removeEventListener("pointercancel", end)
            button.removeEventListener("lostpointercapture", end)
            button.removeEventListener("pointerenter", enter)
            button.removeEventListener("pointerleave", leave)
            button.removeEventListener("pointermove", move)
            button.removeEventListener("keydown", keyDown)
            button.removeEventListener("keyup", keyUp)
            button.removeEventListener("blur", end)
            window.removeEventListener("blur", end)
            window.removeEventListener("resize", resize)
            document.removeEventListener("visibilitychange", visibility)
            reduce.removeEventListener("change", preference)
        }
    }, { scope: root, dependencies: [enabled], revertOnUpdate: true })

    return <div ref={root} className="hero-art" data-hero-art data-held="false" data-interactive="false" data-phase="idle">
        <div className="hero-art-aura" aria-hidden="true" />
        <Monogram className="hero-mark-fallback" />
        <canvas ref={canvas} className="hero-mark-canvas" aria-hidden="true" />
        <span className="logo-coordinate" aria-hidden="true">AL—01 / INTERACTIVE OBJECT</span>
        <button ref={trigger} className="logo-trigger" aria-label={copy.logoAction} aria-pressed="false" aria-describedby="logo-instruction" />
        <div id="logo-instruction" className="logo-instruction">
            <span className="logo-hint-idle"><span aria-hidden="true">↳</span> {copy.logoHint}</span>
            <span className="logo-hint-charging">{copy.logoCharging}</span>
            <span className="logo-hint-unlocking">{copy.logoUnlocking}</span>
            <span className="logo-hint-opening">{copy.logoOpening}</span>
            <span className="logo-hint-open">{copy.logoRelease}</span>
            <span className="logo-hint-ascending">{copy.logoAscending}</span>
            <span className="logo-hint-infusing">{copy.logoInfusing}</span>
            <span className="logo-hint-arcane">{copy.logoArcane}</span>
            <span className="logo-hint-returning">{copy.logoReturning}</span>
        </div>
        <span className="logo-charge-track" aria-hidden="true"><span /></span>
        <span className="logo-caption">{copy.logoCaption}</span>
    </div>
}
