import { site } from "@/config/site";
import { Reveal } from "./reveal";
import { WaitlistForm } from "./waitlist-form";

export function FinalCta() {
  return (
    <section id="waitlist-cta" className="relative overflow-hidden py-20 sm:py-28">
      {/* Animated gradient glow behind the card */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[22rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px]" />
        <div className="absolute left-[30%] top-[55%] h-[16rem] w-[16rem] rounded-full bg-primary-glow/15 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          {/* Animated gradient border */}
          <div className="rounded-3xl bg-[linear-gradient(110deg,var(--color-primary),var(--color-primary-glow),var(--color-primary))] animate-gradient-pan p-[1.5px]">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-card/90 px-6 py-12 text-center backdrop-blur-xl sm:px-14 sm:py-16">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                Ready for <span className="gradient-text">takeoff?</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join the waitlist and be first to fly.
              </p>
              <div className="mx-auto mt-8 max-w-md">
                <WaitlistForm compact />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                {site.name} · {site.domain} · Early access
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
