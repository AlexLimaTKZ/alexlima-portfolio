"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-9xl font-extrabold tracking-tighter text-primary">404</h1>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Página não encontrada</h2>
            <p className="max-w-[500px] text-muted-foreground">
                Desculpe, não conseguimos encontrar a página que você está procurando. Ela pode ter sido removida ou você pode ter digitado o endereço errado.
            </p>
            <Button asChild size="lg">
                <Link href="/">
                    Voltar para o início
                </Link>
            </Button>
        </div>
    )
}
