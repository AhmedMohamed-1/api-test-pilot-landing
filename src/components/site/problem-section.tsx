import { motion, useReducedMotion } from "framer-motion";
import { Hourglass, ShieldAlert, Unplug } from "lucide-react";

import { Reveal } from "./reveal";

const pains = [
  {
    icon: Unplug,
    title: "Tests that can't run alone",
    body: "A login endpoint passes on its own, but the flow that depends on its token was never checked.",
  },
  {
    icon: Hourglass,
    title: "Hand-written flows go stale",
    body: "Every spec change silently breaks half of the carefully maintained suite nobody has time to fix.",
  },
  {
    icon: ShieldAlert,
    title: "Edge cases nobody has time to write",
    body: "Boundary, negative and security cases are always the first thing cut under deadline pressure.",
  },
] as const;

const chaosDots: Array<[number, number]> = [
  [60, 60], [150, 40], [260, 90], [340, 50], [90, 170],
  [200, 200], [320, 180], [370, 220], [40, 130], [170, 140],
];

const chaosLines: Array<[number, number, number, number]> = [
  [60, 60, 260, 90], [260, 90, 40, 130], [40, 130, 90, 170], [90, 170, 320, 180],
  [320, 180, 340, 50], [150, 40, 200, 200], [200, 200, 170, 140], [170, 140, 370, 220],
  [370, 220, 340, 50], [60, 60, 370, 220],
];

const flowDots: Array<{ x: number; y: number; label: string }> = [
  { x: 40, y: 200, label: "register" },
  { x: 120, y: 120, label: "login" },
  { x: 200, y: 180, label: "create" },
  { x: 280, y: 80, label: "update" },
  { x: 360, y: 150, label: "delete" },
];

const flowPath =
  "M40 200 C 70 150 90 120 120 120 C 160 120 170 180 200 180 C 240 180 250 80 280 80 C 310 80 330 150 360 150";

export function ProblemSection() {
  const reduce = useReducedMotion();

  return (
    <section id="problem" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Your API isn't a list of endpoints. <span className="gradient-text">It's a story.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Real users register, log in, create, update and delete. Every call depends on the one
            before it. Testing endpoints one by one misses the bugs that live in between, and
            writing every flow by hand takes days nobody has.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {pains.map((pain, index) => (
            <Reveal key={pain.title} delay={0.08 * index}>
              <article className="glass h-full rounded-2xl p-6">
                <pain.icon className="size-6 text-primary" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {pain.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pain.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Two-column contrast: isolated endpoints vs. connected flow */}
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <Reveal>
            <figure className="glass h-full rounded-2xl p-6">
              <figcaption className="mb-2 text-sm font-medium text-muted-foreground">
                Testing endpoints one by one
              </figcaption>
              <svg viewBox="0 0 400 260" className="w-full" role="img" aria-label="Isolated endpoint dots, unconnected">
                {chaosLines.map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--color-border)"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                  />
                ))}
                {chaosDots.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="7" fill="var(--color-muted-foreground)" opacity="0.35" />
                ))}
              </svg>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="glass relative h-full overflow-hidden rounded-2xl p-6">
              <figcaption className="mb-2 text-sm font-medium text-muted-foreground">
                A real user flow
              </figcaption>
              <svg viewBox="0 0 400 260" className="w-full" role="img" aria-label="The same endpoints connected into one ordered, glowing flow">
                <defs>
                  <linearGradient id="flow-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="var(--color-primary)" />
                    <stop offset="1" stopColor="var(--color-primary-glow)" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={flowPath}
                  fill="none"
                  stroke="url(#flow-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.4 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-72px" }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 0 8px color-mix(in oklab, var(--color-primary) 60%, transparent))" }}
                />
                {flowDots.map((dot, i) => (
                  <motion.g
                    key={dot.label}
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-72px" }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.28 }}
                  >
                    <circle cx={dot.x} cy={dot.y} r="8" fill="var(--color-background)" stroke="url(#flow-grad)" strokeWidth="2.5" />
                    <circle cx={dot.x} cy={dot.y} r="3" fill="url(#flow-grad)" />
                    <text
                      x={dot.x}
                      y={dot.y - 16}
                      textAnchor="middle"
                      fill="var(--color-muted-foreground)"
                      fontSize="11"
                      fontFamily="var(--font-mono)"
                    >
                      {dot.label}
                    </text>
                  </motion.g>
                ))}
              </svg>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
