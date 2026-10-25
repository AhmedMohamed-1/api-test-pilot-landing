import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroSceneProps = {
  className?: string;
};

type Chip = {
  method: string;
  path: string;
  status: string;
  className: string;
  duration: number;
  delay: number;
};

const chips: Chip[] = [
  { method: "POST", path: "/users", status: "201", className: "left-[4%] top-[10%]", duration: 7, delay: 0 },
  { method: "POST", path: "/login", status: "200", className: "right-[2%] top-[26%]", duration: 8.5, delay: 0.8 },
  { method: "GET", path: "/users/{id}", status: "200", className: "bottom-[24%] left-[8%]", duration: 9.5, delay: 1.6 },
  { method: "DELETE", path: "/users/{id}", status: "204", className: "bottom-[6%] right-[10%]", duration: 7.5, delay: 2.4 },
];

const methodColor: Record<Chip["method"], string> = {
  POST: "text-primary",
  GET: "text-primary-glow",
  DELETE: "text-warning",
};

/**
 * Hero visual. Prompt 2 replaces the inside with a 3D scene — keep
 * this component's interface stable and swap the body only.
 */
export function HeroScene({ className }: HeroSceneProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative mx-auto aspect-[4/3] w-full max-w-xl", className)} aria-hidden="true">
      {/* Orb core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.07, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative size-56 rounded-full sm:size-72"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--color-primary) 75%, white 10%), var(--color-primary-glow) 55%, transparent 75%)",
            filter: "blur(28px)",
          }}
        />
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute size-72 rounded-full border border-primary/30 sm:size-96"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, color-mix(in oklab, var(--color-primary) 35%, transparent) 12%, transparent 26%)",
          }}
        />
        <div
          className="absolute size-64 rounded-full sm:size-80"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-primary-glow) 30%, transparent), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Floating glass chips */}
      {chips.map((chip) => (
        <motion.div
          key={chip.path + chip.method}
          animate={reduce ? undefined : { y: [0, -12, 0], x: [0, 6, 0] }}
          transition={{ duration: chip.duration, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
          className={cn("absolute", chip.className)}
        >
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-[11px] sm:text-xs">
            <span className={cn("font-semibold", methodColor[chip.method])}>{chip.method}</span>
            <span className="text-foreground/90">{chip.path}</span>
            <span className="text-muted-foreground">{chip.status}</span>
            <Check className="size-3.5 text-success" strokeWidth={3} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
