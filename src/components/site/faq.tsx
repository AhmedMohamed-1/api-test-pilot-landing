import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./reveal";

const faqs = [
  {
    question: "What is ApiTestPilot?",
    answer:
      "A platform that turns your OpenAPI spec into complete, ordered user-flow tests, runs them, and shows clear results.",
  },
  {
    question: "Which specifications are supported?",
    answer: "OpenAPI today. More formats are planned.",
  },
  {
    question: "Where do the tests run?",
    answer: "Against the environments you configure, such as Dev or Staging.",
  },
  {
    question: "Are my secrets safe?",
    answer:
      "Secret variables are stored encrypted and masked in results, so tokens never show up in plain text.",
  },
  {
    question: "Do I need to write tests myself?",
    answer: "No. The AI designs them, and you can review and edit every case.",
  },
  {
    question: "How much will it cost?",
    answer:
      "We're in early access and pricing hasn't been announced. Waitlist members hear first.",
  },
] as const;

export function Faq() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Questions, answered.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Accordion
            type="single"
            collapsible
            className="glass rounded-2xl px-6 [&>div]:border-border/70"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="border-border/70">
                <AccordionTrigger className="py-5 font-display text-base font-semibold text-foreground hover:no-underline hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
