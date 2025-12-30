"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm as useHookForm } from "react-hook-form"
import { useForm as useFormspree } from "@formspree/react"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useLanguage } from "@/components/language-provider"

// REPLACE THIS WITH YOUR ACTUAL FORMSPREE ID
const FORMSPREE_FORM_ID = "xgoebqbq";

export function Contact() {
    const { t } = useLanguage()
    const [state, handleSubmit] = useFormspree(FORMSPREE_FORM_ID);

    const formSchema = z.object({
        name: z.string().min(2, {
            message: t.contact.validation.name,
        }),
        email: z.string().email({
            message: t.contact.validation.email,
        }),
        message: z.string().min(10, {
            message: t.contact.validation.message,
        }),
    })

    const form = useHookForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    // Wrapper to handle both Zod validation and Formspree submission
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        handleSubmit(data);
    }

    if (state.succeeded) {
        return (
            <section id="contact" className="container py-24 sm:py-32 mx-auto px-4 md:px-8 bg-muted/50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl text-green-500">{t.contact.validation.success}</CardTitle>
                            <CardDescription className="text-xl mt-4">
                                {t.contact.title === "Get in Touch" ? "Thanks for reaching out! I'll get back to you soon." : "Obrigado pelo contato! Retornarei em breve."}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </motion.div>
            </section>
        );
    }

    return (
        <section id="contact" className="container py-24 sm:py-32 mx-auto px-4 md:px-8 bg-muted/50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl text-center">{t.contact.title}</CardTitle>
                        <CardDescription className="text-center text-lg">
                            {t.contact.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t.contact.form.name}</FormLabel>
                                            <FormControl>
                                                <Input autoComplete="off" placeholder={t.contact.form.namePlaceholder} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t.contact.form.email}</FormLabel>
                                            <FormControl>
                                                <Input autoComplete="off" placeholder={t.contact.form.emailPlaceholder} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t.contact.form.message}</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={t.contact.form.messagePlaceholder}
                                                    className="min-h-[120px]"
                                                    autoComplete="off"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={state.submitting}>
                                    {state.submitting ? "..." : t.contact.form.submit}
                                </Button>
                                {state.errors && (
                                    <p className="text-sm text-red-500 text-center mt-2">
                                        {t.contact.title === "Get in Touch" ? "Something went wrong. Please try again." : "Algo deu errado. Tente novamente."}
                                    </p>
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    )
}
