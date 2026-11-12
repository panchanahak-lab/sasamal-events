import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { getWhatsAppUrl } from '@/utils/format';
import { generateSimpleWhatsAppMessage } from '@/utils/whatsapp';

export function WhatsAppButton() {
  const { settings } = useStore();

  const handleClick = () => {
    const url = getWhatsAppUrl(settings.whatsapp, generateSimpleWhatsAppMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-charcoal text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </button>
  );
}
