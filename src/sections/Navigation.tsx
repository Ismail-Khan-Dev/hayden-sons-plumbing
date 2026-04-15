import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Coverage', href: '#coverage' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0F17]/95 backdrop-blur-md shadow-lg border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex flex-col group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
            >
              <span className="font-mono text-[10px] lg:text-xs tracking-[0.2em] text-white/90 uppercase font-bold">
                Hayden & Sons
              </span>
              <span className="font-mono text-[8px] tracking-[0.1em] text-[#3F8CFF] uppercase font-medium -mt-0.5">
                Plumbing Legacy
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3F8CFF] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+13462755328"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#3F8CFF] text-white text-sm font-semibold rounded-xl hover:bg-[#2A7AEE] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#3F8CFF]/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0B0F17]/98 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="flex flex-col items-center justify-center flex-grow gap-8 px-6">
          <div className="mb-8 text-center">
            <span className="font-mono text-xs tracking-[0.2em] text-white/90 uppercase font-bold block">
              Hayden & Sons
            </span>
            <div className="h-px w-12 bg-[#3F8CFF] mx-auto mt-2" />
          </div>

          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-semibold text-white/80 hover:text-[#3F8CFF] transition-all duration-300 active:scale-95"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {link.label}
            </button>
          ))}
          
          <a
            href="tel:+13462755328"
            className="mt-12 flex items-center justify-center gap-3 w-full max-w-xs px-8 py-5 bg-[#3F8CFF] text-white text-lg font-bold rounded-2xl shadow-xl shadow-[#3F8CFF]/20 active:scale-95 transition-transform"
          >
            <Phone className="w-6 h-6" />
            <span>Call +1 346-275-5328</span>
          </a>
        </div>
        
        {/* Mobile footer info */}
        <div className="p-10 text-center border-t border-white/5">
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase">
            Houston, TX • Open 24/7
          </p>
        </div>
      </div>
    </>
  );
}
