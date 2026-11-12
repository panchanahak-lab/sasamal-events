import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useSubmitEnquiry } from '@/hooks/useSupabase';
import { formatCurrency, generateReferenceNumber, isValidIndianPhone } from '@/utils/format';
import { openWhatsApp, generatePackageWhatsAppMessage } from '@/utils/whatsapp';
import type { BookingFormData, Package } from '@/types';

interface PackageBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackage?: Package | null;
}

export function PackageBookingModal({
  isOpen,
  onClose,
  preselectedPackage,
}: PackageBookingModalProps) {
  const { packages, addons, settings } = useStore();
  const { submitEnquiry, loading } = useSubmitEnquiry();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPkgId, setSelectedPkgId] = useState<string>(
    preselectedPackage?.id || packages[0]?.id || 'pkg-basic'
  );

  // Local state for add-on selections: addonId -> quantity
  const [selectedAddonQtys, setSelectedAddonQtys] = useState<Record<string, number>>({});

  // Customer form details
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('16:00');
  const [eventLocation, setEventLocation] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successReference, setSuccessReference] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];

  // Helper functions for add-on quantities
  const handleAddonToggle = (addonId: string) => {
    setSelectedAddonQtys((prev) => {
      const copy = { ...prev };
      if (copy[addonId]) {
        delete copy[addonId];
      } else {
        copy[addonId] = 1;
      }
      return copy;
    });
  };

  const handleQtyChange = (addonId: string, delta: number, maxQty: number) => {
    setSelectedAddonQtys((prev) => {
      const current = prev[addonId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[addonId];
        return copy;
      }
      return {
        ...prev,
        [addonId]: Math.min(next, maxQty || 10),
      };
    });
  };

  // Calculations
  const activeAddonsList = addons
    .filter((a) => selectedAddonQtys[a.id] > 0)
    .map((addon) => ({
      addon,
      quantity: selectedAddonQtys[addon.id],
    }));

  const addonsTotal = activeAddonsList.reduce(
    (sum, item) => sum + item.addon.price * item.quantity,
    0
  );

  const basePrice = currentPkg?.price || 0;
  const estimatedTotal = basePrice + addonsTotal;

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.name = 'Please enter your name';
    if (!phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (!isValidIndianPhone(phone)) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!eventDate) errs.date = 'Please select the celebration date';
    if (!eventLocation.trim()) errs.location = 'Please provide the Navi Mumbai location / area';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const refNum = generateReferenceNumber();

    const bookingData: BookingFormData = {
      customerName,
      phone,
      eventDate,
      eventTime,
      eventLocation,
      packageId: currentPkg.id,
      packageName: currentPkg.name,
      packagePrice: currentPkg.price,
      selectedAddons: activeAddonsList,
      addonsTotal,
      estimatedTotal,
      additionalRequirements: notes,
    };

    const payload = {
      reference_number: refNum,
      customer_name: customerName,
      phone,
      event_category: 'Birthday Celebration',
      event_date: eventDate,
      event_time: eventTime,
      event_location: eventLocation,
      package_id: currentPkg.id,
      package_name: currentPkg.name,
      package_price: currentPkg.price,
      addons_total: addonsTotal,
      estimated_total: estimatedTotal,
      additional_notes: notes,
      enquiry_type: 'package' as const,
      status: 'new' as const,
      enquiry_addons: activeAddonsList.map((item) => ({
        id: '',
        enquiry_id: '',
        addon_id: item.addon.id,
        addon_name: item.addon.name,
        quantity: item.quantity,
        unit_price: item.addon.price,
        total_price: item.addon.price * item.quantity,
      })),
    };

    const res = await submitEnquiry(payload);
    if (res.success) {
      setSuccessReference(refNum);
    }
  };

  const handleOpenWhatsApp = () => {
    const bookingData: BookingFormData = {
      customerName,
      phone,
      eventDate,
      eventTime,
      eventLocation,
      packageId: currentPkg.id,
      packageName: currentPkg.name,
      packagePrice: currentPkg.price,
      selectedAddons: activeAddonsList,
      addonsTotal,
      estimatedTotal,
      additionalRequirements: notes,
    };
    const msg = generatePackageWhatsAppMessage(bookingData);
    openWhatsApp(settings.whatsapp, msg);
  };

  const resetAndClose = () => {
    setStep(1);
    setSuccessReference(null);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-warm-gray-light/20 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#FAF8F3] px-6 sm:px-8 py-5 border-b border-[#EBE7DF] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#C5A46D]">
              Direct Birthday Booking
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#292725]">
              {step === 1 ? 'Configure Package & Add-ons' : 'Customer & Event Details'}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#77716B] transition-colors"
          >
            <X className="w-5 h-5" />
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
                Booking Enquiry Placed!
              </h3>
              <p className="text-sm text-[#77716B] max-w-md mx-auto mb-4">
                We have registered your enquiry for <strong>{currentPkg.name}</strong>.
              </p>

              <div className="bg-[#FAF8F3] border border-[#EBE7DF] rounded-2xl p-4 max-w-md mx-auto mb-6 text-left">
                <div className="flex justify-between items-center text-xs text-[#77716B] mb-2 pb-2 border-b border-[#EBE7DF]">
                  <span>Reference ID</span>
                  <span className="font-bold text-[#292725]">{successReference}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Base Package:</span>
                  <span className="font-medium">{formatCurrency(currentPkg.price)}</span>
                </div>
                {activeAddonsList.map((item) => (
                  <div key={item.addon.id} className="flex justify-between text-xs text-[#77716B] py-0.5">
                    <span>• {item.addon.name} (x{item.quantity})</span>
                    <span>{formatCurrency(item.addon.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-base text-[#292725] pt-2 mt-2 border-t border-[#EBE7DF]">
                  <span>Estimated Total:</span>
                  <span className="text-[#C5A46D]">{formatCurrency(estimatedTotal)}</span>
                </div>
                <p className="text-[11px] text-[#77716B] mt-2 italic">
                  * Note: Booking is subject to date availability and confirmation by Sasamal Events.
                </p>
              </div>

              <div className="space-y-3 max-w-md mx-auto">
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#20BD5A] transition-all shadow-md"
                >
                  <MessageSquare className="w-5 h-5" />
                  Send Booking Summary to WhatsApp
                </button>
                <button
                  onClick={resetAndClose}
                  className="w-full py-2.5 px-6 rounded-xl border border-warm-gray-light text-[#77716B] text-sm hover:bg-[#FAF8F3]"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            <div className="space-y-6">
              {/* Step 1: Choose base package */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-3">
                  Step 1: Select Base Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {packages.map((pkg) => {
                    const isSelected = selectedPkgId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPkgId(pkg.id)}
                        className={`p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                          isSelected
                            ? 'border-[#C5A46D] bg-[#FAF8F3] shadow-md'
                            : 'border-warm-gray-light/30 bg-white hover:border-warm-gray-light'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-heading text-lg font-bold text-[#292725]">
                            {pkg.name}
                          </h4>
                          {pkg.is_popular && (
                            <span className="px-2 py-0.5 rounded-full bg-[#C5A46D]/15 text-[#B08F56] text-[10px] font-bold uppercase">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#77716B] mb-3 line-clamp-2">
                          {pkg.short_description || pkg.description}
                        </p>
                        <div className="text-xl font-bold text-[#292725]">
                          {formatCurrency(pkg.price)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select optional Add-ons */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725]">
                    Step 2: Choose Optional Add-ons
                  </label>
                  <span className="text-xs text-[#77716B]">Prices are item-based</span>
                </div>

                <div className="space-y-2.5">
                  {addons.map((addon) => {
                    const qty = selectedAddonQtys[addon.id] || 0;
                    const isSelected = qty > 0;

                    return (
                      <div
                        key={addon.id}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-[#C5A46D]/50 bg-[#FAF8F3]'
                            : 'border-warm-gray-light/20 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleAddonToggle(addon.id)}
                            className="w-4 h-4 text-[#C5A46D] rounded border-warm-gray-light focus:ring-[#C5A46D]"
                          />
                          <div>
                            <span className="text-sm font-medium text-[#292725] block">
                              {addon.name}
                            </span>
                            <span className="text-xs text-[#C5A46D] font-medium">
                              +{formatCurrency(addon.price)} each
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-warm-gray-light/30">
                            <button
                              type="button"
                              onClick={() => handleQtyChange(addon.id, -1, addon.max_quantity)}
                              className="p-1 text-[#77716B] hover:text-[#292725]"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-[#292725] w-5 text-center">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQtyChange(addon.id, 1, addon.max_quantity)}
                              className="p-1 text-[#77716B] hover:text-[#292725]"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="bg-[#FAF8F3] border border-[#EBE7DF] rounded-2xl p-4">
                <div className="flex justify-between text-sm mb-1 text-[#77716B]">
                  <span>{currentPkg.name}</span>
                  <span>{formatCurrency(currentPkg.price)}</span>
                </div>
                {activeAddonsList.map((item) => (
                  <div key={item.addon.id} className="flex justify-between text-xs text-[#77716B] py-0.5">
                    <span>
                      + {item.addon.name} (x{item.quantity})
                    </span>
                    <span>{formatCurrency(item.addon.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-baseline font-bold text-lg text-[#292725] pt-2 mt-2 border-t border-[#EBE7DF]">
                  <span>Estimated Total:</span>
                  <span className="text-[#C5A46D] font-heading text-2xl">
                    {formatCurrency(estimatedTotal)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#77716B] mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>No hidden charges. Clear and transparent pricing.</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-5 py-2.5 text-sm text-[#77716B] hover:bg-[#FAF8F3] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#292725] text-white hover:bg-black font-medium text-sm transition-all shadow-md"
                >
                  Next: Enter Details
                  <ArrowRight className="w-4 h-4 text-[#C5A46D]" />
                </button>
              </div>
            </div>
          ) : (
            /* Step 2: Customer Details */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1">
                    Your Name <span className="text-[#B77C68]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Patel"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1">
                    Mobile / WhatsApp <span className="text-[#B77C68]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm text-[#77716B]">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="98XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1">
                    Celebration Date <span className="text-[#B77C68]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm bg-white"
                  />
                  {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1">
                    Preferred Setup Time
                  </label>
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1">
                  Navi Mumbai Area & Address <span className="text-[#B77C68]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sector 19, Kharghar / Seawoods / Vashi"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm"
                />
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292725] uppercase tracking-wider mb-1">
                  Specific Notes / Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Child's age, favourite colours, party theme, society gate restrictions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm"
                />
              </div>

              {/* Summary recap */}
              <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#EBE7DF] text-xs text-[#77716B] flex justify-between items-center">
                <span>
                  Booking: <strong>{currentPkg.name}</strong> + {activeAddonsList.length} Add-on(s)
                </span>
                <span className="font-bold text-sm text-[#292725]">{formatCurrency(estimatedTotal)}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#EBE7DF]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-medium text-[#77716B] hover:text-[#292725]"
                >
                  ← Back to Add-ons
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="px-4 py-2 text-sm text-[#77716B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-[#292725] text-white hover:bg-black font-medium text-sm transition-all shadow-md disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Confirm Enquiry'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
