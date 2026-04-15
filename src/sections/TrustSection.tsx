import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TrustSectionProps {
  id: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  cardTitle: string;
  cardBody: string;
  cardIcon: 'shield' | 'clock' | 'user';
  bgImage: string;
  zIndex: number;
}

export default function TrustSection({
  id,
  headline,
  subheadline,
  ctaText,
  ctaHref,
  cardTitle,
  cardBody,
  cardIcon,
  bgImage,
  zIndex,
}: TrustSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        // ENTRANCE (0% - 30%)
        scrollTl.fromTo(
          headlineRef.current,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        scrollTl.fromTo(
          subheadlineRef.current,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        );

        scrollTl.fromTo(
          ctaRef.current,
          { x: '-30vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        );

        scrollTl.fromTo(
          cardRef.current,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        scrollTl.fromTo(
          bgRef.current,
          { scale: 1.08 },
          { scale: 1, ease: 'none' },
          0
        );

        // SETTLE (30% - 70%): Static - elements hold position

        // EXIT (70% - 100%)
        scrollTl.fromTo(
          headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          subheadlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-14vw', opacity: 0, ease: 'power2.in' },
          0.72
        );

        scrollTl.fromTo(
          ctaRef.current,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.74
        );

        scrollTl.fromTo(
          cardRef.current,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          microcopyRef.current,
          { y: 0, opacity: 1 },
          { y: 20, opacity: 0, ease: 'power2.in' },
          0.75
        );

        scrollTl.fromTo(
          bgRef.current,
          { scale: 1 },
          { scale: 1.06, ease: 'none' },
          0.7
        );
      });

      mm.add("(max-width: 1023px)", () => {
        // No pinning for mobile, just simple fade-in animations
        gsap.fromTo(
          [headlineRef.current, subheadlineRef.current, ctaRef.current, cardRef.current],
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  const IconComponent = cardIcon === 'shield' ? Shield : cardIcon === 'clock' ? Clock : Shield;

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex }}
    >
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0B0F17]/55" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-white font-semibold leading-[1.1] tracking-[-0.02em] max-w-full lg:max-w-[55vw] text-balance"
          style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}
        >
          {headline}
        </h2>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-6 text-white/70 text-base lg:text-xl max-w-full lg:max-w-[40vw] leading-relaxed"
        >
          {subheadline}
        </p>

        {/* Mobile Card (Simplified) */}
        <div className="lg:hidden mt-8 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#3F8CFF]/20 flex items-center justify-center">
              <IconComponent className="w-4 h-4 text-[#3F8CFF]" />
            </div>
            <h3 className="text-white font-semibold text-base">{cardTitle}</h3>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">{cardBody}</p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-8">
          <a
            href={ctaHref}
            className="group inline-flex items-center gap-3 w-full sm:w-auto justify-center px-6 py-4 bg-[#3F8CFF] text-white font-semibold rounded-xl hover:bg-[#2A7AEE] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#3F8CFF]/20"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Desktop Card */}
      <div
        ref={cardRef}
        className="hidden lg:block absolute right-[6vw] top-[22vh] w-[26vw] min-w-[280px] glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-[#3F8CFF]/20 flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-[#3F8CFF]" />
          </div>
          <h3 className="text-white font-semibold text-lg">{cardTitle}</h3>
        </div>
        <p className="text-white/70 text-sm leading-relaxed">{cardBody}</p>
      </div>

      {/* Bottom Microcopy */}
      <div
        ref={microcopyRef}
        className="absolute left-6 lg:left-[7vw] bottom-[5vh] lg:bottom-[7vh] text-white/50 text-[10px] lg:text-sm"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>Licensed & insured</span>
          <span className="hidden sm:inline w-1 h-1 bg-white/30 rounded-full" />
          <span>Transparent estimates</span>
          <span className="hidden sm:inline w-1 h-1 bg-white/30 rounded-full" />
          <span>Workmanship guarantee</span>
        </div>
      </div>
    </section>
  );
}
