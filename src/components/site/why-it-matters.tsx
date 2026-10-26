import { Reveal } from "./reveal";

const statements = [
  {
    headline: "Catch breakage before your users do.",
    support:
      "Every flow runs on every change, so regressions surface in your pipeline instead of in production.",
  },
  {
    headline: "Stop writing the same tests by hand.",
    support:
      "Point a new spec version at the platform and the suite regenerates in minutes — you review it, not type it.",
  },
  {
    headline: "Know your API the way people actually use it.",
    support:
      "Tests follow real journeys end to end, so what's verified matches how the product behaves.",
  },
] as const;

export function WhyItMatters() {
  return (
    <section aria-label="Why it matters" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="space-y-14">
          {statements.map((statement, index) => (
            <Reveal key={statement.headline} delay={0.05 * index}>
              <blockquote className="border-l-2 border-primary/50 pl-6 sm:pl-8">
                <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {statement.headline}
                </p>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {statement.support}
                </p>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
