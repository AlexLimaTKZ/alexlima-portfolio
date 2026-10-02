"use client"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-provider"
import type { Language } from "@/lib/translations"

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage()
    const label = language === "pt" ? "Alterar idioma" : language === "es" ? "Cambiar idioma" : "Change language"
    return <DropdownMenu><DropdownMenuTrigger asChild><button type="button" className="header-control language-control" aria-label={label}>{language.toUpperCase()}<ChevronDown size={12} aria-hidden="true" /></button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuRadioGroup value={language} onValueChange={value => setLanguage(value as Language)}><DropdownMenuRadioItem value="pt">Português</DropdownMenuRadioItem><DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem><DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>
}
