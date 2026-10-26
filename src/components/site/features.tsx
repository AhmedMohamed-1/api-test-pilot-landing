import { motion, useReducedMotion, useSpring } from "framer-motion";
import { EyeOff, FileSearch, History, ListChecks, Route, Trash2, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/* ---------- Spotlight + tilt card ---------- */

function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 160, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 18 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (reduce) return;
    rotateY.set(((x / rect.width) * 2 - 1) * 3.5);
    rotateX.set(-(((y / rect.height) * 2 - 1) * 3.5));
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduce ? {} : { rotateX, rotateY, transformPerspective: 900 }}
      className={cn("group relative h-full", className)}
    >
      <div className="glass relative h-full overflow-hidden rounded-2xl p-6">
        {/* Cursor spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--color-primary) 16%, transparent), transparent 70%)",
          }}
        />
        <div className="relative">{children}</div>
      </div>
    </motion.div>
  );
}

/* ---------- Micro animations ---------- */

function FlowStepsAnimation() {
  const steps = ["POST /users", "POST /login", "GET /users/{id}", "DELETE /users/{id}"];
  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((step, i) => (
        <span
          key={step}
          className="animate-seq-pulse rounded-lg border border-border bg-background/60 px-2.5 py-1.5 font-mono text-[11px] text-foreground/90"
          style={{ "--i": i } as CSSProperties}
        >
          {step}
        </span>
      ))}
    </div>
  );
}

function CaseTickerAnimation() {
  const cases = ["Happy path", "Validation", "Boundary", "Negative", "Security"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % cases.length), 1200);
    return () => window.clearInterval(id);
  }, [cases.length]);

  return (
    <ul className="space-y-1.5 font-mono text-xs">
      {cases.map((item, i) => (
        <li
          key={item}
          className={cn(
            "rounded-md px-2 py-1 transition-colors duration-300",
            i === active ? "bg-primary/15 text-foreground" : "text-muted-foreground/70",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function SecretsAnimation() {
  const envs = ["Dev", "Staging", "Prod"] as const;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % envs.length), 1600);
    return () => window.clearInterval(id);
  }, [envs.length]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {envs.map((env, i) => (
          <span
            key={env}
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors duration-300",
              i === active
                ? "border-primary/50 bg-primary/15 text-foreground"
                : "border-border text-muted-foreground/70",
            )}
          >
            {env}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <EyeOff className="size-3.5 text-success" />
        <span>
          token=<span className="text-success">••••••••••••</span>
        </span>
      </div>
    </div>
  );
}

function VersionsAnimation() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-24" aria-hidden="true">
      <div className="absolute inset-x-6 bottom-0 rounded-xl border border-border bg-background/50 px-3 py-2 font-mono text-[11px] text-muted-foreground/60">
        spec-v1.yaml
      </div>
      <div className="absolute inset-x-3 bottom-3 rounded-xl border border-border bg-background/70 px-3 py-2 font-mono text-[11px] text-muted-foreground/80">
        spec-v2.yaml
      </div>
      <motion.div
        animate={reduce ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 bottom-6 rounded-xl border border-primary/50 bg-card px-3 py-2 font-mono text-[11px] text-foreground shadow-[0_0_20px_-6px_color-mix(in_oklab,var(--color-primary)_55%,transparent)]"
      >
        spec-v3.yaml <span className="text-primary">· current</span>
      </motion.div>
    </div>
  );
}

function EvidenceAnimation() {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-3 font-mono text-[11px]">
      <p className="flex items-center gap-2 text-muted-foreground">
        <span className="text-destructive">POST /orders → 500 · 213ms</span>
      </p>
      <p className="mt-1.5 flex items-center gap-2 text-muted-foreground">
        <span>assert status == 201</span>
        <span className="animate-caret inline-block h-3.5 w-1.5 bg-primary" />
      </p>
    </div>
  );
}

function CleanupAnimation() {
  const steps = ["created", "updated", "deleted"];
  return (
    <div className="flex flex-wrap gap-2 font-mono text-[11px]">
      {steps.map((step, i) => (
        <span
          key={step}
          className="animate-seq-pulse rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-foreground/90"
          style={{ "--i": i } as CSSProperties}
        >
          {step} · 204 ✓
        </span>
      ))}
    </div>
  );
}

/* ---------- Bento content ---------- */

type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
  span: string;
  animation: ReactNode;
};

const features: Feature[] = [
  {
    icon: Route,
    title: "Whole-flow testing",
    body: "Create, log in, read, delete. Steps run in order and share data automatically.",
    span: "md:col-span-4",
    animation: <FlowStepsAnimation />,
  },
  {
    icon: ListChecks,
    title: "Every case, every flow",
    body: "Happy path, validation, boundary, negative and security cases generated for each journey.",
    span: "md:col-span-2",
    animation: <CaseTickerAnimation />,
  },
  {
    icon: EyeOff,
    title: "Environments and secrets",
    body: "Run the same tests on Dev, Staging or Prod. Secret values stay encrypted and masked in results.",
    span: "md:col-span-2",
    animation: <SecretsAnimation />,
  },
  {
    icon: History,
    title: "Versioned specs",
    body: "Import a new version without losing the old one. Old endpoints and tests stay as living documentation.",
    span: "md:col-span-4",
    animation: <VersionsAnimation />,
  },
  {
    icon: FileSearch,
    title: "Evidence, not guesses",
    body: "Every result keeps the real request, response, timing and failed assertion.",
    span: "md:col-span-3",
    animation: <EvidenceAnimation />,
  },
  {
    icon: Trash2,
    title: "Cleans up after itself",
    body: "Cleanup steps remove the test data a flow created, even when something fails.",
    span: "md:col-span-3",
    animation: <CleanupAnimation />,
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[26rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Features</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Everything a flow needs.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={0.06 * index} className={feature.span}>
              <SpotlightCard>
                <feature.icon className="size-6 text-primary" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                <div className="mt-5">{feature.animation}</div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
