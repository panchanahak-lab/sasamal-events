import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';
import { getWhatsAppUrl } from '@/utils/format';
import { generateSimpleWhatsAppMessage } from '@/utils/whatsapp';

function LotusNavbarIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21c-2-3-4-7-4-11a4 4 0 0 1 8 0c0 4-2 8-4 11z" />
      <path d="M12 21c-3-2-8-4-8-9a5 5 0 0 1 7-4" />
      <path d="M12 21c3-2 8-4 8-9a5 5 0 0 0-7-4" />
      <path d="M12 17a3 3 0 0 0 0-6 3 3 0 0 0 0 6z" />
    </svg>
  );
}

const serviceDropdownItems = [
  { name: 'Ring Ceremony', path: '/services#engagement-ring-ceremony', desc: 'Bespoke floral arches & couple seating' },
  { name: 'Haldi Ceremony', path: '/services#haldi-mehendi-decorations', desc: 'Bright marigold, drapes & traditional urlis' },
  { name: 'Mandap Decoration', path: '/services#wedding-mandap-decorations', desc: 'Sacred square & dome floral mandaps' },
  { name: 'Birthday Celebration', path: '/services#birthday-celebrations', desc: 'Balloon arches & customized backdrops' },
  { name: 'Family Functions', path: '/services#family-functions', desc: 'Baby showers, anniversaries & naming ceremonies' },
  { name: 'Private Functions', path: '/services#special-events', desc: 'Romantic proposals & intimate celebrations' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const { isMobileMenuOpen, setMobileMenuOpen, setQuoteModalOpen, settings } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname, location.hash, setMobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(settings.whatsapp, generateSimpleWhatsAppMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#C5A46D]/20 py-2.5'
          : 'bg-[#FAF7F2]/90 backdrop-blur-sm border-b border-black/5 py-3.5'
      }`}
    >
      <Container className="w-full">
        <nav className="flex items-center justify-between w-full">
          {/* Brand Logo & Tagline with Lotus Emblem */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="text-[#6B1D2F] group-hover:scale-105 transition-transform">
              <LotusNavbarIcon className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-2xl font-bold text-[#6B1D2F] tracking-tight leading-none">
                Sasamal Events
              </span>
              <span className="text-[7.5px] sm:text-[9.5px] font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#6B1D2F]/80 mt-0.5">
                EVENTS • DECOR • CELEBRATIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 sm:gap-2">
            {/* Home with active underline */}
            <Link
              to="/"
              className={`px-3 py-1.5 text-sm font-medium transition-colors relative ${
                location.pathname === '/'
                  ? 'text-[#6B1D2F] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#6B1D2F]'
                  : 'text-[#292725]/85 hover:text-[#6B1D2F]'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              ref={servicesDropdownRef}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/services')
                    ? 'text-[#6B1D2F] font-bold'
                    : 'text-[#292725]/85 hover:text-[#6B1D2F]'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isServicesOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-[#C5A46D]/20 p-2.5 mt-1 animate-fade-in z-50">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A46D]">
                      Celebrations We Create
                    </span>
                  </div>
                  {serviceDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F3] transition-colors group"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <div className="text-sm font-semibold text-[#292725] group-hover:text-[#6B1D2F] transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#77716B] line-clamp-1">{item.desc}</div>
                    </Link>
                  ))}
                  <div className="mt-1 pt-1.5 border-t border-gray-100 text-center">
                    <Link
                      to="/services"
                      className="inline-block py-1 text-xs font-semibold text-[#6B1D2F] hover:text-[#C5A46D] transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      View All Services &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/gallery"
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                location.pathname === '/gallery' ? 'text-[#6B1D2F] font-bold' : 'text-[#292725]/85 hover:text-[#6B1D2F]'
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/about"
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                location.pathname === '/about' ? 'text-[#6B1D2F] font-bold' : 'text-[#292725]/85 hover:text-[#6B1D2F]'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                location.pathname === '/contact' ? 'text-[#6B1D2F] font-bold' : 'text-[#292725]/85 hover:text-[#6B1D2F]'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Header Action Items (Circular WhatsApp Button + Solid Maroon "Enquire Now" Pill) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-9 h-9 rounded-full border border-[#6B1D2F] text-[#6B1D2F] hover:bg-[#6B1D2F] hover:text-white flex items-center justify-center transition-all"
              aria-label="WhatsApp Enquiry"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="bg-[#6B1D2F] hover:bg-[#521321] text-white rounded-full px-5 py-2 text-sm font-semibold transition-all shadow-sm hover:shadow"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Menu & WhatsApp Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-9 h-9 rounded-full border border-[#6B1D2F] text-[#6B1D2F] flex items-center justify-center"
              aria-label="WhatsApp Enquiry"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#292725] hover:text-[#6B1D2F] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#C5A46D]/20 px-6 py-6 space-y-4 animate-fade-in shadow-lg">
          <Link
            to="/"
            className="block text-base font-semibold text-[#6B1D2F]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <div className="space-y-2 pl-2 border-l-2 border-[#C5A46D]/30">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block">
              Our Services
            </span>
            {serviceDropdownItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block text-sm text-[#292725] hover:text-[#6B1D2F]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Link
            to="/gallery"
            className="block text-base font-medium text-[#292725] hover:text-[#6B1D2F]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link
            to="/about"
            className="block text-base font-medium text-[#292725] hover:text-[#6B1D2F]"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block text-base font-medium text-[#292725] hover:text-[#6B1D2F]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setQuoteModalOpen(true);
              }}
              className="w-full bg-[#6B1D2F] text-white py-2.5 rounded-full font-semibold text-center text-sm shadow"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
