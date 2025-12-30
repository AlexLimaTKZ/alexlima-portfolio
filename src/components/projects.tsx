"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Github, Globe } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function Projects() {
    const { t } = useLanguage()

    // We keep the static data that IS NOT translated here, and merge with translated data
    const projectMetadata = [
        {
            tags: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
            github: "https://github.com",
            demo: "https://demo.com",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            tags: ["React", "Recharts", "Supabase", "Radix UI"],
            github: "https://github.com",
            demo: "https://demo.com",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            tags: ["OpenAI API", "Node.js", "Express", "PostgreSQL"],
            github: "https://github.com",
            demo: "https://demo.com",
            gradient: "from-orange-500 to-red-500"
        },
    ]

    return (
        <section id="projects" className="container py-24 sm:py-32 mx-auto px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{t.projects.title}</h2>
                <p className="text-muted-foreground text-lg max-w-[800px] mx-auto">
                    {t.projects.description}
                </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {t.projects.items.map((project: any, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow">
                            <div className={`h-48 w-full bg-gradient-to-br ${projectMetadata[index].gradient} transition-transform duration-500 group-hover:scale-105`} />
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex flex-wrap gap-2">
                                    {projectMetadata[index].tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="font-normal">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-4">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={projectMetadata[index].github} target="_blank">
                                        <Github className="mr-2 h-4 w-4" /> {t.projects.links.code}
                                    </Link>
                                </Button>
                                <Button size="sm" asChild>
                                    <Link href={projectMetadata[index].demo} target="_blank">
                                        <Globe className="mr-2 h-4 w-4" /> {t.projects.links.demo}
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
