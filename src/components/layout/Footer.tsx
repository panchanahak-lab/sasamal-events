import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';
import { getWhatsAppUrl } from '@/utils/format';
import { generateSimpleWhatsAppMessage } from '@/utils/whatsapp';

const serviceLinks = [
  { name: 'Birthday Celebrations', path: '/services#birthday' },
  { name: 'Engagement & Ring Ceremony', path: '/services#engagement' },
  { name: 'Wedding Decorations', path: '/services#wedding' },
  { name: 'Reception Decorations', path: '/services#reception' },
  { name: 'Family Functions', path: '/services#family' },
  { name: 'Special Events', path: '/services#special' },
];

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Our Services', path: '/services' },
  { name: 'Packages', path: '/packages' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
];

const policyLinks = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms and Conditions', path: '/terms' },
  { name: 'Cancellation Policy', path: '/cancellation-policy' },
];

export function Footer() {
  const { settings } = useStore();

  return (
    <footer className="bg-charcoal text-white/80">
      {/* Main Footer */}
      <div className="pt-16 pb-8">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <span className="font-heading text-2xl font-bold text-white">Sasamal</span>
                <span className="block text-xs tracking-[0.25em] uppercase text-gold">Events</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {settings.tagline}. From birthday celebrations to grand weddings, we create beautiful settings for your special moments.
              </p>
              <div className="flex items-center gap-3">
                {settings.instagram_url && (
                  <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-gold/20 transition-colors" aria-label="Instagram">
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.facebook_url && (
                  <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-gold/20 transition-colors" aria-label="Facebook">
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                <a
                  href={getWhatsAppUrl(settings.whatsapp, generateSimpleWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-[#25D366]/20 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {quickLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-white/60 hover:text-gold transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2.5">
                {serviceLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-white/60 hover:text-gold transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                  <span>{settings.address}, {settings.city}, {settings.state}</span>
                </li>
                <li>
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-gold transition-colors">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    {settings.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-gold transition-colors">
                    <Mail className="w-4 h-4 text-gold shrink-0" />
                    {settings.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>&copy; 2026 Sasamal Events. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              {policyLinks.map(link => (
                <Link key={link.path} to={link.path} className="hover:text-white/70 transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
