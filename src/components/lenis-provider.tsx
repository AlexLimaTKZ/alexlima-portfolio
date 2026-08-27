"use client"

import React, { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

export function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
        const coarsePointer = window.matchMedia("(pointer: coarse)")

        // Em dispositivos touch o scroll nativo já é suave e mais barato.
        // Também respeitamos usuários que pedem redução de movimento.
        if (reducedMotion.matches || coarsePointer.matches) {
            return
        }

        const lenisInstance = new Lenis({
            duration: 1.05,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1,
            infinite: false,
            autoRaf: true,
        })

        const handleVisibilityChange = () => {
            if (document.hidden) {
                lenisInstance.stop()
            } else {
                lenisInstance.start()
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            lenisInstance.destroy()
        }
    }, [])

    return <>{children}</>
}
