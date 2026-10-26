import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";

import { site } from "@/config/site";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { BuiltFor } from "@/components/site/built-for";
import { ProblemSection } from "@/components/site/problem-section";
import { HowItWorks } from "@/components/site/how-it-works";
import { Features } from "@/components/site/features";
import { WhyItMatters } from "@/components/site/why-it-matters";
import { Faq } from "@/components/site/faq";
import { FinalCta } from "@/components/site/final-cta";
import { Footer } from "@/components/site/footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — ${site.tagline}` },
      { name: "description", content: site.description },
      { property: "og:title", content: `${site.name} — ${site.tagline}` },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-background font-sans text-foreground">
        {/* Page backdrop: faint grid + noise */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_30%,transparent_75%)]" />
          <div className="absolute inset-0 bg-noise opacity-[0.05]" />
        </div>

        <Navbar />
        <main>
          <Hero />
          <BuiltFor />
          <ProblemSection />
          <HowItWorks />
          <Features />
          <WhyItMatters />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
