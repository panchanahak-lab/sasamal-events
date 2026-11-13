import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';
import { getWhatsAppUrl } from '@/utils/format';

export function ConsultationSection() {
  const { settings } = useStore();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Wedding & Mandap Setup');
  const [eventDateCity, setEventDateCity] = useState('');
  const [decorVision, setDecorVision] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Optional: direct forward to WhatsApp enquiry
    const message = `*New Event Proposal Request*\n\n*Name:* ${fullName}\n*Phone:* ${phone}\n*Event Type:* ${eventType}\n*Date & City:* ${eventDateCity || 'Not specified'}\n*Requirements:* ${decorVision || 'None'}`;
    const url = getWhatsAppUrl(settings.whatsapp, message);
    
    // We can open WhatsApp in new tab after showing confirmation
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 1200);
  };

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto" id="quote-modal">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg relative border border-[#dac0c2]/30">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#7A5900] font-bold">
            Personalized Consultation
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#6B1D2F] mt-1.5">
            Request an Event Proposal
          </h3>
          <p className="text-xs sm:text-sm text-[#544244] mt-1.5 max-w-md mx-auto">
            Tell us your celebration date and vision. Our design directors will craft a bespoke moodboard.
          </p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-[#544244] mb-1.5">
              Your Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Radhika Sharma"
              className="w-full px-4 py-2.5 rounded-lg bg-[#F8F2EF] text-[#1D1B19] text-sm focus:outline-none focus:ring-2 focus:ring-[#FDC33E] border border-transparent focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544244] mb-1.5">
              Phone / WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 rounded-lg bg-[#F8F2EF] text-[#1D1B19] text-sm focus:outline-none focus:ring-2 focus:ring-[#FDC33E] border border-transparent focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544244] mb-1.5">
              Event Type
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#F8F2EF] text-[#1D1B19] text-sm focus:outline-none focus:ring-2 focus:ring-[#FDC33E] border border-transparent focus:border-transparent transition-all"
            >
              <option>Wedding & Mandap Setup</option>
              <option>Ring Ceremony</option>
              <option>Haldi & Mehendi Decor</option>
              <option>Birthday & Milestone Party</option>
              <option>Private Proposal / Anniversary</option>
              <option>Family Reception</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544244] mb-1.5">
              Event Date & City
            </label>
            <input
              type="text"
              value={eventDateCity}
              onChange={(e) => setEventDateCity(e.target.value)}
              placeholder="e.g. Nov 2024, Navi Mumbai"
              className="w-full px-4 py-2.5 rounded-lg bg-[#F8F2EF] text-[#1D1B19] text-sm focus:outline-none focus:ring-2 focus:ring-[#FDC33E] border border-transparent focus:border-transparent transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#544244] mb-1.5">
              Decor Vision / Specific Requirements
            </label>
            <textarea
              rows={3}
              value={decorVision}
              onChange={(e) => setDecorVision(e.target.value)}
              placeholder="Describe your desired theme, colour palette, venue details or guest count..."
              className="w-full px-4 py-2.5 rounded-lg bg-[#F8F2EF] text-[#1D1B19] text-sm focus:outline-none focus:ring-2 focus:ring-[#FDC33E] border border-transparent focus:border-transparent transition-all"
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#6B1D2F] hover:bg-[#4E1220] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <span>Send Enquiry</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Success confirmation overlay */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-6 text-center animate-fade-in z-20">
            <CheckCircle2 className="w-14 h-14 text-[#00A859] mb-3" />
            <h4 className="font-heading text-xl sm:text-2xl font-bold text-[#6B1D2F]">
              Inquiry Received
            </h4>
            <p className="text-sm text-[#544244] max-w-sm mt-2 leading-relaxed">
              Our celebration specialist will connect with you on WhatsApp within 2 hours with curated options.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="mt-6 px-6 py-2 rounded-full bg-[#F8F2EF] text-[#1D1B19] text-xs font-semibold hover:bg-[#f3ede9] transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
