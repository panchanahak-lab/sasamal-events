import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useStore } from '@/stores/useStore';
import { getWhatsAppUrl, isValidIndianPhone } from '@/utils/format';

export function ContactSection() {
  const { settings } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Birthday Celebration');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!phone.trim() || !isValidIndianPhone(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError(null);
    setSubmitted(true);

    const waText = `Hello Sasamal Events,

My name is ${name}.
I am planning a ${eventType} in Navi Mumbai.
${message ? `Note: ${message}` : ''}

Please let me know how to proceed.`;

    const url = getWhatsAppUrl(settings.whatsapp, waText);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickWhatsApp = () => {
    const url = getWhatsAppUrl(
      settings.whatsapp,
      'Hello Sasamal Events, I would like to enquire about your decoration services in Navi Mumbai.'
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 sm:py-28 bg-white" id="contact">
      <Container>
        <SectionHeading
          subtitle="Get In Touch"
          title="Connect With Sasamal Events"
          description="Have a question about our packages, date availability, or custom venue styling in Navi Mumbai? Reach out to us directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Business Details & WhatsApp CTA (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF8F3] rounded-3xl p-8 sm:p-10 border border-warm-gray-light/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#C5A46D] block mb-1">
                  Navi Mumbai Operations
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725]">
                  Sasamal Events
                </h3>
                <p className="text-sm text-[#77716B] mt-1">{settings.tagline}</p>
              </div>

              <div className="space-y-5 my-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-warm-gray-light/30 flex items-center justify-center text-[#C5A46D] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#77716B] block">
                      Initial Service Location
                    </span>
                    <p className="text-sm font-medium text-[#292725]">
                      {settings.city}, {settings.state}, India
                    </p>
                    <span className="text-xs text-[#77716B]">
                      Serving Vashi, Kharghar, Nerul, Seawoods, Panvel & Belapur
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-warm-gray-light/30 flex items-center justify-center text-[#C5A46D] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#77716B] block">
                      Phone Call Enquiry
                    </span>
                    <a
                      href={`tel:${settings.phone}`}
                      className="text-sm font-medium text-[#292725] hover:text-[#C5A46D] transition-colors"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-warm-gray-light/30 flex items-center justify-center text-[#C5A46D] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#77716B] block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-sm font-medium text-[#292725] hover:text-[#C5A46D] transition-colors"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                {settings.instagram_url && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-warm-gray-light/30 flex items-center justify-center text-[#C5A46D] shrink-0">
                      <InstagramIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#77716B] block">
                        Instagram
                      </span>
                      <a
                        href={settings.instagram_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-[#292725] hover:text-[#C5A46D] transition-colors"
                      >
                        @sasamalevents
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Instant WhatsApp banner button */}
            <div className="pt-6 border-t border-warm-gray-light/20">
              <button
                type="button"
                onClick={handleQuickWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-[#25D366] text-white font-medium hover:bg-[#20BD5A] transition-all shadow-md"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat on WhatsApp Directly</span>
              </button>
              <span className="text-[11px] text-[#77716B] text-center block mt-2">
                Fastest way to get date availability & quick estimates
              </span>
            </div>
          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-warm-gray-light/20 shadow-md">
            <h3 className="font-heading text-2xl font-bold text-[#292725] mb-2">
              Send an Enquiry Note
            </h3>
            <p className="text-sm text-[#77716B] mb-6">
              Fill in your details below and we will connect with you via WhatsApp or phone.
            </p>

            {submitted ? (
              <div className="bg-[#FAF8F3] border border-[#EBE7DF] rounded-2xl p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-heading text-xl font-bold text-[#292725] mb-1">
                  Thank You, {name}!
                </h4>
                <p className="text-sm text-[#77716B] mb-4">
                  Your enquiry has been formatted and opened in WhatsApp. You can also send another message below.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#292725] text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                      Your Full Name <span className="text-[#B77C68]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Deshmukh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                      Mobile Number <span className="text-[#B77C68]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm text-[#77716B]">+91</span>
                      <input
                        type="tel"
                        required
                        placeholder="98XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                    Celebration Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm bg-white"
                  >
                    <option value="Birthday Celebration">Birthday Celebration (Kids / Adults)</option>
                    <option value="Engagement & Ring Ceremony">Engagement & Ring Ceremony</option>
                    <option value="Wedding & Mandap Decor">Wedding & Mandap Decor</option>
                    <option value="Reception Stage Decoration">Reception Stage Decoration</option>
                    <option value="Baby Shower / Naming Ceremony">Baby Shower / Naming Ceremony</option>
                    <option value="Anniversary & Family Function">Anniversary & Family Function</option>
                    <option value="Other Customized Celebration">Other Customized Celebration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                    Message or Questions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us your celebration date, venue location in Navi Mumbai, or any specific theme ideas..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#292725] hover:bg-black text-white font-medium text-sm transition-all shadow-md"
                >
                  <Send className="w-4 h-4 text-[#C5A46D]" />
                  <span>Submit & Connect on WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
