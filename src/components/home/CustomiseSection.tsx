import React, { useState } from 'react';
import { Plus, Minus, Check, Sparkles, ArrowRight, ShieldCheck, ShoppingBag, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useStore } from '@/stores/useStore';
import { formatCurrency, getWhatsAppUrl } from '@/utils/format';
import { PackageBookingModal } from '@/components/booking/PackageBookingModal';
import type { Addon, Package } from '@/types';

const CEREMONY_TABS = [
  { id: 'all', label: 'All Celebrations', icon: '✨' },
  { id: 'birthday', label: 'Birthdays', icon: '🎂' },
  { id: 'ring-ceremony', label: 'Ring Ceremony', icon: '💍' },
  { id: 'haldi', label: 'Haldi & Mehendi', icon: '🌼' },
  { id: 'mandap', label: 'Wedding Mandap', icon: '🏛️' },
  { id: 'family', label: 'Family Functions', icon: '👨‍👩‍👧' },
  { id: 'private', label: 'Private Functions', icon: '❤️' },
];

const ADDON_CATEGORIES = [
  { id: 'all', label: 'All Add-ons' },
  { id: 'balloons', label: '🎈 Balloons & Letters' },
  { id: 'flowers', label: '🌸 Flowers & Garlands' },
  { id: 'props', label: '🪔 Props & Seating' },
  { id: 'lighting', label: '✨ Lights & Effects' },
];

export function CustomiseSection() {
  const { packages, addons, settings } = useStore();
  const [selectedCeremony, setSelectedCeremony] = useState<string>('birthday');
  const [selectedPkgId, setSelectedPkgId] = useState<string>('pkg-birthday-standard');
  const [addonCategory, setAddonCategory] = useState<string>('all');
  const [selectedAddonQtys, setSelectedAddonQtys] = useState<Record<string, number>>({
    'addon-1': 1, // Preselect extra balloons (pack of 25)
    'addon-3': 5, // Preselect 5 letter balloons as demo
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter packages by active ceremony tab
  const filteredPackages = selectedCeremony === 'all'
    ? packages
    : packages.filter((p) => p.category === selectedCeremony);

  const currentPkg: Package = packages.find((p) => p.id === selectedPkgId) || filteredPackages[0] || packages[0];

  // Handle Ceremony Tab Switch
  const handleCeremonyChange = (ceremonyId: string) => {
    setSelectedCeremony(ceremonyId);
    const available = ceremonyId === 'all'
      ? packages
      : packages.filter((p) => p.category === ceremonyId);
    if (available.length > 0 && (!currentPkg || currentPkg.category !== ceremonyId)) {
      setSelectedPkgId(available[0].id);
    }
  };

  // Filter Add-ons by active category
  const filteredAddons = addonCategory === 'all'
    ? addons
    : addons.filter((a) => a.category === addonCategory);

  const handleToggleAddon = (addonId: string) => {
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
        [addonId]: Math.min(next, maxQty || 20),
      };
    });
  };

  const activeAddonsList = addons
    .filter((a) => selectedAddonQtys[a.id] > 0)
    .map((addon) => ({
      addon,
      quantity: selectedAddonQtys[addon.id],
    }));

  const basePrice = currentPkg?.price || 0;
  const addonsTotal = activeAddonsList.reduce(
    (sum, item) => sum + item.addon.price * item.quantity,
    0
  );
  const estimatedTotal = basePrice + addonsTotal;

  // WhatsApp Enquiry with Real-Time Breakdown
  const handleWhatsAppEnquiry = () => {
    const lines = [
      `*SASAMAL EVENTS – REAL-TIME CUSTOMIZED ESTIMATE*`,
      `------------------------------------------`,
      `*Selected Event:* ${currentPkg.name}`,
      `*Base Package:* ${formatCurrency(basePrice)}`,
    ];

    if (activeAddonsList.length > 0) {
      lines.push(`\n*Custom Add-ons:*`);
      activeAddonsList.forEach((item) => {
        lines.push(`• ${item.addon.name} (Qty: ${item.quantity}) - ${formatCurrency(item.addon.price * item.quantity)}`);
      });
      lines.push(`*Add-ons Subtotal:* ${formatCurrency(addonsTotal)}`);
    }

    lines.push(`------------------------------------------`);
    lines.push(`*Estimated Total:* ${formatCurrency(estimatedTotal)}`);
    lines.push(`\nHello Sasamal Events team, I configured this setup on your website and would like to confirm availability for my celebration.`);

    const url = getWhatsAppUrl(settings.whatsapp, lines.join('\n'));
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#C5A46D]/20" id="customise">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-px bg-[#C5A46D]/60" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6B1D2F]">
              Live Pricing Tool
            </span>
            <span className="w-8 h-px bg-[#C5A46D]/60" />
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#6B1D2F] tracking-tight mb-3">
            Real-Time Decoration Customizer
          </h2>
          <p className="text-sm sm:text-base text-[#77716B] leading-relaxed max-w-2xl mx-auto">
            Experience transparent pricing for any ceremony. Pick your occasion, select a base package, add or adjust balloon quantities, letter balloons, flower strings and lighting to see your real-time total instantly.
          </p>
        </div>

        {/* Ceremony Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
          {CEREMONY_TABS.map((tab) => {
            const isActive = selectedCeremony === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCeremonyChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 shadow-sm ${
                  isActive
                    ? 'bg-[#6B1D2F] text-white shadow-md scale-[1.02]'
                    : 'bg-white text-[#292725] hover:bg-[#F3EDE6] border border-[#C5A46D]/30'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Selectors (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Base Package Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C5A46D]/25 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-[#C5A46D] block">
                    Step 1
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#292725]">
                    Select Base Package
                  </h3>
                </div>
                <span className="text-xs text-[#77716B] font-medium">Click to select</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPackages.map((pkg) => {
                  const isSelected = currentPkg?.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`relative p-5 rounded-2xl cursor-pointer border-2 transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#6B1D2F] bg-[#FFF8F3] shadow-md ring-2 ring-[#6B1D2F]/20'
                          : 'border-warm-gray-light/30 bg-white hover:border-[#C5A46D]/60'
                      }`}
                    >
                      {pkg.is_popular && (
                        <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#6B1D2F] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-2.5 h-2.5" />
                          Most Popular
                        </span>
                      )}

                      <div>
                        <div className="flex items-start justify-between mb-1.5">
                          <h4 className="font-heading text-base sm:text-lg font-bold text-[#292725] pr-2">
                            {pkg.name}
                          </h4>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'border-[#6B1D2F] bg-[#6B1D2F]'
                                : 'border-warm-gray-light'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>

                        <p className="text-xs text-[#77716B] mb-3 line-clamp-2 leading-relaxed">
                          {pkg.short_description || pkg.description}
                        </p>

                        {/* Inclusions summary */}
                        <div className="space-y-1 mb-4 pt-2 border-t border-dashed border-gray-100">
                          {(pkg.inclusions || []).slice(0, 3).map((inc) => (
                            <div key={inc.id} className="text-[11px] text-[#544244] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />
                              <span className="truncate">{inc.item_name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#C5A46D]/20 flex items-baseline justify-between">
                        <span className="text-[11px] text-[#77716B]">Base Price:</span>
                        <span className="text-xl font-bold text-[#6B1D2F] font-heading">
                          {formatCurrency(pkg.price)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Custom Add-ons & Quantity Adjustments */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C5A46D]/25 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-[#C5A46D] block">
                    Step 2
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#292725]">
                    Customize Items &amp; Quantities
                  </h3>
                </div>
                <span className="text-xs text-[#77716B]">Add balloons, letters, lights &amp; props</span>
              </div>

              {/* Add-on Category Filter Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar">
                {ADDON_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setAddonCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      addonCategory === cat.id
                        ? 'bg-[#6B1D2F]/10 text-[#6B1D2F] font-bold border border-[#6B1D2F]/30'
                        : 'bg-[#FAF7F2] text-[#77716B] hover:text-[#292725]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Add-ons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredAddons.map((addon) => {
                  const qty = selectedAddonQtys[addon.id] || 0;
                  const isSelected = qty > 0;

                  return (
                    <div
                      key={addon.id}
                      className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#6B1D2F] bg-[#FFF8F3] shadow-sm'
                          : 'border-warm-gray-light/25 bg-white hover:border-[#C5A46D]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex items-start gap-2.5">
                          <input
                            type="checkbox"
                            id={`addon-${addon.id}`}
                            checked={isSelected}
                            onChange={() => handleToggleAddon(addon.id)}
                            className="w-4 h-4 mt-0.5 text-[#6B1D2F] rounded border-warm-gray-light focus:ring-[#6B1D2F] cursor-pointer"
                          />
                          <label
                            htmlFor={`addon-${addon.id}`}
                            className="text-xs sm:text-sm font-semibold text-[#292725] cursor-pointer leading-tight"
                          >
                            {addon.name}
                          </label>
                        </div>
                        <span className="text-xs font-bold text-[#6B1D2F] shrink-0 font-heading">
                          +{formatCurrency(addon.price)}
                        </span>
                      </div>

                      {/* Quantity Controls (Active when selected) */}
                      {isSelected && (
                        <div className="flex items-center justify-between pt-2.5 border-t border-[#EBE7DF] mt-1">
                          <span className="text-[11px] text-[#77716B] font-medium">Quantity:</span>
                          <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-lg border border-warm-gray-light/40 shadow-xs">
                            <button
                              type="button"
                              onClick={() => handleQtyChange(addon.id, -1, addon.max_quantity)}
                              className="p-1 text-[#77716B] hover:text-[#6B1D2F] transition-colors"
                              title="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-[#292725] w-6 text-center font-mono">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQtyChange(addon.id, 1, addon.max_quantity)}
                              className="p-1 text-[#77716B] hover:text-[#6B1D2F] transition-colors"
                              title="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Order Calculation Sticky Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C5A46D]/35 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-5 h-5 text-[#6B1D2F]" />
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#292725]">
                  Real-Time Estimate
                </h3>
              </div>
              <p className="text-xs text-[#77716B] mb-5">
                Instant price calculation based on your selected package and quantities.
              </p>

              {/* Itemized Calculation Breakdown */}
              <div className="space-y-3 pb-5 border-b border-warm-gray-light/20">
                {/* Base Package Line */}
                <div className="flex justify-between items-center text-sm font-semibold text-[#292725]">
                  <span>{currentPkg?.name || 'Selected Package'}</span>
                  <span className="font-bold text-[#6B1D2F] font-heading">{formatCurrency(basePrice)}</span>
                </div>

                {/* Selected Add-ons Line Items */}
                {activeAddonsList.length > 0 ? (
                  <div className="space-y-2 pt-2.5 border-t border-dashed border-warm-gray-light/30">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#77716B] block">
                      Custom Add-ons ({activeAddonsList.length})
                    </span>
                    {activeAddonsList.map((item) => (
                      <div
                        key={item.addon.id}
                        className="flex justify-between items-center text-xs text-[#544244]"
                      >
                        <span className="pr-2">
                          • {item.addon.name} <span className="text-[#6B1D2F] font-bold">(x{item.quantity})</span>
                        </span>
                        <span className="font-semibold text-[#292725] shrink-0">
                          {formatCurrency(item.addon.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-[#77716B] italic pt-1">
                    No add-ons selected. Add items on the left to customize.
                  </div>
                )}
              </div>

              {/* Live Total Display */}
              <div className="py-5">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-bold tracking-wider uppercase text-[#77716B]">
                    Calculated Total
                  </span>
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-[#6B1D2F]">
                    {formatCurrency(estimatedTotal)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#77716B] bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EBE7DF]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span>
                    Exact price calculation in real time. Zero hidden charges.
                  </span>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#6B1D2F] hover:bg-[#521321] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg group"
                >
                  <span>Proceed to Book Package</span>
                  <ArrowRight className="w-4 h-4 text-[#F6BD38] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm transition-all shadow-sm hover:shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Share Estimate on WhatsApp</span>
                </button>
              </div>

              <p className="text-[10.5px] text-center text-[#77716B] mt-3">
                * Real-time estimate for Navi Mumbai locations. Date confirmation required.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Package Booking Modal */}
      <PackageBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedPackage={currentPkg}
      />
    </section>
  );
}
