import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, FacebookIcon, YouTubeIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';

function LotusIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21c-2-3-4-7-4-11a4 4 0 0 1 8 0c0 4-2 8-4 11z" />
      <path d="M12 21c-3-2-8-4-8-9a5 5 0 0 1 7-4" />
      <path d="M12 21c3-2 8-4 8-9a5 5 0 0 0-7-4" />
      <path d="M12 17a3 3 0 0 0 0-6 3 3 0 0 0 0 6z" />
    </svg>
  );
}

export function Footer() {
  const { settings } = useStore();

  return (
    <footer className="bg-[#6B1D2F] text-white overflow-hidden pt-12 pb-24 sm:pb-28 border-t border-[#C5A46D]/30">
      <Container>
        {/* Top Header Row (Logo Left, Nav Links Center, Social Icons Right) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/15">
          {/* Left: Brand Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="text-[#F6BD38] group-hover:scale-105 transition-transform">
              <LotusIcon className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                Sasamal Events
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-semibold tracking-[0.2em] uppercase text-rose-100/80">
                EVENTS • DECOR • CELEBRATIONS
              </span>
            </div>
          </Link>

          {/* Center: Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-medium text-white/90">
            <Link to="/" className="hover:text-[#F6BD38] transition-colors">
              Home
            </Link>
            <Link to="/services" className="hover:text-[#F6BD38] transition-colors">
              Services
            </Link>
            <Link to="/gallery" className="hover:text-[#F6BD38] transition-colors">
              Gallery
            </Link>
            <Link to="/about" className="hover:text-[#F6BD38] transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-[#F6BD38] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right: Circular Social Media Outline Icons */}
          <div className="flex items-center gap-3">
            {settings.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/40 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/40 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
              aria-label="YouTube"
            >
              <YouTubeIcon className="w-4 h-4" />
            </a>
            {settings.facebook_url && (
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/40 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 text-center text-xs text-rose-100/70">
          <p>© {new Date().getFullYear()} Sasamal Events. All rights reserved. Crafted for timeless celebrations.</p>
        </div>
      </Container>
    </footer>
  );
}
