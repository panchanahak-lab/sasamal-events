import React, { useState } from 'react';
import { Save, CheckCircle2, Phone, MessageSquare, Mail, MapPin, Globe } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { useAdminSettings } from '@/hooks/useSupabase';
import { useStore } from '@/stores/useStore';

export function AdminSettingsPage() {
  const { settings, saveSettings } = useAdminSettings();
  const { setSettings: setGlobalSettings } = useStore();

  const [form, setForm] = useState({
    company_name: settings.company_name || 'Sasamal Events',
    tagline: settings.tagline || 'Making Every Celebration Special',
    phone: settings.phone || '+91 XXXXX XXXXX',
    whatsapp: settings.whatsapp || '919999999999',
    email: settings.email || 'hello@sasamalevents.com',
    address: settings.address || 'Navi Mumbai',
    city: settings.city || 'Navi Mumbai',
    state: settings.state || 'Maharashtra',
    instagram_url: settings.instagram_url || 'https://instagram.com/sasamalevents',
    service_areas_text: (settings.service_areas || ['Navi Mumbai']).join(', '),
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...settings,
      company_name: form.company_name,
      tagline: form.tagline,
      phone: form.phone,
      whatsapp: form.whatsapp.replace(/\D/g, ''),
      email: form.email,
      address: form.address,
      city: form.city,
      state: form.state,
      instagram_url: form.instagram_url,
      service_areas: form.service_areas_text.split(',').map((s) => s.trim()).filter(Boolean),
    };

    await saveSettings(updated);
    setGlobalSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-1">
          Brand & Global Identity
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725]">
          Business Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#77716B]">
          Update contact phone numbers, WhatsApp routing numbers, service coverage regions, and branding across the entire website.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Business settings updated and synced successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
        {/* Brand identity */}
        <div>
          <h3 className="font-heading text-lg font-bold text-[#292725] mb-4 pb-2 border-b border-gray-100">
            Brand Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                required
                value={form.company_name}
                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                Brand Tagline
              </label>
              <input
                type="text"
                required
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact routing */}
        <div>
          <h3 className="font-heading text-lg font-bold text-[#292725] mb-4 pb-2 border-b border-gray-100">
            Contact & WhatsApp Routing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                Display Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#77716B] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="+91 98XXXXXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                WhatsApp Chat Number (with 91)
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="9198XXXXXXXX"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
                />
              </div>
              <span className="text-[10px] text-[#77716B] mt-1 block">
                All WhatsApp buttons route enquiries here.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                Official Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#77716B] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location & Social */}
        <div>
          <h3 className="font-heading text-lg font-bold text-[#292725] mb-4 pb-2 border-b border-gray-100">
            Location & Social Media
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                Registered Address / City
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#77716B] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                Instagram URL
              </label>
              <div className="relative">
                <InstagramIcon className="w-4 h-4 text-[#77716B] absolute left-3 top-3" />
                <input
                  type="url"
                  placeholder="https://instagram.com/sasamalevents"
                  value={form.instagram_url}
                  onChange={(e) => setForm({ ...form, instagram_url: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
                Service Areas (Comma separated)
              </label>
              <input
                type="text"
                value={form.service_areas_text}
                onChange={(e) => setForm({ ...form, service_areas_text: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
              />
              <span className="text-[10px] text-[#77716B] mt-1 block">
                e.g. Navi Mumbai, Vashi, Kharghar, Nerul, Belapur, Seawoods, Panvel
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#292725] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
          >
            <Save className="w-4 h-4 text-[#C5A46D]" />
            <span>Save All Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
