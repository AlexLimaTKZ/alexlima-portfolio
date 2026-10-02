import { monogramPaths } from "@/lib/monogram"

export function Monogram({ className = "" }: { className?: string }) {
    return <svg className={className} viewBox="0 0 200 145" fill="currentColor" aria-hidden="true">
        {monogramPaths.map((path, index) => <path key={index} d={path} data-mark-piece />)}
    </svg>
}
