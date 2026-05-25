"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-provider"

// Replaced with specific paths / simpler SVGs for file size and clarity
const FlagUSSimple = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="h-8 w-12 rounded-sm object-cover">
        <path fill="#bd3d44" d="M0 0h640v480H0" />
        <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 202.8h640M0 276.5h640M0 350.2h640m0 73.7h640" />
        <path fill="#192f5d" d="M0 0h264.8v221H0z" />
        <g fill="#fff">
            <g id="s18">
                <g id="s9">
                    <g id="s5">
                        <g id="s4">
                            <path id="s" d="M24.7 18.5h7.9l-6.4 4.6 2.4 7.6-6.4-4.6-6.4 4.6 2.4-7.6-6.4-4.6h7.9l2.5-7.6z" />
                            <use xlinkHref="#s" y="38" />
                            <use xlinkHref="#s" y="76" />
                            <use xlinkHref="#s" y="114" />
                        </g>
                        <use xlinkHref="#s" y="152" />
                    </g>
                    <use xlinkHref="#s9" x="238" />
                </g>
                <use xlinkHref="#s18" x="476" />
            </g>
            <use xlinkHref="#s18" x="238" y="19" />
            <use xlinkHref="#s9" x="476" y="19" />
        </g>
    </svg>
)

const FlagBR = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="h-8 w-12 rounded-sm object-cover">
        <path fill="#009c3b" d="M0 0h640v480H0z" />
        <path fill="#ffdf00" d="M320 64L556 240 320 416 84 240z" />
        <circle cx="320" cy="240" r="88" fill="#002776" />
        <path fill="#fff" fillRule="evenodd" d="M320 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z" clipPath="url(#a)" />
        <path fill="#fff" d="M224 240h208v2H224z" transform="rotate(-15 320 240)" />
    </svg>
)

const FlagES = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="h-8 w-12 rounded-sm object-cover">
        <path fill="#aa151b" d="M0 0h640v480H0z" />
        <path fill="#f1bf00" d="M0 120h640v240H0z" />
    </svg>
)

const getFlag = (lang: string) => {
    switch (lang) {
        case "en": return <FlagUSSimple />
        case "pt": return <FlagBR />
        case "es": return <FlagES />
        default: return <FlagUSSimple />
    }
}

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-16 px-0">
                    {getFlag(language)}
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")} className="gap-2">
                    <FlagUSSimple /> English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("pt")} className="gap-2">
                    <FlagBR /> Português
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("es")} className="gap-2">
                    <FlagES /> Español
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
