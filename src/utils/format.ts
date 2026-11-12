/**
 * Format a number as Indian Rupee currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a date string to Indian format (DD/MM/YYYY)
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Format date to readable format
 */
export const formatDateLong = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Format phone number for display
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};

/**
 * Generate WhatsApp URL
 */
export const getWhatsAppUrl = (phone: string, message: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  const formattedPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate a unique reference number
 */
export const generateReferenceNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SE-${timestamp}-${random}`;
};

/**
 * Get status display info
 */
export const getStatusInfo = (status: string): { label: string; color: string } => {
  const statusMap: Record<string, { label: string; color: string }> = {
    new: { label: 'New Enquiry', color: 'bg-blue-100 text-blue-800' },
    contacted: { label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
    quotation_sent: { label: 'Quotation Sent', color: 'bg-purple-100 text-purple-800' },
    awaiting_confirmation: { label: 'Awaiting Confirmation', color: 'bg-orange-100 text-orange-800' },
    confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-800' },
    in_progress: { label: 'In Progress', color: 'bg-indigo-100 text-indigo-800' },
    completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  };
  return statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
};

/**
 * Validate Indian phone number
 */
export const isValidIndianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) return /^[6-9]\d{9}$/.test(cleaned);
  if (cleaned.length === 12 && cleaned.startsWith('91')) return /^91[6-9]\d{9}$/.test(cleaned);
  return false;
};

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Slugify a string
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
