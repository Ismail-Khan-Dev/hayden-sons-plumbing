import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Search, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Book online or call',
    description: 'Pick a time that works. We offer same-day and next-day slots with flexible scheduling options.',
    icon: Calendar,
    image: '/images/process_booking.jpg',
  },
  {
    number: '02',
    title: 'Get a clear diagnosis',
    description: 'We explain the issue, show you options, and agree on a price before any work begins.',
    icon: Search,
    image: '/images/process_diagnosis.jpg',
  },
  {
    number: '03',
    title: 'We fix it and clean up',
    description: 'Work is completed with a warranty walkthrough and tidy finish—your home stays clean.',
    icon: Sparkles,
    image: '/images/process_cleanup.jpg',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Steps animation
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        );

        // Image parallax
        const img = step.querySelector('.step-image');
        if (img) {
          gsap.fromTo(
            img,
            { y: -12 },
            {
              y: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: step,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#F6F7F9] py-20 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Headline */}
        <div ref={headlineRef} className="text-center max-w-[600px] mx-auto mb-16">
          <h2
            className="font-semibold text-[#0B0F17] leading-[1.0] tracking-[-0.02em] mb-6"
            style={{ fontSize: 'clamp(32px, 3.6vw, 56px)' }}
          >
            Book a plumber in minutes.
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed">
            Simple, transparent, and stress-free from start to finish.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-[1000px] mx-auto space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[index] = el; }}
              className="bg-white rounded-[22px] overflow-hidden shadow-[0_18px_45px_rgba(11,15,23,0.08)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-5xl font-bold text-[#3F8CFF]/20">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#3F8CFF]/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-[#3F8CFF]" />
                    </div>
                  </div>
                  <h3 className="text-[#0B0F17] font-semibold text-2xl mb-4">
                    {step.title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="relative h-64 lg:h-auto overflow-hidden order-1 lg:order-2">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="step-image absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#3F8CFF] text-white font-medium rounded-xl hover:bg-[#2A7AEE] transition-all duration-300 hover:scale-105"
          >
            <span>Check Availability</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
