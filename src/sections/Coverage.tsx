import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const neighborhoods = [
  'Braeburn',
  'Meyerland',
  'Westbury',
  'Bellaire',
  'Sugar Land',
  'The Heights',
  'Midtown',
  'Montrose',
  'Rice Village',
  'West University',
  'Memorial',
  'Spring Branch',
];

export default function Coverage() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<(HTMLSpanElement | null)[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Map card animation
      gsap.fromTo(
        mapRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form card animation
      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Neighborhood pills animation
      pillsRef.current.forEach((pill, index) => {
        if (!pill) return;
        gsap.fromTo(
          pill,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pill,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.05,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Quote request submitted! We\'ll contact you within 24 hours.');
    setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      id="coverage"
      className="relative w-full bg-[#F6F7F9] py-20 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Headline */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <h2
            className="font-semibold text-[#0B0F17] leading-[1.0] tracking-[-0.02em] mb-6"
            style={{ fontSize: 'clamp(32px, 3.6vw, 56px)' }}
          >
            Serving Houston and surrounding areas.
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed">
            From downtown to the suburbs, we're never far away.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
          {/* Map Card */}
          <div
            ref={mapRef}
            className="bg-white rounded-[22px] overflow-hidden shadow-[0_18px_45px_rgba(11,15,23,0.08)]"
          >
            <div className="h-64 lg:h-80 bg-[#0B0F17] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d222060.09811809575!2d-95.538285!3d29.816882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX%2077074!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Service Area Map"
              />
            </div>
            <div className="p-6 lg:p-8">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-[#3F8CFF] mt-0.5" />
                <div>
                  <p className="text-[#0B0F17] font-medium">Hayden & Sons Plumbers</p>
                  <p className="text-[#6B7280] text-sm">7707 Bissonnet St #6700</p>
                  <p className="text-[#6B7280] text-sm">Houston, TX 77074</p>
                </div>
              </div>
              <a
                href="tel:+13462755328"
                className="inline-flex items-center gap-2 text-[#3F8CFF] text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>+1 346-275-5328</span>
              </a>
            </div>
          </div>

          {/* Form Card */}
          <div
            ref={formRef}
            className="bg-white rounded-[22px] p-6 lg:p-8 shadow-[0_18px_45px_rgba(11,15,23,0.08)]"
          >
            <h3 className="text-[#0B0F17] font-semibold text-xl mb-6">
              Request a Free Quote
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#0B0F17] text-sm">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="border-[#E5E7EB] focus:border-[#3F8CFF] focus:ring-[#3F8CFF]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#0B0F17] text-sm">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(713) 555-0142"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="border-[#E5E7EB] focus:border-[#3F8CFF] focus:ring-[#3F8CFF]/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#0B0F17] text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-[#E5E7EB] focus:border-[#3F8CFF] focus:ring-[#3F8CFF]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service" className="text-[#0B0F17] text-sm">Service Type</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                >
                  <SelectTrigger className="border-[#E5E7EB] focus:border-[#3F8CFF] focus:ring-[#3F8CFF]/20">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency Plumbing</SelectItem>
                    <SelectItem value="water-heater">Water Heater</SelectItem>
                    <SelectItem value="bathroom">Bathroom Plumbing</SelectItem>
                    <SelectItem value="drain">Drain Cleaning</SelectItem>
                    <SelectItem value="pipe">Pipe Work</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-[#0B0F17] text-sm">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your plumbing needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="border-[#E5E7EB] focus:border-[#3F8CFF] focus:ring-[#3F8CFF]/20 resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3F8CFF] hover:bg-[#2A7AEE] text-white font-medium py-3 rounded-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Request Appointment
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <a
                href="tel:+13462755328"
                className="inline-flex items-center gap-2 text-[#6B7280] text-sm hover:text-[#3F8CFF] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Prefer to call? +1 346-275-5328</span>
              </a>
            </div>
          </div>
        </div>

        {/* Neighborhoods */}
        <div className="mt-12 max-w-[1000px] mx-auto">
          <p className="text-center text-[#6B7280] text-sm mb-4">Neighborhoods we serve:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {neighborhoods.map((neighborhood, index) => (
              <span
                key={neighborhood}
                ref={(el) => { pillsRef.current[index] = el; }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-[#0B0F17] text-sm shadow-[0_4px_12px_rgba(11,15,23,0.06)]"
              >
                <Check className="w-3.5 h-3.5 text-[#3F8CFF]" />
                {neighborhood}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
