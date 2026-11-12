import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, Sparkles, X, ShieldCheck } from 'lucide-react';
import { useAdminPackages } from '@/hooks/useSupabase';
import { formatCurrency } from '@/utils/format';
import type { Package } from '@/types';

export function AdminPackagesPage() {
  const { packages, savePackage, deletePackage, loading } = useAdminPackages();
  const [editingPkg, setEditingPkg] = useState<Partial<Package> | null>(null);
  const [newInclusionText, setNewInclusionText] = useState('');

  const handleCreateNew = () => {
    setEditingPkg({
      id: `pkg-${Date.now()}`,
      name: '',
      slug: '',
      description: '',
      short_description: '',
      price: 1500,
      category: 'birthday',
      is_popular: false,
      is_active: true,
      sort_order: packages.length + 1,
      inclusions: [
        { id: `inc-${Date.now()}-1`, package_id: '', item_name: 'Balloon decoration set', quantity: '1 set', sort_order: 1, is_active: true },
        { id: `inc-${Date.now()}-2`, package_id: '', item_name: 'Happy Birthday Banner', quantity: '1', sort_order: 2, is_active: true },
      ],
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg || !editingPkg.name) return;

    await savePackage({
      ...editingPkg,
      slug: editingPkg.slug || editingPkg.name.toLowerCase().replace(/\s+/g, '-'),
    });
    setEditingPkg(null);
  };

  const handleAddInclusion = () => {
    if (!newInclusionText.trim() || !editingPkg) return;
    const newInc = {
      id: `inc-${Date.now()}`,
      package_id: editingPkg.id || '',
      item_name: newInclusionText.trim(),
      quantity: 'Included',
      sort_order: (editingPkg.inclusions?.length || 0) + 1,
      is_active: true,
    };
    setEditingPkg({
      ...editingPkg,
      inclusions: [...(editingPkg.inclusions || []), newInc],
    });
    setNewInclusionText('');
  };

  const handleRemoveInclusion = (incId: string) => {
    if (!editingPkg) return;
    setEditingPkg({
      ...editingPkg,
      inclusions: (editingPkg.inclusions || []).filter((i) => i.id !== incId),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-1">
            Pricing Configuration
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725]">
            Package Management
          </h1>
          <p className="text-xs sm:text-sm text-[#77716B]">
            Create and edit fixed birthday celebration packages and their respective inclusions.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292725] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#C5A46D]" />
          <span>Create New Package</span>
        </button>
      </div>

      {/* Package List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col justify-between transition-all ${
              pkg.is_popular ? 'border-[#C5A46D] ring-2 ring-[#C5A46D]/15' : 'border-gray-200'
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-xl font-bold text-[#292725]">
                      {pkg.name}
                    </h3>
                    {pkg.is_popular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C5A46D]/15 text-[#B08F56] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#77716B]">{pkg.slug}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingPkg(pkg)}
                    className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                    title="Edit Package"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deletePackage(pkg.id)}
                    className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                    title="Deactivate"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#77716B] mb-6">
                {pkg.description}
              </p>

              {/* Price display */}
              <div className="mb-6 p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DF] flex justify-between items-center">
                <span className="text-xs font-semibold text-[#77716B] uppercase">Base Price</span>
                <span className="font-heading text-3xl font-bold text-[#292725]">
                  {formatCurrency(pkg.price)}
                </span>
              </div>

              {/* Inclusions */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#292725] block mb-3">
                  Configured Inclusions ({pkg.inclusions?.length || 0})
                </span>
                <ul className="space-y-2">
                  {(pkg.inclusions || []).map((inc) => (
                    <li key={inc.id} className="flex items-center gap-2 text-xs text-[#292725]">
                      <Check className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                      <span>{inc.item_name}</span>
                      {inc.quantity && (
                        <span className="text-[#77716B]">({inc.quantity})</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#77716B]">
              <span>Status: <strong className={pkg.is_active ? 'text-emerald-600' : 'text-red-500'}>{pkg.is_active ? 'Active' : 'Disabled'}</strong></span>
              <span>Category: {pkg.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-100">
              <h3 className="font-heading text-xl font-bold text-[#292725]">
                {editingPkg.name ? `Edit: ${editingPkg.name}` : 'Create New Package'}
              </h3>
              <button onClick={() => setEditingPkg(null)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                    Package Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Basic Celebration"
                    value={editingPkg.name || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                    Price (₹ INR)
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editingPkg.price || 0}
                    onChange={(e) => setEditingPkg({ ...editingPkg, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                  Full Description
                </label>
                <textarea
                  rows={2}
                  value={editingPkg.description || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
                />
              </div>

              <div className="flex items-center gap-6 py-2">
                <label className="flex items-center gap-2 text-xs font-medium text-[#292725] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.is_popular || false}
                    onChange={(e) => setEditingPkg({ ...editingPkg, is_popular: e.target.checked })}
                    className="w-4 h-4 rounded text-[#C5A46D] focus:ring-[#C5A46D]"
                  />
                  <span>Mark as "Most Popular"</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-[#292725] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.is_active !== false}
                    onChange={(e) => setEditingPkg({ ...editingPkg, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-[#C5A46D] focus:ring-[#C5A46D]"
                  />
                  <span>Active & Visible</span>
                </label>
              </div>

              {/* Inclusions manager inside modal */}
              <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-2">
                  Package Inclusions
                </label>
                <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                  {(editingPkg.inclusions || []).map((inc) => (
                    <div key={inc.id} className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F3] border border-gray-200 text-xs">
                      <span>{inc.item_name} {inc.quantity && `(${inc.quantity})`}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveInclusion(inc.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an item (e.g. 50 Pastel Balloons, LED Lights)..."
                    value={newInclusionText}
                    onChange={(e) => setNewInclusionText(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                  />
                  <button
                    type="button"
                    onClick={handleAddInclusion}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-semibold text-gray-800"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingPkg(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#292725] text-white text-xs font-semibold hover:bg-black"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
