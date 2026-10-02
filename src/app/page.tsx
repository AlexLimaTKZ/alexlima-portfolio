import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { TechMarquee } from "@/components/tech-marquee"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
    return (
        <>
            <main id="main-content" tabIndex={-1}>
                <Hero />
                <Projects />
                <Services />
                <About />
                <Testimonials />
                <TechMarquee />
                <Contact />
            </main>
            <Footer />
            <ScrollToTop />
        </>
    )
}

