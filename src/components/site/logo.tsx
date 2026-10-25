import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * ApiTestPilot mark: a paper-plane/compass shape built from connected
 * nodes, filled with the accent gradient. Inline SVG so it inherits
 * sizing via className.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  const gradId = `logo-grad-${id.replace(/[^a-zA-Z0-9-]/g, "")}`;

  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={site_name}
      className={cn("size-8", className)}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-primary)" />
          <stop offset="1" stopColor="var(--color-primary-glow)" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${gradId})`} strokeWidth="1.5" opacity="0.55">
        <line x1="14" y1="32" x2="50" y2="16" />
        <line x1="50" y1="16" x2="36" y2="50" />
        <line x1="36" y1="50" x2="14" y2="32" />
      </g>
      <path d="M14 32 L50 16 L36 50 L30 36 Z" fill={`url(#${gradId})`} opacity="0.92" />
      <g fill="var(--color-background)" stroke={`url(#${gradId})`} strokeWidth="2">
        <circle cx="14" cy="32" r="3.2" />
        <circle cx="50" cy="16" r="3.2" />
        <circle cx="36" cy="50" r="3.2" />
      </g>
    </svg>
  );
}

const site_name = "ApiTestPilot";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-7" />
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">
        ApiTest<span className="gradient-text">Pilot</span>
      </span>
    </span>
  );
}
