import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Droplets, 
  Flame, 
  ShowerHead, 
  Home, 
  Building2, 
  Camera,
  ArrowRight,
  Star
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Droplets,
    title: '24/7 Emergency Plumbing',
    description: 'Burst pipes, severe leaks, and urgent repairs—our emergency team responds fast, any time of day or night.',
  },
  {
    icon: Flame,
    title: 'Water Heater Install & Repair',
    description: 'From traditional tanks to energy-efficient tankless systems—expert installation and reliable repairs.',
  },
  {
    icon: ShowerHead,
    title: 'Shower & Bathroom Plumbing',
    description: 'Fixture upgrades, leak repairs, drain cleaning, and complete bathroom plumbing solutions.',
  },
  {
    icon: Home,
    title: 'Residential Pipe Work',
    description: 'Repiping, pipe repairs, and preventive maintenance to keep your home\'s plumbing flowing smoothly.',
  },
  {
    icon: Building2,
    title: 'Commercial Plumbing',
    description: 'Full-service commercial plumbing for offices, retail, and multi-unit properties with minimal disruption.',
  },
  {
    icon: Camera,
    title: 'Remote Photo Estimating',
    description: 'Send us photos of your issue for a quick, accurate estimate—no need to wait for an in-person visit.',
  },
];

const testimonials = [
  {
    quote: "They arrived early, explained everything, and left the bathroom cleaner than they found it. Truly professional service.",
    author: "A. R.",
    location: "Midtown, Houston",
    rating: 5,
  },
  {
    quote: "Fair quote, no upsell, and Colin was genuinely helpful. Our water heater has been perfect since the install.",
    author: "L. M.",
    location: "The Heights",
    rating: 5,
  },
  {
    quote: "Scheduled next-day and Keith finished in under two hours. The photo estimate feature saved us so much time.",
    author: "D. S.",
    location: "Montrose",
    rating: 5,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialsRef = useRef<(HTMLDivElement | null)[]>([]);

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
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Service cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.08,
          }
        );
      });

      // Testimonials animation
      testimonialsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.12,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-[#F6F7F9] py-20 lg:py-32 z-50"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Headline */}
        <div ref={headlineRef} className="text-center max-w-[780px] mx-auto mb-16">
          <h2
            className="font-semibold text-[#0B0F17] leading-[1.0] tracking-[-0.02em] mb-6"
            style={{ fontSize: 'clamp(32px, 3.6vw, 56px)' }}
          >
            Full-service plumbing for homes and businesses.
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed">
            From quick repairs to full installations, we bring the right tools, 
            the right parts, and clear communication.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group bg-white rounded-[22px] p-8 shadow-[0_18px_45px_rgba(11,15,23,0.08)] hover:shadow-[0_24px_60px_rgba(11,15,23,0.12)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-xl bg-[#3F8CFF]/10 flex items-center justify-center mb-6 group-hover:bg-[#3F8CFF]/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-[#3F8CFF]" />
              </div>
              <h3 className="text-[#0B0F17] font-semibold text-xl mb-3">
                {service.title}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[#3F8CFF] text-sm font-medium group/link"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-8">
          <h3 className="text-center text-[#0B0F17] font-semibold text-2xl mb-12">
            What Houston Homeowners Are Saying
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                ref={(el) => { testimonialsRef.current[index] = el; }}
                className="bg-white rounded-[22px] p-8 shadow-[0_18px_45px_rgba(11,15,23,0.08)]"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[#0B0F17] text-sm leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3F8CFF]/10 flex items-center justify-center">
                    <span className="text-[#3F8CFF] font-semibold text-sm">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#0B0F17] font-medium text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-[#6B7280] text-xs">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Reviews Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-[0_8px_24px_rgba(11,15,23,0.08)]">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-[#0B0F17] font-semibold">4.7</span>
            </div>
            <span className="text-[#6B7280] text-sm">77 Google Reviews</span>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#3F8CFF] text-sm font-medium hover:underline"
          >
            <span>Read All Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
