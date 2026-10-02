"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useSmoothScroll } from "@/components/lenis-provider"
import { portfolioCopy } from "@/lib/portfolio-copy"

export function ScrollToTop() {
    const [visible, setVisible] = useState(false)
    const { language } = useLanguage()
    const scrollTo = useSmoothScroll()
    useEffect(() => {
        const check = () => setVisible(window.scrollY > 900)
        window.addEventListener("scroll", check, { passive: true })
        check()
        return () => window.removeEventListener("scroll", check)
    }, [])
    return <button type="button" className={"back-to-top " + (visible ? "is-visible" : "")} tabIndex={visible ? 0 : -1} aria-hidden={!visible} aria-label={portfolioCopy[language].backTop} onClick={() => scrollTo(0)}><ArrowUp size={20} aria-hidden="true" /></button>
}
