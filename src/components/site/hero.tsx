import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { site } from "@/config/site";
import { WaitlistForm } from "./waitlist-form";
import { HeroScene } from "./hero-scene";
import { Reveal } from "./reveal";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* Radial glow blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute right-[-10rem] top-40 h-[24rem] w-[24rem] rounded-full bg-primary-glow/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <a
              href="#waitlist"
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Sparkles className="size-4 text-primary" />
              Early access · Join the waitlist
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]">
              Autopilot for your <span className="gradient-text">API tests</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Upload your OpenAPI spec. {site.name} designs complete user-flow tests, runs them,
              and shows you exactly what broke.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-8 max-w-xl">
            <div id="waitlist" className="scroll-mt-28">
              <WaitlistForm />
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <HeroScene />
        </motion.div>
      </div>
    </section>
  );
}
