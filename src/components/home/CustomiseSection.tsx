import React, { useState } from 'react';
import { Plus, Minus, Check, Sparkles, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useStore } from '@/stores/useStore';
import { formatCurrency } from '@/utils/format';
import { PackageBookingModal } from '@/components/booking/PackageBookingModal';

export function CustomiseSection() {
  const { packages, addons } = useStore();
  const [selectedPkgId, setSelectedPkgId] = useState<string>('pkg-basic');
  const [selectedAddonQtys, setSelectedAddonQtys] = useState<Record<string, number>>({
    'addon-1': 1, // Default pre-select extra balloons as example
    'addon-4': 1, // Default pre-select LED lights as example
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];

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
        [addonId]: Math.min(next, maxQty || 10),
      };
    });
  };

  const activeAddonsList = addons
    .filter((a) => selectedAddonQtys[a.id] > 0)
    .map((addon) => ({
      addon,
      quantity: selectedAddonQtys[addon.id],
    }));

  const basePrice = currentPkg?.price || 1500;
  const addonsTotal = activeAddonsList.reduce(
    (sum, item) => sum + item.addon.price * item.quantity,
    0
  );
  const estimatedTotal = basePrice + addonsTotal;

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F3]" id="customise">
      <Container>
        <SectionHeading
          subtitle="Interactive Calculator"
          title="Customise Your Decoration"
          description="Build your own celebration package with complete transparency. Select a base package, add your preferred decoration items, and see instant price calculations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Selectors (8 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Choose Package */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-warm-gray-light/20 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#C5A46D] block">
                    Step 1
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#292725]">
                    Select Base Package
                  </h3>
                </div>
                <span className="text-xs text-[#77716B]">Click to switch</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {packages.map((pkg) => {
                  const isSelected = selectedPkgId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`relative p-5 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-[#C5A46D] bg-[#FAF8F3] shadow-md ring-2 ring-[#C5A46D]/20'
                          : 'border-warm-gray-light/30 bg-white hover:border-warm-gray-light'
                      }`}
                    >
                      {pkg.is_popular && (
                        <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#C5A46D] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-2.5 h-2.5" />
                          Most Popular
                        </span>
                      )}
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-heading text-lg font-bold text-[#292725]">
                          {pkg.name}
                        </h4>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-[#C5A46D] bg-[#C5A46D]'
                              : 'border-warm-gray-light'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      <p className="text-xs text-[#77716B] mb-4 leading-relaxed">
                        {pkg.short_description || pkg.description}
                      </p>
                      <div className="text-2xl font-bold text-[#292725] font-heading">
                        {formatCurrency(pkg.price)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Choose Add-ons */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-warm-gray-light/20 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#C5A46D] block">
                    Step 2
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#292725]">
                    Enhance with Optional Add-ons
                  </h3>
                </div>
                <span className="text-xs text-[#77716B]">Add extra charm</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addons.map((addon) => {
                  const qty = selectedAddonQtys[addon.id] || 0;
                  const isSelected = qty > 0;

                  return (
                    <div
                      key={addon.id}
                      className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#C5A46D]/60 bg-[#FAF8F3] shadow-sm'
                          : 'border-warm-gray-light/25 bg-white hover:border-warm-gray-light/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-start gap-2.5">
                          <input
                            type="checkbox"
                            id={`addon-${addon.id}`}
                            checked={isSelected}
                            onChange={() => handleToggleAddon(addon.id)}
                            className="w-4 h-4 mt-0.5 text-[#C5A46D] rounded border-warm-gray-light focus:ring-[#C5A46D] cursor-pointer"
                          />
                          <label
                            htmlFor={`addon-${addon.id}`}
                            className="text-xs sm:text-sm font-semibold text-[#292725] cursor-pointer leading-tight"
                          >
                            {addon.name}
                          </label>
                        </div>
                        <span className="text-xs font-bold text-[#C5A46D] shrink-0 font-heading">
                          +{formatCurrency(addon.price)}
                        </span>
                      </div>

                      {/* Quantity control */}
                      {isSelected && (
                        <div className="flex items-center justify-between pt-2 border-t border-[#EBE7DF]">
                          <span className="text-[11px] text-[#77716B]">Qty:</span>
                          <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-lg border border-warm-gray-light/30">
                            <button
                              type="button"
                              onClick={() => handleQtyChange(addon.id, -1, addon.max_quantity)}
                              className="p-1 text-[#77716B] hover:text-[#292725] transition-colors"
                              title="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[#292725] w-5 text-center">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQtyChange(addon.id, 1, addon.max_quantity)}
                              className="p-1 text-[#77716B] hover:text-[#292725] transition-colors"
                              title="Increase"
                            >
                              <Plus className="w-3 h-3" />
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

          {/* Right Column: Live Summary & Action (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C5A46D]/30 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-5 h-5 text-[#C5A46D]" />
                <h3 className="font-heading text-xl font-bold text-[#292725]">
                  Order Calculation
                </h3>
              </div>
              <p className="text-xs text-[#77716B] mb-6">
                Real-time breakdown of your selected decoration arrangement.
              </p>

              {/* Breakdown */}
              <div className="space-y-3 pb-6 border-b border-warm-gray-light/20">
                <div className="flex justify-between items-center text-sm font-medium text-[#292725]">
                  <span>{currentPkg.name}</span>
                  <span className="font-bold">{formatCurrency(currentPkg.price)}</span>
                </div>

                {activeAddonsList.length > 0 ? (
                  <div className="space-y-2 pt-2 border-t border-dashed border-warm-gray-light/30">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#77716B] block">
                      Selected Add-ons ({activeAddonsList.length})
                    </span>
                    {activeAddonsList.map((item) => (
                      <div
                        key={item.addon.id}
                        className="flex justify-between items-center text-xs text-[#77716B]"
                      >
                        <span className="pr-2">
                          • {item.addon.name} <span className="text-[#C5A46D] font-bold">(x{item.quantity})</span>
                        </span>
                        <span className="font-medium text-[#292725] shrink-0">
                          {formatCurrency(item.addon.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-[#77716B] italic pt-1">
                    No optional add-ons selected yet.
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="py-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#77716B]">
                    Estimated Total
                  </span>
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-[#292725]">
                    {formatCurrency(estimatedTotal)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#77716B] bg-[#FAF8F3] p-2.5 rounded-xl border border-[#EBE7DF]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span>
                    Total Price = Base Package + Selected Add-ons. Zero hidden charges.
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#292725] hover:bg-black text-white font-medium text-sm transition-all shadow-lg hover:shadow-xl group"
              >
                Proceed to Book Package
                <ArrowRight className="w-4 h-4 text-[#C5A46D] group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] text-center text-[#77716B] mt-4">
                * Note: Final booking is subject to availability and date confirmation.
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
