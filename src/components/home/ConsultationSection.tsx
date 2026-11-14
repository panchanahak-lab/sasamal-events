import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
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

    const message = `*New Event Proposal Request*\n\n*Name:* ${fullName}\n*Phone:* ${phone}\n*Event Type:* ${eventType}\n*Date & City:* ${eventDateCity || 'Not specified'}\n*Requirements:* ${decorVision || 'None'}`;
    const url = getWhatsAppUrl(settings.whatsapp, message);
    
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 1200);
  };

  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto overflow-hidden" id="quote-modal">
      {/* Pattachitra Decorative Top Ribbon (Flowing Lata-Pata vine border) */}
      <div className="w-full h-4 overflow-hidden mb-2 pointer-events-none opacity-25 text-[#6B1D2F]">
        <div className="anim-scroll-pattachitra">
          <svg className="h-4 w-1/2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 600 20">
            <path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 T250 10 T300 10 T350 10 T400 10 T450 10 T500 10 T550 10 T600 10" strokeWidth="1.5" />
            <circle cx="25" cy="5" fill="currentColor" r="2.5" />
            <circle cx="75" cy="15" fill="currentColor" r="2.5" />
            <circle cx="125" cy="5" fill="currentColor" r="2.5" />
            <circle cx="175" cy="15" fill="currentColor" r="2.5" />
            <circle cx="225" cy="5" fill="currentColor" r="2.5" />
            <circle cx="275" cy="15" fill="currentColor" r="2.5" />
            <circle cx="325" cy="5" fill="currentColor" r="2.5" />
            <circle cx="375" cy="15" fill="currentColor" r="2.5" />
            <circle cx="425" cy="5" fill="currentColor" r="2.5" />
            <circle cx="475" cy="15" fill="currentColor" r="2.5" />
            <circle cx="525" cy="5" fill="currentColor" r="2.5" />
            <circle cx="575" cy="15" fill="currentColor" r="2.5" />
          </svg>
          <svg className="h-4 w-1/2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 600 20">
            <path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 T250 10 T300 10 T350 10 T400 10 T450 10 T500 10 T550 10 T600 10" strokeWidth="1.5" />
            <circle cx="25" cy="5" fill="currentColor" r="2.5" />
            <circle cx="75" cy="15" fill="currentColor" r="2.5" />
            <circle cx="125" cy="5" fill="currentColor" r="2.5" />
            <circle cx="175" cy="15" fill="currentColor" r="2.5" />
            <circle cx="225" cy="5" fill="currentColor" r="2.5" />
            <circle cx="275" cy="15" fill="currentColor" r="2.5" />
            <circle cx="325" cy="5" fill="currentColor" r="2.5" />
            <circle cx="375" cy="15" fill="currentColor" r="2.5" />
            <circle cx="425" cy="5" fill="currentColor" r="2.5" />
            <circle cx="475" cy="15" fill="currentColor" r="2.5" />
            <circle cx="525" cy="5" fill="currentColor" r="2.5" />
            <circle cx="575" cy="15" fill="currentColor" r="2.5" />
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg relative border-0">
        {/* Pattachitra Medallion in Background */}
        <div className="absolute -right-16 -top-16 w-56 h-56 text-[#7a5900]/10 pointer-events-none anim-kolam-pulse">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="85" strokeDasharray="3 4" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="60" strokeWidth="1" />
            {/* Conch / Shankha curl characteristic of Odisha Pattachitra */}
            <path d="M100 45 C115 55 125 75 120 100 C115 120 100 135 85 130 C70 125 70 105 85 95 C100 85 105 70 100 45 Z" strokeWidth="1.4" />
            <circle cx="100" cy="100" r="10" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 text-center mb-8">
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

        <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
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
              <option>Wedding &amp; Mandap Setup</option>
              <option>Ring Ceremony</option>
              <option>Haldi &amp; Mehendi Decor</option>
              <option>Birthday &amp; Milestone Party</option>
              <option>Private Proposal / Anniversary</option>
              <option>Family Reception</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544244] mb-1.5">
              Event Date &amp; City
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
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </form>

        {/* Success confirmation overlay */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-6 text-center animate-fade-in z-20">
            <span className="material-symbols-outlined text-[56px] text-[#00A859] mb-2">task_alt</span>
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
