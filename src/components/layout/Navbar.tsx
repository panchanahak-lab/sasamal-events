import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/useStore';
import { getWhatsAppUrl } from '@/utils/format';
import { generateSimpleWhatsAppMessage } from '@/utils/whatsapp';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Our Services', path: '/services' },
  { name: 'Packages', path: '/packages' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobileMenuOpen, setMobileMenuOpen, setQuoteModalOpen, settings } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(settings.whatsapp, generateSimpleWhatsAppMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-gray-light/10'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-10">
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                Sasamal
              </span>
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase text-gold -mt-1">
                Events
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : 'text-charcoal/80 hover:text-charcoal hover:bg-ivory'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setQuoteModalOpen(true)}>
              Get a Quote
            </Button>
            <Button variant="whatsapp" size="sm" onClick={handleWhatsApp}>
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden z-10 p-2 rounded-lg hover:bg-ivory transition-colors"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-charcoal" />
            ) : (
              <Menu className="w-6 h-6 text-charcoal" />
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 animate-slide-down">
          <div className="flex flex-col p-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'text-gold bg-gold/5'
                    : 'text-charcoal hover:bg-ivory'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3 border-t border-warm-gray-light/20 mt-4">
              <Button variant="outline" fullWidth onClick={() => { setMobileMenuOpen(false); setQuoteModalOpen(true); }}>
                Get a Quote
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
