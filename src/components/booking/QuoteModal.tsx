import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useSubmitEnquiry } from '@/hooks/useSupabase';
import { generateReferenceNumber, isValidIndianPhone, isValidEmail } from '@/utils/format';
import { openWhatsApp, generateCustomQuoteWhatsAppMessage } from '@/utils/whatsapp';
import type { CustomQuoteFormData } from '@/types';

const eventCategories = [
  'For Wedding: Wedding Mandap & Sacred Rituals',
  'For Wedding: Haldi & Mehendi Celebration',
  'For Wedding: Ring Ceremony & Engagement',
  'For Wedding: Reception Stage & Seating',
  'For Wedding: Complete Wedding Package (All Rituals)',
  'Mandap Decoration (Dome / Square Mandap)',
  'Success Party & Corporate Milestone',
  'Gender Reveal Celebration',
  'Birthday Celebration (Kids / Adults)',
  'Baby Shower / Godh Bharai',
  'Naming Ceremony / Cradle',
  'Anniversary & Family Milestone',
  'Housewarming / Griha Pravesh',
  'Romantic Proposal & Private Event',
  'Other Custom Celebration'
];

const budgetRanges = [
  'Below ₹10,000',
  '₹10,000–₹25,000',
  '₹25,000–₹50,000',
  '₹50,000–₹1,00,000',
  'Above ₹1,00,000',
  'Not decided'
];

export function QuoteModal() {
  const { isQuoteModalOpen, setQuoteModalOpen, settings } = useStore();
  const { submitEnquiry, loading } = useSubmitEnquiry();

  const [formData, setFormData] = useState<CustomQuoteFormData>({
    customerName: '',
    phone: '',
    email: '',
    eventCategory: eventCategories[0],
    eventDate: '',
    venueName: '',
    venueLocation: '',
    venueType: 'indoor',
    guestCount: '',
    budgetRange: budgetRanges[1],
    decorationRequirements: '',
    decorationStyle: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successReference, setSuccessReference] = useState<string | null>(null);

  if (!isQuoteModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.customerName.trim()) errs.customerName = 'Please enter your name';
    if (!formData.phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (!isValidIndianPhone(formData.phone)) {
      errs.phone = 'Enter a valid 10-digit mobile number';
    }
    if (formData.email && !isValidEmail(formData.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.eventDate) {
      errs.eventDate = 'Please select your event date';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const refNum = generateReferenceNumber();

    const enquiryPayload = {
      reference_number: refNum,
      customer_name: formData.customerName,
      phone: formData.phone,
      email: formData.email || undefined,
      event_category: formData.eventCategory,
      event_date: formData.eventDate,
      venue_name: formData.venueName || undefined,
      event_location: formData.venueLocation || undefined,
      venue_type: formData.venueType,
      guest_count: formData.guestCount || undefined,
      budget_range: formData.budgetRange,
      decoration_requirements: formData.decorationRequirements || undefined,
      decoration_style: formData.decorationStyle || undefined,
      enquiry_type: 'custom' as const,
      status: 'new' as const,
    };

    const res = await submitEnquiry(enquiryPayload);
    if (res.success) {
      setSuccessReference(refNum);
    }
  };

  const handleOpenWhatsApp = () => {
    const msg = generateCustomQuoteWhatsAppMessage(formData);
    openWhatsApp(settings.whatsapp, msg);
  };

  const handleClose = () => {
    setQuoteModalOpen(false);
    setSuccessReference(null);
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-warm-gray-light/20 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#FAF8F3] px-6 sm:px-8 py-6 border-b border-[#EBE7DF] flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A46D]/15 text-[#B08F56] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Tailored Event Experience
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725]">
              Request a Custom Quotation
            </h2>
            <p className="text-xs sm:text-sm text-[#77716B] mt-1">
              Navi Mumbai • Engagement, Weddings, Receptions & Grand Celebrations
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#77716B] transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {successReference ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#292725] mb-2">
                Enquiry Successfully Received!
              </h3>
              <p className="text-[#77716B] text-sm max-w-md mx-auto mb-3">
                Thank you for choosing Sasamal Events. Our decoration team will review your requirements and share an estimated proposal shortly.
              </p>
              <div className="inline-block bg-[#FAF8F3] border border-[#EBE7DF] rounded-xl px-5 py-3 mb-6">
                <span className="text-xs text-[#77716B] uppercase tracking-wider block">Your Enquiry Reference</span>
                <span className="text-lg font-bold text-[#292725] tracking-wide">{successReference}</span>
              </div>

              <div className="space-y-3 max-w-md mx-auto">
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#20BD5A] transition-all shadow-md"
                >
                  <MessageSquare className="w-5 h-5" />
                  Send Details on WhatsApp Instantly
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 px-6 rounded-xl border border-warm-gray-light text-[#77716B] text-sm hover:bg-[#FAF8F3] transition-colors"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-[#B77C68]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 outline-none text-sm transition-all"
                  />
                  {errors.customerName && (
                    <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1.5">
                    WhatsApp / Mobile Number <span className="text-[#B77C68]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm text-[#77716B]">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 outline-none text-sm transition-all"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1.5">
                    Event Category <span className="text-[#B77C68]">*</span>
                  </label>
                  <select
                    value={formData.eventCategory}
                    onChange={(e) => setFormData({ ...formData, eventCategory: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 outline-none text-sm transition-all bg-white"
                  >
                    {eventCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1.5">
                    Event Date <span className="text-[#B77C68]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 outline-none text-sm transition-all bg-white"
                  />
                  {errors.eventDate && <p className="text-xs text-red-500 mt-1">{errors.eventDate}</p>}
                </div>
              </div>

              {/* Venue details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1.5">
                    Venue Name & Location (Navi Mumbai)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Seawoods Banquet / Home / Vashi"
                    value={formData.venueLocation}
                    onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1.5">
                    Venue Type
                  </label>
                  <select
                    value={formData.venueType}
                    onChange={(e) => setFormData({ ...formData, venueType: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 outline-none text-sm transition-all bg-white"
                  >
                    <option value="indoor">Indoor (Hall/Home)</option>
                    <option value="outdoor">Outdoor / Lawn</option>
                    <option value="both">Both Indoor & Lawn</option>
                  </select>
                </div>
              </div>

              {/* Budget & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1.5">
                    Approximate Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 outline-none text-sm transition-all bg-white"
                  >
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <span className="text-[11px] text-[#77716B] block mt-1">
                    Enquiry guideline for customized concept proposals
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1.5">
                    Expected Guest Count
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50-100 guests"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Requirements & Style */}
              <div>
                <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1.5">
                  Decoration Style & Theme Ideas (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your vision, colour theme (e.g. pastel floral, royal gold, minimalist balloon arch, traditional marigold mandap)..."
                  value={formData.decorationRequirements}
                  onChange={(e) => setFormData({ ...formData, decorationRequirements: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 outline-none text-sm transition-all"
                />
              </div>

              <div className="pt-2 border-t border-[#EBE7DF] flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium text-[#77716B] hover:bg-[#FAF8F3] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#292725] text-white hover:bg-black font-medium transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C5A46D]" />
                      Submit Quotation Request
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
