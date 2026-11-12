import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ShieldCheck, Users, Phone, MapPin, X, IndianRupee } from 'lucide-react';
import { useAdminVendors } from '@/hooks/useSupabase';
import { formatCurrency } from '@/utils/format';
import type { Vendor } from '@/types';

const defaultVendorPlaceholders: Vendor[] = [
  {
    id: 'ven-1',
    name: 'Om Mandap & Floral Decorators',
    contact_number: '9820011223',
    location: 'Vashi / Nerul, Navi Mumbai',
    services_provided: ['Wedding Mandaps', 'Fresh Floral Styling', 'Haldi Setup'],
    base_quotation: 25000,
    commission_type: 'percentage',
    commission_value: 15,
    is_active: true,
    notes: 'Specializes in traditional marigold setups and dome mandaps for local community halls.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ven-2',
    name: 'Elegance Stage & Lighting Works',
    contact_number: '9819944556',
    location: 'Kharghar / Panvel, Navi Mumbai',
    services_provided: ['Reception Stages', 'LED Screen Framing', 'Couple Sofas'],
    base_quotation: 35000,
    commission_type: 'percentage',
    commission_value: 20,
    is_active: true,
    notes: 'Reliable team for modern trussing, light consoles, and pastel floral reception backdrops.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function AdminVendorsPage() {
  const { vendors: liveVendors, saveVendor, deleteVendor } = useAdminVendors();
  const vendors = liveVendors.length > 0 ? liveVendors : defaultVendorPlaceholders;

  const [editingVendor, setEditingVendor] = useState<Partial<Vendor> | null>(null);
  const [servicesInput, setServicesInput] = useState('');

  const handleCreate = () => {
    setEditingVendor({
      id: `ven-${Date.now()}`,
      name: '',
      contact_number: '',
      location: 'Navi Mumbai',
      services_provided: ['Wedding Mandaps', 'Reception Stages'],
      base_quotation: 20000,
      commission_type: 'percentage',
      commission_value: 15,
      is_active: true,
      notes: '',
    });
    setServicesInput('Wedding Mandaps, Reception Stages');
  };

  const handleEdit = (v: Vendor) => {
    setEditingVendor(v);
    setServicesInput((v.services_provided || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVendor || !editingVendor.name) return;

    const parsedServices = servicesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    await saveVendor({
      ...editingVendor,
      services_provided: parsedServices,
    });
    setEditingVendor(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-1">
            Model B Partner Network
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725]">
            Vendor Management
          </h1>
          <p className="text-xs sm:text-sm text-[#77716B]">
            Maintain your confidential database of Navi Mumbai decorators, mandap fabricators, base quotations, and profit margins.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292725] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#C5A46D]" />
          <span>Add Decor Vendor</span>
        </button>
      </div>

      {/* Internal Security Alert */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-800">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Strict Confidentiality Rule:</strong> All vendor contacts, base quotations, and agreed Sasamal commission percentages are private back-office data. They must never be published or exposed to public visitors.
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vendors.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#292725]">
                    {v.name}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-[#77716B] mt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#C5A46D]" />
                      +91 {v.contact_number}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                      {v.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(v)}
                    className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-50"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteVendor(v.id)}
                    className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Services Provided pills */}
              <div className="mb-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77716B] block mb-2">
                  Services Covered
                </span>
                <div className="flex flex-wrap gap-2">
                  {(v.services_provided || []).map((svc, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-[#FAF8F3] border border-gray-200 text-xs font-medium text-[#292725]"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Commission & Base Pricing Box */}
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DF] grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#77716B] block">Base Quotation</span>
                  <span className="font-heading text-xl font-bold text-[#292725]">
                    {formatCurrency(v.base_quotation || 0)}
                  </span>
                </div>
                <div>
                  <span className="text-[#77716B] block">Sasamal Margin</span>
                  <span className="font-heading text-xl font-bold text-[#C5A46D]">
                    {v.commission_value || 15}% Margin
                  </span>
                </div>
              </div>

              {v.notes && (
                <p className="mt-4 text-xs text-[#77716B] italic">
                  Note: {v.notes}
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#77716B]">
              <span>Status: <strong className="text-emerald-600">Active Partner</strong></span>
              <span>Navi Mumbai Network</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingVendor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl">
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-100">
              <h3 className="font-heading text-xl font-bold text-[#292725]">
                {editingVendor.name ? `Edit: ${editingVendor.name}` : 'Add Decor Partner'}
              </h3>
              <button onClick={() => setEditingVendor(null)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-[#292725] mb-1">
                  Vendor Business Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Stage Fabricators"
                  value={editingVendor.name || ''}
                  onChange={(e) => setEditingVendor({ ...editingVendor, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#292725] mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    value={editingVendor.contact_number || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, contact_number: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[#292725] mb-1">
                    Location Area
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vashi / Kharghar"
                    value={editingVendor.location || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, location: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#292725] mb-1">
                  Services Provided (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Wedding Mandaps, Reception Stages, Floral Walls"
                  value={servicesInput}
                  onChange={(e) => setServicesInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#292725] mb-1">
                    Base Quotation (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editingVendor.base_quotation || 0}
                    onChange={(e) => setEditingVendor({ ...editingVendor, base_quotation: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[#292725] mb-1">
                    Agreed Margin (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={editingVendor.commission_value || 15}
                    onChange={(e) => setEditingVendor({ ...editingVendor, commission_value: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#292725] mb-1">
                  Private Back-Office Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Payment preferences, warehouse address, vehicle transport availability..."
                  value={editingVendor.notes || ''}
                  onChange={(e) => setEditingVendor({ ...editingVendor, notes: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingVendor(null)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#292725] text-white font-semibold hover:bg-black"
                >
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
