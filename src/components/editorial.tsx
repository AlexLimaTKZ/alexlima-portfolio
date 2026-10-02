"use client"

import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { gsap, useGSAP } from "@/lib/gsap"
import { useMotion } from "@/components/motion-provider"

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
    return <div className="section-label" data-reveal><span className="section-index">{index}</span><span>{children}</span></div>
}
export function EditorialTitle({ children, className = "" }: { children: string; className?: string }) {
    return <h2 className={`editorial-title ${className}`} data-line-title aria-label={children}>{children.split(" ").map((word, index) => <span className="word-mask" aria-hidden="true" key={`${word}-${index}`}><span data-title-word>{word}&nbsp;</span></span>)}</h2>
}
export function ReadingText({ children }: { children: string }) {
    return <p className="reading-text" data-reading><span className="sr-only">{children}</span><span aria-hidden="true">{children.split(" ").map((word, index) => <span key={`${word}-${index}`} data-reading-word>{word} </span>)}</span></p>
}
export function MagneticLink({ children, className = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    const anchor = useRef<HTMLAnchorElement>(null)
    const { enabled } = useMotion()
    useGSAP(() => {
        if (!enabled || !anchor.current) return
        const media = gsap.matchMedia()
        media.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
            const element = anchor.current!
            const content = element.querySelector(".magnetic-content")
            const moveX = gsap.quickTo(content, "x", { duration: 0.5, ease: "power3.out" })
            const moveY = gsap.quickTo(content, "y", { duration: 0.5, ease: "power3.out" })
            const move = (event: PointerEvent) => {
                const rect = element.getBoundingClientRect()
                moveX((event.clientX - rect.left - rect.width / 2) * 0.16)
                moveY((event.clientY - rect.top - rect.height / 2) * 0.22)
            }
            const reset = () => { moveX(0); moveY(0) }
            element.addEventListener("pointermove", move)
            element.addEventListener("pointerleave", reset)
            element.addEventListener("blur", reset)
            return () => {
                element.removeEventListener("pointermove", move)
                element.removeEventListener("pointerleave", reset)
                element.removeEventListener("blur", reset)
            }
        })
        return () => media.revert()
    }, { scope: anchor, dependencies: [enabled], revertOnUpdate: true })
    return <a ref={anchor} className={`magnetic-link ${className}`} {...props}><span className="magnetic-content">{children}<ArrowUpRight aria-hidden="true" size={20} /></span></a>
}
export function Asterisk({ className = "" }: { className?: string }) {
    return <svg aria-hidden="true" className={className} viewBox="0 0 100 100" fill="none"><path d="M50 2v96M2 50h96M16 16l68 68M16 84l68-68" stroke="currentColor" strokeWidth="13" /></svg>
}
