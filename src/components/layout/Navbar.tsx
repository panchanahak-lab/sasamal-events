import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/useStore';
import { getWhatsAppUrl } from '@/utils/format';
import { generateSimpleWhatsAppMessage } from '@/utils/whatsapp';

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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
          ? 'bg-[#FAF8F3]/95 backdrop-blur-md shadow-sm border-b border-[#C5A46D]/20 py-2.5'
          : 'bg-[#FAF8F3]/80 backdrop-blur-sm border-b border-black/5 py-3.5'
      }`}
    >
      <Container className="w-full">
        <nav className="flex items-center justify-between w-full">
          {/* Brand Logo & Tagline */}
          <Link to="/" className="flex flex-col group py-1 shrink-0">
            <span className="font-heading text-lg sm:text-2xl font-bold text-[#6B1D2F] tracking-tight group-hover:text-[#521321] transition-colors leading-none">
              Sasamal Events
            </span>
            <span className="text-[7.5px] sm:text-[10px] font-semibold tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#C5A46D] mt-0.5">
              EVENTS • DECOR • CELEBRATIONS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <Link
              to="/"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'text-[#6B1D2F] font-semibold'
                  : 'text-[#292725]/80 hover:text-[#6B1D2F] hover:bg-black/5'
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
                className={`inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname.startsWith('/services')
                    ? 'text-[#6B1D2F] font-semibold'
                    : 'text-[#292725]/80 hover:text-[#6B1D2F] hover:bg-black/5'
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
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === '/gallery'
                  ? 'text-[#6B1D2F] font-semibold'
                  : 'text-[#292725]/80 hover:text-[#6B1D2F] hover:bg-black/5'
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/about"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === '/about'
                  ? 'text-[#6B1D2F] font-semibold'
                  : 'text-[#292725]/80 hover:text-[#6B1D2F] hover:bg-black/5'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === '/contact'
                  ? 'text-[#6B1D2F] font-semibold'
                  : 'text-[#292725]/80 hover:text-[#6B1D2F] hover:bg-black/5'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Action Items */}
          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp Icon Button */}
            <button
              onClick={handleWhatsApp}
              className="p-2.5 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
              title="Chat with us on WhatsApp"
              aria-label="WhatsApp Us"
            >
              <MessageCircle className="w-5 h-5" />
            </button>

            {/* Enquire Now Button */}
            <Button
              variant="maroon"
              size="sm"
              onClick={() => setQuoteModalOpen(true)}
              className="rounded-full px-5 py-2 text-xs font-semibold tracking-wide uppercase shadow-sm"
            >
              Enquire Now
            </Button>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleWhatsApp}
              className="p-2 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            <button
              className="p-2 rounded-lg hover:bg-black/5 transition-colors"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#292725]" />
              ) : (
                <Menu className="w-6 h-6 text-[#292725]" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#FAF8F3] z-40 animate-slide-down border-t border-[#C5A46D]/20 overflow-y-auto">
          <div className="flex flex-col p-6 space-y-1">
            <Link
              to="/"
              className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                location.pathname === '/' ? 'text-[#6B1D2F] bg-[#6B1D2F]/10 font-bold' : 'text-[#292725]'
              }`}
            >
              Home
            </Link>

            {/* Mobile Services Accordion */}
            <div className="py-2">
              <span className="px-4 text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-2">
                Services
              </span>
              <div className="space-y-1 pl-2">
                {serviceDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-[#292725] hover:text-[#6B1D2F] rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="block px-4 py-2 text-sm font-semibold text-[#6B1D2F]"
                >
                  View All Services &rarr;
                </Link>
              </div>
            </div>

            <Link
              to="/gallery"
              className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                location.pathname === '/gallery' ? 'text-[#6B1D2F] bg-[#6B1D2F]/10 font-bold' : 'text-[#292725]'
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/about"
              className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                location.pathname === '/about' ? 'text-[#6B1D2F] bg-[#6B1D2F]/10 font-bold' : 'text-[#292725]'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                location.pathname === '/contact' ? 'text-[#6B1D2F] bg-[#6B1D2F]/10 font-bold' : 'text-[#292725]'
              }`}
            >
              Contact
            </Link>

            <div className="pt-4 space-y-3 border-t border-[#C5A46D]/20 mt-4">
              <Button
                variant="maroon"
                fullWidth
                onClick={() => {
                  setMobileMenuOpen(false);
                  setQuoteModalOpen(true);
                }}
              >
                Enquire Now
              </Button>
              <Button variant="whatsapp" fullWidth onClick={handleWhatsApp}>
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
