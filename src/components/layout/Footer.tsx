import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/stores/useStore';

export function Footer() {
  const { settings } = useStore();

  return (
    <footer className="relative w-full bg-[#F8F2EF] text-[#1D1B19] py-16 pb-24 sm:pb-28 overflow-hidden border-t border-[#dac0c2]/30">
      {/* Flowing Pattachitra Wave and Conch Medallions in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute -top-10 left-10 w-72 h-72 text-[#6B1D2F] anim-kolam-pulse">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" strokeDasharray="4 6" strokeWidth="1" />
            <circle cx="100" cy="100" r="65" strokeWidth="1.2" />
            {/* Lata-pata petal loops */}
            <path d="M100 20 C120 45 130 75 100 100 C70 75 80 45 100 20 Z" strokeWidth="1.5" />
            <path d="M100 180 C120 155 130 125 100 100 C70 125 80 155 100 180 Z" strokeWidth="1.5" />
            <path d="M20 100 C45 80 75 70 100 100 C75 130 45 120 20 100 Z" strokeWidth="1.5" />
            <path d="M180 100 C155 80 125 70 100 100 C125 130 155 120 180 100 Z" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="absolute -bottom-10 right-10 w-80 h-80 text-[#7a5900] anim-spin-kolam">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" strokeWidth="1.5" />
            <polygon points="100,10 190,100 100,190 10,100" strokeWidth="1" />
            <circle cx="100" cy="100" r="45" strokeDasharray="2 4" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center">
        {/* Lotus emblem */}
        <div className="w-14 h-14 rounded-full bg-[#6B1D2F]/10 flex items-center justify-center text-[#6B1D2F] mb-3">
          <span className="material-symbols-outlined text-[32px]">spa</span>
        </div>

        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#6B1D2F] mb-1">
          Sasamal Events
        </h3>

        <p className="text-xs uppercase tracking-widest text-[#7A5900] font-semibold mb-6">
          Luxury Event Decor &amp; Celebrations
        </p>

        <div className="w-24 h-0.5 bg-[#FDC33E]/50 mb-8" />

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mb-8">
          <Link to="/" className="text-sm font-semibold text-[#544244] hover:text-[#6B1D2F] transition-colors">
            Home
          </Link>
          <Link to="/services" className="text-sm font-semibold text-[#544244] hover:text-[#6B1D2F] transition-colors">
            Services
          </Link>
          <Link to="/gallery" className="text-sm font-semibold text-[#544244] hover:text-[#6B1D2F] transition-colors">
            Gallery
          </Link>
          <Link to="/about" className="text-sm font-semibold text-[#544244] hover:text-[#6B1D2F] transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-sm font-semibold text-[#544244] hover:text-[#6B1D2F] transition-colors">
            Contact
          </Link>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 mb-8">
          <a
            aria-label="Instagram"
            href={settings.instagram_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#f3ede9] flex items-center justify-center text-[#544244] hover:bg-[#6B1D2F] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </a>
          <a
            aria-label="YouTube"
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#f3ede9] flex items-center justify-center text-[#544244] hover:bg-[#6B1D2F] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">smart_display</span>
          </a>
          <a
            aria-label="Facebook"
            href={settings.facebook_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#f3ede9] flex items-center justify-center text-[#544244] hover:bg-[#6B1D2F] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">public</span>
          </a>
        </div>

        <p className="text-xs text-[#544244]">
          © {new Date().getFullYear()} Sasamal Events. All rights reserved. Crafted for timeless celebrations.
        </p>
      </div>
    </footer>
  );
}
