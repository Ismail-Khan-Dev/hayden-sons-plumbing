import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail, Clock, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

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

      // Card animation
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Footer animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
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
      id="contact"
      className="relative w-full bg-[#0B0F17] pt-20 lg:pt-32 pb-8"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-[1200px] mx-auto mb-20">
          {/* Left - Headline */}
          <div ref={headlineRef} className="flex flex-col justify-center">
            <h2
              className="font-semibold text-white leading-[1.0] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(36px, 4.5vw, 72px)' }}
            >
              Ready when you are.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-[400px]">
              Book online in under a minute, or call us for urgent help. 
              Our team is standing by 24/7.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#coverage"
                className="group inline-flex items-center gap-3 px-6 py-4 bg-[#3F8CFF] text-white font-medium rounded-xl hover:bg-[#2A7AEE] transition-all duration-300 hover:scale-105"
              >
                <span>Book a Visit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+13462755328"
                className="inline-flex items-center gap-3 px-6 py-4 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>Call +1 346-275-5328</span>
              </a>
            </div>
          </div>

          {/* Right - Contact Card */}
          <div ref={cardRef} className="glass-card-dark p-8">
            <h3 className="text-white font-semibold text-xl mb-6">Contact Us</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#3F8CFF]/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#3F8CFF]" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Phone</p>
                  <a
                    href="tel:+13462755328"
                    className="text-white font-medium hover:text-[#3F8CFF] transition-colors"
                  >
                    +1 346-275-5328
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#3F8CFF]/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#3F8CFF]" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Email</p>
                  <a
                    href="mailto:hello@haydenandsons.com"
                    className="text-white font-medium hover:text-[#3F8CFF] transition-colors"
                  >
                    hello@haydenandsons.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#3F8CFF]/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#3F8CFF]" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Hours</p>
                  <p className="text-white font-medium">Open 24/7</p>
                  <p className="text-white/50 text-sm">Emergency line always available</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#3F8CFF]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#3F8CFF]" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Address</p>
                  <p className="text-white font-medium">7707 Bissonnet St #6700</p>
                  <p className="text-white/50 text-sm">Houston, TX 77074</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Footer */}
        <div ref={footerRef} className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-1">
              <span className="font-mono text-xs tracking-[0.14em] text-white/70 uppercase">
                Hayden & Sons
              </span>
              <p className="text-white/40 text-sm mt-3 leading-relaxed">
                Houston's most trusted plumbing legacy. Fast fixes, fair pricing, no surprises.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-medium text-sm mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="text-white/50 text-sm hover:text-white transition-colors">
                    Emergency Plumbing
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-white/50 text-sm hover:text-white transition-colors">
                    Water Heaters
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-white/50 text-sm hover:text-white transition-colors">
                    Drain Cleaning
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-white/50 text-sm hover:text-white transition-colors">
                    Commercial
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-medium text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-white/50 text-sm hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="text-white/50 text-sm hover:text-white transition-colors">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#coverage" className="text-white/50 text-sm hover:text-white transition-colors">
                    Coverage Area
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/50 text-sm hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-medium text-sm mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm">
              © 2025 Hayden & Sons Plumbers. Houston, TX. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white/40 text-sm">Open 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
