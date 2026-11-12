import { getWhatsAppUrl } from './format';
import type { BookingFormData, CustomQuoteFormData, SelectedAddon } from '@/types';

/**
 * Generate WhatsApp message for package booking enquiry
 */
export const generatePackageWhatsAppMessage = (data: BookingFormData): string => {
  const addonsText = data.selectedAddons.length > 0
    ? data.selectedAddons.map(a => 
        `  • ${a.addon.name} (x${a.quantity}) — ₹${a.addon.price * a.quantity}`
      ).join('\n')
    : '  None';

  return `Hello Sasamal Events,

I am interested in your birthday decoration service.

Selected Package: ${data.packageName}
Package Price: ₹${data.packagePrice.toLocaleString('en-IN')}
Add-ons:
${addonsText}
Estimated Total: ₹${data.estimatedTotal.toLocaleString('en-IN')}

Customer Name: ${data.customerName}
Event Date: ${data.eventDate}
Event Time: ${data.eventTime || 'Not specified'}
Location: ${data.eventLocation}
${data.additionalRequirements ? `\nAdditional Requirements: ${data.additionalRequirements}` : ''}

Please contact me regarding availability and booking confirmation.`;
};

/**
 * Generate WhatsApp message for custom quote enquiry
 */
export const generateCustomQuoteWhatsAppMessage = (data: CustomQuoteFormData): string => {
  return `Hello Sasamal Events,

I would like to enquire about event decoration services.

Event Type: ${data.eventCategory}
Event Date: ${data.eventDate}
${data.venueName ? `Venue: ${data.venueName}` : ''}
${data.venueLocation ? `Venue Location: ${data.venueLocation}` : ''}
${data.venueType ? `Venue Type: ${data.venueType}` : ''}
${data.guestCount ? `Expected Guests: ${data.guestCount}` : ''}
${data.budgetRange ? `Budget Range: ${data.budgetRange}` : ''}

Customer Name: ${data.customerName}
Contact: ${data.phone}
${data.email ? `Email: ${data.email}` : ''}

${data.decorationRequirements ? `Decoration Requirements:\n${data.decorationRequirements}` : ''}
${data.decorationStyle ? `Preferred Style: ${data.decorationStyle}` : ''}

Please share a quotation or contact me to discuss further.`;
};

/**
 * Open WhatsApp with a pre-filled message
 */
export const openWhatsApp = (phone: string, message: string): void => {
  const url = getWhatsAppUrl(phone, message);
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Generate a simple enquiry WhatsApp message
 */
export const generateSimpleWhatsAppMessage = (): string => {
  return `Hello Sasamal Events,

I would like to enquire about your event decoration services. Please share more details.

Thank you.`;
};
