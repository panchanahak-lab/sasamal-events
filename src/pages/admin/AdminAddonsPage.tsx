import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, X } from 'lucide-react';
import { useAdminAddons } from '@/hooks/useSupabase';
import { formatCurrency } from '@/utils/format';
import type { Addon } from '@/types';

export function AdminAddonsPage() {
  const { addons, saveAddon, deleteAddon } = useAdminAddons();
  const [editingAddon, setEditingAddon] = useState<Partial<Addon> | null>(null);

  const handleCreate = () => {
    setEditingAddon({
      id: `addon-${Date.now()}`,
      name: '',
      price: 150,
      category: 'balloons',
      max_quantity: 5,
      is_active: true,
      sort_order: addons.length + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddon || !editingAddon.name) return;
    await saveAddon(editingAddon);
    setEditingAddon(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-1">
            Modular Decoration Inventory
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725]">
            Add-on Management
          </h1>
          <p className="text-xs sm:text-sm text-[#77716B]">
            Configure modular decoration add-ons and their prices shown in the interactive customer calculator.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292725] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#C5A46D]" />
          <span>Add New Decoration Item</span>
        </button>
      </div>

      {/* Add-ons Table */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#FAF8F3] border-b border-gray-200 text-[#77716B] uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-4 px-6">Item Name</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Unit Price</th>
                <th className="py-4 px-6">Max Qty</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {addons.map((addon) => (
                <tr key={addon.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#292725]">
                    {addon.name}
                  </td>
                  <td className="py-4 px-6 text-[#77716B] uppercase text-xs">
                    {addon.category}
                  </td>
                  <td className="py-4 px-6 font-bold text-[#292725] font-heading text-base">
                    {formatCurrency(addon.price)}
                  </td>
                  <td className="py-4 px-6 text-[#77716B]">
                    Up to {addon.max_quantity} units
                  </td>
                  <td className="py-4 px-6">
                    {addon.is_active ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium">
                        <XCircle className="w-3.5 h-3.5" />
                        Disabled
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingAddon(addon)}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteAddon(addon.id)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                        title="Deactivate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {editingAddon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl">
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-100">
              <h3 className="font-heading text-xl font-bold text-[#292725]">
                {editingAddon.name ? `Edit: ${editingAddon.name}` : 'New Decoration Add-on'}
              </h3>
              <button onClick={() => setEditingAddon(null)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Extra Balloons (pack of 25)"
                  value={editingAddon.name || ''}
                  onChange={(e) => setEditingAddon({ ...editingAddon, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editingAddon.price || 0}
                    onChange={(e) => setEditingAddon({ ...editingAddon, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                    Max Allowed Qty
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingAddon.max_quantity || 5}
                    onChange={(e) => setEditingAddon({ ...editingAddon, max_quantity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                  Category
                </label>
                <select
                  value={editingAddon.category || 'balloons'}
                  onChange={(e) => setEditingAddon({ ...editingAddon, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#C5A46D] outline-none bg-white"
                >
                  <option value="balloons">Balloons</option>
                  <option value="lighting">Lighting & LEDs</option>
                  <option value="backdrop">Backdrop & Banners</option>
                  <option value="flowers">Flowers & Greenery</option>
                  <option value="props">Props & Cutouts</option>
                </select>
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id="addon-active"
                  checked={editingAddon.is_active !== false}
                  onChange={(e) => setEditingAddon({ ...editingAddon, is_active: e.target.checked })}
                  className="w-4 h-4 rounded text-[#C5A46D] focus:ring-[#C5A46D]"
                />
                <label htmlFor="addon-active" className="text-xs font-medium text-[#292725] cursor-pointer">
                  Item is active and selectable in customer calculator
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingAddon(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#292725] text-white text-xs font-semibold hover:bg-black"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
