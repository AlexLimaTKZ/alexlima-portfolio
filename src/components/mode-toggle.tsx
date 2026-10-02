"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"

export function ModeToggle() {
    const { setTheme } = useTheme()
    const { language } = useLanguage()
    const label = language === "pt" ? "Alternar tema" : language === "es" ? "Cambiar tema" : "Toggle theme"
    return <button type="button" className="header-control theme-toggle" aria-label={label} onClick={() => setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")}><Sun className="theme-sun" size={17} aria-hidden="true" /><Moon className="theme-moon" size={17} aria-hidden="true" /></button>
}
