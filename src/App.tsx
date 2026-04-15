import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from '@/components/ui/sonner';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import TrustSection from './sections/TrustSection';
import Services from './sections/Services';
import Process from './sections/Process';
import Coverage from './sections/Coverage';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Global snap configuration for pinned sections
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Only enable snapping and pinning logic on desktop (lg and up)
    mm.add("(min-width: 1024px)", () => {
      // Wait for all ScrollTriggers to be created
      const timer = setTimeout(() => {
        const pinned = ScrollTrigger.getAll()
          .filter((st) => st.vars.pin)
          .sort((a, b) => a.start - b.start);
        
        const maxScroll = ScrollTrigger.maxScroll(window);
        
        if (!maxScroll || pinned.length === 0) return;

        // Build ranges and snap targets from pinned sections
        const pinnedRanges = pinned.map((st) => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));

        // Create global snap
        ScrollTrigger.create({
          snap: {
            snapTo: (value: number) => {
              // Check if within any pinned range (with buffer)
              const inPinned = pinnedRanges.some(
                (r) => value >= r.start - 0.02 && value <= r.end + 0.02
              );
              
              // If not in a pinned section, allow free scroll
              if (!inPinned) return value;

              // Find nearest pinned center
              const target = pinnedRanges.reduce(
                (closest, r) =>
                  Math.abs(r.center - value) < Math.abs(closest - value)
                    ? r.center
                    : closest,
                pinnedRanges[0]?.center ?? 0
              );

              return target;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: 'power2.out',
          },
        });
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    });

    return () => mm.revert();
  }, []);

  // Refresh ScrollTrigger on resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - pin: true, z: 10 */}
        <div className="relative z-10">
          <Hero />
        </div>

        {/* Section 2: On Time - pin: true, z: 20 */}
        <div className="relative z-20">
          <TrustSection
            id="ontime"
            headline="We show up on time—every time."
            subheadline="Real-time updates, a 30-minute arrival window, and respectful, tidy service."
            ctaText="See how we work"
            ctaHref="#about"
            cardTitle="Respect for your home"
            cardBody="Shoe covers, drop cloths, and a post-job walkthrough—so you're never left guessing."
            cardIcon="shield"
            bgImage="/images/plumber_van_street.jpg"
            zIndex={20}
          />
        </div>

        {/* Section 3: Pricing - pin: true, z: 30 */}
        <div className="relative z-30">
          <TrustSection
            id="pricing"
            headline="Upfront pricing. No hidden fees."
            subheadline="We diagnose, explain your options, and agree on a price before any work begins."
            ctaText="Request an estimate"
            ctaHref="#coverage"
            cardTitle="Flexible payment"
            cardBody="Cards, digital invoices, and clear terms—no pressure, no surprises."
            cardIcon="clock"
            bgImage="/images/plumber_tablet_quote.jpg"
            zIndex={30}
          />
        </div>

        {/* Section 4: Know Who's Coming - pin: true, z: 40 */}
        <div className="relative z-40">
          <TrustSection
            id="team"
            headline="You'll know who's coming."
            subheadline="Name, photo, and ETA sent before arrival. Background-checked, trained, and uniformed technicians."
            ctaText="Meet the team"
            ctaHref="#about"
            cardTitle="Safety first"
            cardBody="ID verification on arrival, clean driving records, and respectful communication—every visit."
            cardIcon="shield"
            bgImage="/images/plumber_team_uniforms.jpg"
            zIndex={40}
          />
        </div>

        {/* Section 5: Services - pin: false, z: 50 */}
        <div className="relative z-50">
          <Services />
        </div>

        {/* Section 6: Process - pin: false */}
        <Process />

        {/* Section 7: Coverage - pin: false */}
        <Coverage />

        {/* Section 8: FAQ - pin: false */}
        <FAQ />

        {/* Section 9: Contact - pin: false */}
        <Contact />
      </main>

      {/* Toast notifications */}
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
