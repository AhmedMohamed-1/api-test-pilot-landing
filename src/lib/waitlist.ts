import { z } from "zod";

/**
 * Single source of truth for waitlist validation and submission.
 * The submission is currently simulated — swap the body of
 * joinWaitlist for a real endpoint when the backend lands.
 */

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.");

export const waitlistSchema = z.object({
  email: emailSchema,
  // Honeypot: invisible to humans, filled by bots.
  companyWebsite: z.string().max(0).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export async function joinWaitlist(email: string): Promise<{ ok: true; email: string }> {
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
  }
  // Simulated network round-trip until a backend is connected.
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true, email: parsed.data };
}
