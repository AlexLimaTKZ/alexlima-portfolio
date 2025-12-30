"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function Hero() {
    const { t } = useLanguage()

    return (
        <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-12 md:py-24 overflow-hidden">
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 md:px-8">
                {/* Text Content - Left Side */}
                <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-center md:justify-start gap-2"
                    >
                        <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-primary">
                            {t.hero.badge}
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {t.hero.title_start} <span className="text-primary">{t.hero.title_highlight}</span> {t.hero.title_end}
                    </motion.h1>

                    <motion.p
                        className="max-w-[700px] text-muted-foreground md:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t.hero.description}
                    </motion.p>

                    <motion.div
                        className="flex flex-col gap-4 sm:flex-row w-full sm:w-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Button size="lg" asChild className="w-full sm:w-auto">
                            <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer" download>
                                <Download className="mr-2 h-4 w-4" /> {t.hero.downloadCv}
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                            <a href="#contact">{t.hero.contactBtn}</a>
                        </Button>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-4 text-muted-foreground pt-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link href="https://github.com/AlexLimaTKZ" target="_blank" className="hover:text-foreground transition-colors">
                            <Github className="h-6 w-6" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link href="https://www.linkedin.com/in/alexslima1/" target="_blank" className="hover:text-foreground transition-colors">
                            <Linkedin className="h-6 w-6" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link href="mailto:lider_alex@yahoo.com" className="hover:text-foreground transition-colors">
                            <Mail className="h-6 w-6" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </motion.div>
                </div>

                {/* Image Content - Right Side */}
                <motion.div
                    className="flex justify-center items-center order-1 md:order-2"
                    initial={{ opacity: 0, scale: 0.5, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full border-4 border-primary/20 shadow-2xl overflow-hidden bg-muted/30 backdrop-blur-sm">
                        {/* Placeholder for user image */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                            {/* You can replace this specific URL with your local image later, e.g., src="/profile.png" */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/alexlima.png"
                                alt="Profile"
                                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary/40 blur-[80px]"
                    animate={{
                        x: [0, 300, 0],
                        y: [0, 200, 0],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-blue-500/40 blur-[80px]"
                    animate={{
                        x: [0, -250, 0],
                        y: [0, -150, 0],
                        scale: [1, 1.4, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
                <motion.div
                    className="absolute -bottom-[20%] left-[20%] h-[600px] w-[600px] rounded-full bg-purple-500/40 blur-[80px]"
                    animate={{
                        x: [0, 200, 0],
                        y: [0, 250, 0],
                        scale: [1, 1.6, 1],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
            </div>

            <div className="absolute inset-0 -z-10 h-full w-full bg-background/50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </section>
    )
}
