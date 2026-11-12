import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';
import { getWhatsAppUrl } from '@/utils/format';
import { generateSimpleWhatsAppMessage } from '@/utils/whatsapp';

export function Footer() {
  const { settings } = useStore();

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(settings.whatsapp, generateSimpleWhatsAppMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#1C1617] text-white/80 border-t border-[#C5A46D]/20">
      {/* Main Footer Container */}
      <div className="pt-16 pb-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Column 1: Brand & Tagline */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-3">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Sasamal Events
                </span>
                <span className="block text-[10px] font-semibold tracking-[0.22em] uppercase text-[#C5A46D] mt-0.5">
                  EVENTS • DECOR • CELEBRATIONS
                </span>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Making Every Celebration Special with thoughtful decoration and personalized event experiences across Navi Mumbai.
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/10 hover:bg-[#C5A46D] hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/10 hover:bg-[#C5A46D] hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-[#25D366] hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="font-heading text-lg font-bold text-white mb-4 tracking-wide">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/" className="text-white/70 hover:text-[#C5A46D] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white/70 hover:text-[#C5A46D] transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-white/70 hover:text-[#C5A46D] transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white/70 hover:text-[#C5A46D] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white/70 hover:text-[#C5A46D] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Celebrations We Create */}
            <div>
              <h4 className="font-heading text-lg font-bold text-white mb-4 tracking-wide">
                Celebrations
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/services#engagement-ring-ceremony" className="text-white/70 hover:text-[#C5A46D] transition-colors">
                    Ring Ceremony
                  </Link>
                </li>
                <li>
                  <Link to="/services#haldi-mehendi-decorations" className="text-white/70 hover:text-[#C5A46D] transition-colors">
                    Haldi Ceremony
                  </Link>
                </li>
                <li>
                  <Link to="/services#wedding-mandap-decorations" className="text-white/70 hover:text-[#C5A46D] transition-colors">
                    Mandap Decoration
                  </Link>
                </li>
                <li>
                  <Link to="/packages" className="text-white/70 hover:text-[#C5A46D] transition-colors">
                    Birthday Celebration
                  </Link>
                </li>
                <li>
                  <Link to="/services#family-functions" className="text-white/70 hover:text-[#C5A46D] transition-colors">
                    Family Functions
                  </Link>
                </li>
                <li>
                  <Link to="/services#special-events" className="text-white/70 hover:text-[#C5A46D] transition-colors">
                    Private Functions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick Action Buttons & Direct Contact */}
            <div>
              <h4 className="font-heading text-lg font-bold text-white mb-4 tracking-wide">
                Get In Touch
              </h4>
              <p className="text-sm text-white/60 mb-5">
                Navi Mumbai, Maharashtra, India
              </p>

              <div className="space-y-3">
                {/* Call Us Button */}
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-[#C5A46D] text-white text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <Phone className="w-4 h-4 text-[#C5A46D] group-hover:text-white" />
                  <span>Call Us: {settings.phone}</span>
                </a>

                {/* WhatsApp Enquiry Button */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Enquiry</span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Copyright & Legal Bar */}
      <div className="border-t border-white/10 py-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>&copy; 2026 Sasamal Events. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="hover:text-white/70 transition-colors">
                Terms and Conditions
              </Link>
              <Link to="/privacy" className="hover:text-white/70 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cancellation-policy" className="hover:text-white/70 transition-colors">
                Cancellation Policy
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
