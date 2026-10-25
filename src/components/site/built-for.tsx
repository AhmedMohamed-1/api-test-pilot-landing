const stack = ["OpenAPI 3", "REST", "JSON", ".NET", "Node.js", "Java", "Python", "Go"] as const;

export function BuiltFor() {
  return (
    <section aria-label="Built for REST APIs" className="border-y border-border bg-card/30 py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-3 px-4 sm:px-6">
        <span className="mr-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Built for REST APIs
        </span>
        {stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
