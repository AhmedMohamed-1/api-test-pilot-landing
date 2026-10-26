import { motion, useReducedMotion } from "framer-motion";
import { Bug, Play, Upload, Workflow } from "lucide-react";

import { Reveal } from "./reveal";

const steps = [
  {
    icon: Upload,
    title: "Upload your spec",
    body: "Drop in your OpenAPI file. We map every endpoint, parameter and response.",
  },
  {
    icon: Workflow,
    title: "AI designs the flows",
    body: "Endpoints that depend on each other are grouped into real user journeys, with ids and tokens passed from step to step.",
  },
  {
    icon: Play,
    title: "Tests run for you",
    body: "Every flow runs against the environment you choose, covering happy paths, validation, boundary, negative and security cases.",
  },
  {
    icon: Bug,
    title: "See what broke",
    body: "Pass or fail per step and per assertion, with the exact request and response that caused it.",
  },
] as const;

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            From spec to green runs.
          </h2>
        </Reveal>

        <div className="relative mt-14">
          {/* Connecting line — horizontal on desktop, vertical on mobile */}
          <div aria-hidden="true" className="absolute left-[1.75rem] right-[calc(25%-1.75rem)] top-7 hidden lg:block">
            <motion.div
              className="h-px origin-left bg-gradient-to-r from-primary via-primary-glow to-primary/10"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-72px" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </div>
          <div aria-hidden="true" className="absolute bottom-8 left-7 top-8 w-px lg:hidden">
            <motion.div
              className="h-full w-px origin-top bg-gradient-to-b from-primary via-primary-glow to-primary/10"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-72px" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={0.12 * index}>
                <li className="relative lg:pt-0">
                  <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-border bg-card shadow-[0_0_24px_-6px_color-mix(in_oklab,var(--color-primary)_50%,transparent)]">
                    <span className="font-display text-lg font-bold gradient-text">
                      {index + 1}
                    </span>
                  </div>
                  <step.icon className="mt-5 size-5 text-primary-glow lg:mt-6" strokeWidth={1.75} />
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
