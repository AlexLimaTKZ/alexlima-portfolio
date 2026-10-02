"use client"

import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { SITE_CONFIG } from "@/lib/constants"
import { portfolioCopy } from "@/lib/portfolio-copy"

export function Footer() {
    const { language } = useLanguage()
    const copy = portfolioCopy[language]
    return <footer className="site-footer page-shell"><div className="footer-top"><a className="footer-name" href="#home">Alex Lima<span>↗</span></a><p>{copy.footerNote}</p><div className="footer-socials"><a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={15} aria-hidden="true" /></a><a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a><a href="#home">{copy.backTop}<ArrowUpRight size={15} aria-hidden="true" /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ALEX LIMA</span><span>{copy.clientFocus}</span><span>BRASIL · {language.toUpperCase()}</span></div></footer>
}
