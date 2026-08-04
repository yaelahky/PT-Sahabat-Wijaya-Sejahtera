"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { SiteConfig } from "@/content/site-content";

export function FaqList({ items }: { items: SiteConfig["faqs"] }) {
  return (
    <Accordion type="single" collapsible className="w-full" aria-label="Pertanyaan umum tentang produk dan layanan">
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`faq-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
