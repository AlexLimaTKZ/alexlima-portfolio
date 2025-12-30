"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

export function About() {
    const { t } = useLanguage()

    return (
        <section id="about" className="container py-24 sm:py-32 mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-16">
                {/* Bio Section */}
                <motion.div
                    className="flex-1 space-y-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.about.title}</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {t.about.description1}
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {t.about.description2}
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {t.about.description3}
                    </p>
                </motion.div>

                {/* Timeline Section */}
                <div className="flex-1 space-y-8">
                    <motion.h3
                        className="text-2xl font-semibold mb-6"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {t.about.experienceTitle}
                    </motion.h3>
                    <div className="relative border-l border-muted ml-3 space-y-8">
                        {t.about.experiences.map((exp: any, index: number) => (
                            <motion.div
                                key={index}
                                className="ml-6 relative"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <span className="absolute -left-[2.4rem] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background ring-4 ring-background" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-muted-foreground font-mono">{exp.year}</span>
                                    <h4 className="text-lg font-semibold">{exp.title}</h4>
                                    <span className="text-sm font-medium text-primary">{exp.company}</span>
                                    <p className="text-muted-foreground mt-2">{exp.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
