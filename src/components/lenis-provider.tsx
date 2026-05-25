"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

const LenisContext = createContext<Lenis | null>(null)

export function LenisProvider({ children }: { children: React.ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null)

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            autoRaf: true,
        })

        requestAnimationFrame(() => {
            setLenis(lenisInstance)
        })

        return () => {
            lenisInstance.destroy()
        }
    }, [])

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    )
}

export const useLenis = () => useContext(LenisContext)
