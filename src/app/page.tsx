import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { TechMarquee } from "@/components/tech-marquee";
import { Projects } from "@/components/projects";
import { Testimonials } from "@/components/testimonials";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SectionDivider } from "@/components/section-divider";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col items-center justify-between w-full overflow-x-hidden">
      <Hero />
      <SectionDivider variant="gradient" />
      <Services />
      <SectionDivider variant="dot" />
      <TechMarquee />
      <SectionDivider variant="gradient" />
      <Projects />
      <SectionDivider variant="dot" />
      <Testimonials />
      <SectionDivider variant="gradient" />
      <About />
      <SectionDivider variant="dot" />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}

