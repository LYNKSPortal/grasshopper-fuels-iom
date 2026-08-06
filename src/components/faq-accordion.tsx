import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({
  items,
  idPrefix = "faq",
}: {
  items: FaqItem[];
  idPrefix?: string;
}) {
  return (
    <Accordion multiple className="w-full">
      {items.map((item, idx) => (
        <AccordionItem
          key={`${idPrefix}-${idx}`}
          value={`${idPrefix}-${idx}`}
          className="rounded-2xl border border-black/5 bg-white px-6 not-last:mb-3 not-last:border-b-0"
        >
          <AccordionTrigger className="py-5 text-base font-bold text-[#202e25] hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-[#202e25]/65">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
