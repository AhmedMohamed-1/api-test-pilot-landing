import { describe, expect, it } from "vitest";
import { emailSchema, joinWaitlist, waitlistSchema } from "./waitlist";

describe("waitlist email validation", () => {
  it("accepts a valid email", () => {
    const parsed = emailSchema.safeParse("  dev@example.com  ");
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data).toBe("dev@example.com");
  });

  it("rejects a missing email with a clear message", () => {
    const parsed = emailSchema.safeParse("");
    expect(parsed.success).toBe(false);
    if (!parsed.success) expect(parsed.error.issues[0].message).toBe("Email is required.");
  });

  it("rejects an invalid email with a clear message", () => {
    const parsed = emailSchema.safeParse("not-an-email");
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues[0].message).toBe("Enter a valid email address.");
    }
  });
});

describe("waitlist form schema", () => {
  it("passes when the honeypot is empty", () => {
    const parsed = waitlistSchema.safeParse({ email: "dev@example.com", companyWebsite: "" });
    expect(parsed.success).toBe(true);
  });

  it("fails when the honeypot is filled", () => {
    const parsed = waitlistSchema.safeParse({
      email: "bot@example.com",
      companyWebsite: "http://spam.example",
    });
    expect(parsed.success).toBe(false);
  });
});

describe("joinWaitlist", () => {
  it("resolves ok for a valid email", async () => {
    await expect(joinWaitlist("dev@example.com")).resolves.toMatchObject({
      ok: true,
      email: "dev@example.com",
    });
  });

  it("throws for an invalid email", async () => {
    await expect(joinWaitlist("nope")).rejects.toThrow("Enter a valid email address.");
  });
});
