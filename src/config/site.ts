export const site = {
  name: "ApiTestPilot",
  domain: "ApiAutomation.io",
  tagline: "Autopilot for your API tests.",
  description:
    "Upload your OpenAPI spec. ApiTestPilot designs complete user-flow tests, runs them, and shows you exactly what broke. Early access — join the waitlist.",
  url: "https://apiautomation.io",
} as const;

export type SiteConfig = typeof site;
