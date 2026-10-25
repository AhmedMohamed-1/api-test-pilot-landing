import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist, waitlistSchema, type WaitlistInput } from "@/lib/waitlist";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type WaitlistFormProps = {
  className?: string;
  /** Button width style; forms sit in different layouts. */
  compact?: boolean;
};

export function WaitlistForm({ className, compact = false }: WaitlistFormProps) {
  const [succeeded, setSucceeded] = useState(false);
  const reduce = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "", companyWebsite: "" },
  });

  const onSubmit = async (values: WaitlistInput) => {
    // Honeypot filled: pretend success, do nothing.
    if (values.companyWebsite) {
      setSucceeded(true);
      return;
    }
    try {
      await joinWaitlist(values.email);
      setSucceeded(true);
    } catch (error) {
      setError("email", {
        message: error instanceof Error ? error.message : "Something went wrong. Try again.",
      });
    }
  };

  if (succeeded) {
    return (
      <motion.div
        role="status"
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "glass flex items-center gap-3 rounded-xl px-5 py-4",
          className,
        )}
      >
        <CheckCircle2 className="size-5 shrink-0 text-success" />
        <div>
          <p className="font-display text-sm font-semibold text-foreground">You're on the list.</p>
          <p className="text-sm text-muted-foreground">We'll be in touch.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("w-full", className)}
      aria-label="Join the waitlist"
    >
      <div className={cn("flex gap-2", compact ? "flex-col" : "flex-col sm:flex-row")}>
        <div className="relative flex-1">
          <label htmlFor={register("email").name} className="sr-only">
            Email address
          </label>
          <Input
            {...register("email")}
            id={register("email").name}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.dev"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "waitlist-email-error" : undefined}
            className="h-12 rounded-xl border-input bg-background/60 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-ring"
          />
        </div>

        {/* Honeypot: visually hidden and ignored by keyboards. */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Company website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("companyWebsite")}
            />
          </label>
        </div>

        <Magnetic className={compact ? "w-full" : "sm:w-auto"}>
          <Button
            type="submit"
            variant="hero"
            size="lg"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl px-6 text-base sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Joining…
              </>
            ) : (
              <>
                <Send />
                Join the waitlist
              </>
            )}
          </Button>
        </Magnetic>
      </div>

      {errors.email ? (
        <p id="waitlist-email-error" role="alert" className="mt-2 text-sm text-destructive">
          {errors.email.message}
        </p>
      ) : (
        <p className="mt-2.5 text-sm text-muted-foreground">
          No spam. Early access invites go out in waves.
        </p>
      )}
    </form>
  );
}
