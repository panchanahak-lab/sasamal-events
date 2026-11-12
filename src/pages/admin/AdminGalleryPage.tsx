import React, { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff, Upload, X } from 'lucide-react';
import { useAdminGallery } from '@/hooks/useSupabase';
import type { GalleryImage } from '@/types';

const categories = [
  { value: 'birthday', label: 'Birthday Celebrations' },
  { value: 'engagement', label: 'Engagement & Ring Ceremony' },
  { value: 'wedding', label: 'Wedding Mandaps' },
  { value: 'reception', label: 'Reception Stages' },
  { value: 'family', label: 'Family Functions' },
];

export function AdminGalleryPage() {
  const { images, deleteImage, togglePublish } = useAdminGallery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState<Partial<GalleryImage>>({
    title: '',
    description: '',
    category: 'birthday',
    image_url: '',
    is_published: true,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.title || !newImage.image_url) return;

    // Local array update
    images.unshift({
      id: `gal-${Date.now()}`,
      title: newImage.title,
      description: newImage.description,
      category: newImage.category || 'birthday',
      image_url: newImage.image_url,
      is_published: true,
      sort_order: images.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    setIsModalOpen(false);
    setNewImage({ title: '', description: '', category: 'birthday', image_url: '', is_published: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-1">
            Visual Media & Portfolio
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725]">
            Gallery Management
          </h1>
          <p className="text-xs sm:text-sm text-[#77716B]">
            Add high-resolution event photographs, categorize by celebration type, and publish to the public portfolio.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292725] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#C5A46D]" />
          <span>Add Photograph</span>
        </button>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className={`bg-white rounded-3xl overflow-hidden border shadow-sm flex flex-col justify-between transition-all ${
              img.is_published ? 'border-gray-200' : 'border-gray-200 opacity-60'
            }`}
          >
            <div className="relative aspect-square bg-gray-100">
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                {img.category}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-heading text-base font-bold text-[#292725] mb-1">
                  {img.title}
                </h4>
                {img.description && (
                  <p className="text-xs text-[#77716B] line-clamp-2">{img.description}</p>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => togglePublish(img.id, !img.is_published)}
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    img.is_published ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                >
                  {img.is_published ? (
                    <>
                      <Eye className="w-3.5 h-3.5" /> Published
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" /> Hidden
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => deleteImage(img.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl">
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-100">
              <h3 className="font-heading text-xl font-bold text-[#292725]">
                Add Portfolio Photograph
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-[#292725] mb-1">
                  Image Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pastel Ring Balloon Setup"
                  value={newImage.title || ''}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#292725] mb-1">
                  Category
                </label>
                <select
                  value={newImage.category || 'birthday'}
                  onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D] bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#292725] mb-1">
                  Image URL / Storage Reference
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newImage.image_url || ''}
                  onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#292725] mb-1">
                  Description / Caption (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Details of flower types, lighting or background theme..."
                  value={newImage.description || ''}
                  onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#292725] text-white font-semibold hover:bg-black"
                >
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
