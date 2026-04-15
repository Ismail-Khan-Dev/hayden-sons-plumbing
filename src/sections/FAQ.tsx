import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Do you offer same-day service?',
    answer: 'Yes! We understand that plumbing issues can\'t wait. We offer same-day and next-day appointments for most services. For emergencies, our team is available 24/7 to respond quickly to urgent situations like burst pipes or severe leaks.',
  },
  {
    question: 'How do I know the price before work starts?',
    answer: 'Transparency is core to our service. After diagnosing the issue, we provide a detailed written estimate that explains exactly what needs to be done and how much it will cost. We never start work without your approval, and there are no hidden fees or surprise charges.',
  },
  {
    question: 'Are your plumbers licensed and insured?',
    answer: 'Absolutely. All our technicians are fully licensed, bonded, and insured. They undergo thorough background checks and regular training to stay current with the latest plumbing techniques and safety standards. You can trust that your home is in good hands.',
  },
  {
    question: 'What if something goes wrong after the repair?',
    answer: 'We stand behind our work with a comprehensive workmanship guarantee. If any issue arises related to our repair within the warranty period, we\'ll return and fix it at no additional cost. Your satisfaction and peace of mind are our top priorities.',
  },
  {
    question: 'Do you service commercial properties?',
    answer: 'Yes, we provide full commercial plumbing services for offices, retail spaces, restaurants, and multi-unit properties. We understand the unique needs of commercial clients and work efficiently to minimize disruption to your business operations.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We proudly serve Houston and surrounding areas including The Heights, Midtown, Montrose, Rice Village, West University, Bellaire, Memorial, Spring Branch, Braeburn, Meyerland, Westbury, and Sugar Land. If you\'re unsure if we cover your area, just give us a call!',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Accordion animation
      gsap.fromTo(
        accordionRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F6F7F9] py-20 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Headline */}
        <div ref={headlineRef} className="text-center max-w-[500px] mx-auto mb-12">
          <h2
            className="font-semibold text-[#0B0F17] leading-[1.0] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(32px, 3.6vw, 56px)' }}
          >
            Questions? Answers.
          </h2>
        </div>

        {/* Accordion */}
        <div ref={accordionRef} className="max-w-[860px] mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-[16px] px-6 shadow-[0_8px_24px_rgba(11,15,23,0.06)] border-none overflow-hidden"
              >
                <AccordionTrigger className="text-left text-[#0B0F17] font-medium py-5 hover:no-underline hover:text-[#3F8CFF] transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#6B7280] leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
