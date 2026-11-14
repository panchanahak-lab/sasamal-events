import React from 'react';
import { useStore } from '@/stores/useStore';
import { getWhatsAppUrl } from '@/utils/format';
import { generateSimpleWhatsAppMessage } from '@/utils/whatsapp';

export function FloatingActionBar() {
  const { settings } = useStore();

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = getWhatsAppUrl(settings.whatsapp, generateSimpleWhatsAppMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-md mx-auto p-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(41,39,37,0.12)] flex items-center justify-between gap-2.5 pointer-events-auto border border-[#dac0c2]/30">
        <a
          href={`tel:${settings.phone || '+919999999999'}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#F8F2EF] text-[#1D1B19] hover:bg-[#f3ede9] py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-colors"
        >
          <span className="material-symbols-outlined text-[18px] text-[#6B1D2F]">call</span>
          <span>Call Us</span>
        </a>

        <a
          href="#"
          onClick={handleWhatsApp}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#00A859] hover:bg-[#00924d] text-white py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-transform hover:scale-[1.02] shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>WhatsApp Enquiry</span>
        </a>
      </div>
    </div>
  );
}
