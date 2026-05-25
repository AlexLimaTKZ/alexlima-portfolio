"use client"

import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
    const { t, language } = useLanguage()

    const navLinks = [
        { href: "#services", label: t.services.title },
        { href: "#projects", label: t.footer.projects || "Projetos" },
        { href: "#about", label: t.nav.about },
        { href: "#contact", label: t.nav.contact },
    ]

    const socialLinks = [
        { href: "https://github.com/AlexLimaTKZ", icon: Github, label: "GitHub" },
        { href: "https://www.linkedin.com/in/alexslima1/", icon: Linkedin, label: "LinkedIn" },
        { href: "mailto:lider_alex@yahoo.com", icon: Mail, label: "Email" },
    ]

    return (
        <footer className="w-full relative z-10 bg-zinc-50 dark:bg-transparent border-t border-zinc-200 dark:border-white/[0.06] shadow-[0_-20px_60px_rgba(6,182,212,0.03)] transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {/* Brand / Coluna Esquerda */}
                    <div className="space-y-4">
                        <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent block w-fit">
                            Alex Lima
                        </span>
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-450 leading-none">
                                Full Stack Developer
                            </p>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-[280px] leading-relaxed font-sans">
                                {language === 'pt' && (
                                    <>Transformando ideias em<br />produtos digitais de alta performance.</>
                                )}
                                {language === 'es' && (
                                    <>Transformando ideas en<br />productos digitales de alto rendimiento.</>
                                )}
                                {language === 'en' && (
                                    <>Transforming ideas into<br />high-performance digital products.</>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Navigation / Coluna do Meio */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mb-5 font-mono">
                            {t.footer.navTitle || "Navegação"}
                        </h4>
                        <nav className="flex flex-col gap-3.5">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.href} 
                                    href={link.href}
                                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all hover:translate-x-1 duration-200 block py-1 font-sans cursor-pointer w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Social / Coluna da Direita */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mb-5 font-mono">
                            {t.footer.socialTitle || "Social"}
                        </h4>
                        <div className="flex gap-6">
                            {socialLinks.map((link) => {
                                const Icon = link.icon
                                return (
                                    <div key={link.label} className="flex flex-col items-center gap-1.5 group/social">
                                        <Link
                                            href={link.href}
                                            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                                            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/20 hover:border-cyan-200/50 dark:hover:border-cyan-500/20 transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
                                        >
                                            <Icon className="h-4.5 w-4.5" />
                                            <span className="sr-only">{link.label}</span>
                                        </Link>
                                        <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500 font-semibold group-hover/social:text-cyan-600 dark:group-hover/social:text-cyan-400 transition-colors duration-300">
                                            {link.label}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom bar / Linha Inferior */}
                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 font-sans">
                        © {new Date().getFullYear()} Alex Lima. {t.footer.rights}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 font-sans flex items-center gap-1">
                        <span>
                            {language === 'pt' ? "Desenvolvido com " : language === 'es' ? "Desarrollado con " : "Built with "}
                            <span className="text-cyan-500 font-bold">♥</span> 
                            {language === 'pt' ? " usando Next.js & TypeScript" : " using Next.js & TypeScript"}
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
