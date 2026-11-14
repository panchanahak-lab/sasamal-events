import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { getWhatsAppUrl } from '@/utils/format';
import { generateSimpleWhatsAppMessage } from '@/utils/whatsapp';

function LotusNavbarIcon({ className = 'w-6 h-6' }: { className?: string }) {
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
    <header className="fixed top-0 w-full z-50 bg-[#FEF8F5]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#6B1D2F]/10 flex items-center justify-center text-[#6B1D2F] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">spa</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#6B1D2F] leading-tight">
              Sasamal Events
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#7A5900] font-semibold">
              Events · Decor · Celebrations
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Pill Container) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#F8F2EF]">
          <Link
            to="/"
            className={`px-4 py-1.5 transition-colors text-sm ${
              location.pathname === '/'
                ? 'bg-[#6B1D2F] text-white font-bold rounded-full'
                : 'font-semibold text-[#544244] hover:text-[#1D1B19]'
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
              className={`inline-flex items-center gap-1 px-4 py-1.5 text-sm transition-colors ${
                location.pathname.startsWith('/services')
                  ? 'bg-[#6B1D2F] text-white font-bold rounded-full'
                  : 'font-semibold text-[#544244] hover:text-[#1D1B19]'
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isServicesOpen && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-[#C5A46D]/20 p-2.5 mt-2 animate-fade-in z-50">
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
                    <div className="text-sm font-semibold text-[#1D1B19] group-hover:text-[#6B1D2F] transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[#544244] line-clamp-1">{item.desc}</div>
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
            className={`px-4 py-1.5 transition-colors text-sm ${
              location.pathname === '/gallery'
                ? 'bg-[#6B1D2F] text-white font-bold rounded-full'
                : 'font-semibold text-[#544244] hover:text-[#1D1B19]'
            }`}
          >
            Gallery
          </Link>

          <Link
            to="/about"
            className={`px-4 py-1.5 transition-colors text-sm ${
              location.pathname === '/about'
                ? 'bg-[#6B1D2F] text-white font-bold rounded-full'
                : 'font-semibold text-[#544244] hover:text-[#1D1B19]'
            }`}
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className={`px-4 py-1.5 transition-colors text-sm ${
              location.pathname === '/contact'
                ? 'bg-[#6B1D2F] text-white font-bold rounded-full'
                : 'font-semibold text-[#544244] hover:text-[#1D1B19]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Header Action Items */}
        <div className="flex items-center gap-2">
          {/* WhatsApp Quick Action Button */}
          <button
            type="button"
            onClick={handleWhatsApp}
            aria-label="WhatsApp Quick Contact"
            className="w-10 h-10 rounded-full bg-[#00A859] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </button>

          {/* Enquire Now Pill */}
          <button
            type="button"
            onClick={() => setQuoteModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#6B1D2F] text-white hover:bg-[#4E1220] px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_10px_25px_-5px_rgba(107,29,47,0.2)]"
          >
            <span className="material-symbols-outlined text-[18px]">event_available</span>
            <span>Enquire Now</span>
          </button>

          {/* User Profile Avatar */}
          <Link
            to="/admin/login"
            className="w-8 h-8 rounded-full bg-[#4E051A] flex items-center justify-center text-white transition-opacity hover:opacity-90"
            aria-label="Admin Login"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#1D1B19] hover:text-[#6B1D2F] focus:outline-none lg:hidden"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-[#dac0c2]/30 px-6 py-4 animate-slide-down">
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === '/' ? 'bg-[#6B1D2F] text-white' : 'text-[#1D1B19] hover:bg-[#F8F2EF]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname.startsWith('/services') ? 'bg-[#6B1D2F] text-white' : 'text-[#1D1B19] hover:bg-[#F8F2EF]'
              }`}
            >
              Services
            </Link>
            <Link
              to="/gallery"
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === '/gallery' ? 'bg-[#6B1D2F] text-white' : 'text-[#1D1B19] hover:bg-[#F8F2EF]'
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === '/about' ? 'bg-[#6B1D2F] text-white' : 'text-[#1D1B19] hover:bg-[#F8F2EF]'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === '/contact' ? 'bg-[#6B1D2F] text-white' : 'text-[#1D1B19] hover:bg-[#F8F2EF]'
              }`}
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#6B1D2F] text-white py-2.5 rounded-full text-sm font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">event_available</span>
                <span>Enquire Now</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
