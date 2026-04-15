import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Star, Clock, MapPin, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background scale
      tl.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 1.1 }
      );

      // Micro label
      tl.fromTo(
        labelRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.7'
      );

      // Headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
          '-=0.3'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Right card
      tl.fromTo(
        cardRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        '-=0.7'
      );

      // Microcopy
      tl.fromTo(
        microcopyRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, cardRef.current, microcopyRef.current, labelRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set(bgRef.current, { scale: 1 });
          },
        },
      });

      // ENTRANCE (0% - 30%): Hold - no changes (entrance handled by load animation)
      // SETTLE (30% - 70%): Static

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
        labelRef.current,
        { y: 0, opacity: 1 },
        { y: -10, opacity: 0, ease: 'power2.in' },
        0.68
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1 },
        { scale: 1.06, ease: 'none' },
        0.7
      );
    });

    // Mobile-specific entrance tweaks (already covered by load animation but we ensures it's clean)
    mm.add("(max-width: 1023px)", () => {
      // No pinning on mobile
    });

    return () => mm.revert();
  }, []);

  const headlineWords = "Fast fixes. Fair pricing. No surprises.".split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen lg:h-screen min-h-[600px] overflow-hidden z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'scale(1.08)' }}
      >
        <img
          src="/images/hero_plumber_sink.jpg"
          alt="Professional plumber at work"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0B0F17]/65" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        {/* Micro Label */}
        <span
          ref={labelRef}
          className="font-mono text-[10px] lg:text-xs tracking-[0.14em] text-white/60 uppercase mb-6"
          style={{ marginTop: '-4vh' }}
        >
          Houston Plumbing
        </span>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-white font-semibold leading-[0.95] lg:leading-[0.95] tracking-[-0.02em] max-w-full lg:max-w-[52vw] text-balance"
          style={{ fontSize: 'clamp(42px, 7vw, 84px)' }}
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-8 text-white/70 text-base lg:text-xl max-w-full lg:max-w-[42vw] leading-relaxed"
        >
          From dripping faucets to full repipes—our team arrives prepared, works clean, 
          and explains every step.
        </p>

        {/* CTA Row */}
        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a
            href="#contact"
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-[#3F8CFF] text-white font-medium rounded-xl hover:bg-[#2A7AEE] transition-all duration-300 hover:scale-105"
          >
            <span>Get a Free Estimate</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="tel:+13462755328"
            className="flex items-center justify-center gap-2 px-6 py-4 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            <span>Call +1 346-275-5328</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/60 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>4.7 Stars on Google</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#3F8CFF]" />
            <span>77 Verified Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#3F8CFF]" />
            <span>Open 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#3F8CFF]" />
            <span>Houston, TX</span>
          </div>
        </div>
      </div>

      {/* Right Card */}
      <div
        ref={cardRef}
        className="hidden lg:block absolute right-[6vw] top-[22vh] w-[26vw] min-w-[280px] glass-card p-6"
      >
        <h3 className="text-white font-semibold text-lg mb-3">Same-day availability</h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Most repairs scheduled within 24 hours. Emergency line open 24/7 for 
          urgent plumbing needs.
        </p>
        <div className="mt-4 flex items-center gap-2 text-[#3F8CFF] text-sm">
          <Clock className="w-4 h-4" />
          <span>Open 24 Hours / 7 Days</span>
        </div>
      </div>

      {/* Bottom Microcopy */}
      <div
        ref={microcopyRef}
        className="absolute left-6 lg:left-[7vw] bottom-[7vh] text-white/50 text-sm"
      >
        <div className="flex flex-wrap items-center gap-4">
          <span>Licensed & insured</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span>Transparent estimates</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span>Workmanship guarantee</span>
        </div>
      </div>
    </section>
  );
}
