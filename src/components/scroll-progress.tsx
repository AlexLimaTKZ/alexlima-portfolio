"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

export function ScrollProgress() {
    const progress = useRef<HTMLDivElement>(null)
    useGSAP(() => {
        gsap.fromTo(progress.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } })
    }, { scope: progress })
    return <div ref={progress} className="scroll-progress" aria-hidden="true" />
}
