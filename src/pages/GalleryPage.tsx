import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { useGalleryImages } from '@/hooks/useSupabase';
import { X, Eye, Info, Sparkles } from 'lucide-react';
import type { GalleryImage } from '@/types';

const filterCategories = [
  { id: 'all', label: 'All Celebrations' },
  { id: 'haldi', label: 'Haldi Ceremony' },
  { id: 'birthday', label: 'Birthday Parties' },
  { id: 'engagement', label: 'Engagement & Rings' },
  { id: 'wedding', label: 'Wedding Mandaps' },
  { id: 'reception', label: 'Reception Stages' },
  { id: 'family', label: 'Family Functions' },
];

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const { images } = useGalleryImages(selectedCategory);

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-white">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A46D] block mb-2">
            Visual Portfolio
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#292725] mb-4">
            Our Work & Inspiration Gallery
          </h1>
          <p className="text-base sm:text-lg text-[#77716B] leading-relaxed">
            Explore stage aesthetics, balloon rings, mandap designs, and table arrangements for memorable celebrations across Navi Mumbai.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#292725] text-white shadow-md'
                    : 'bg-[#FAF8F3] text-[#77716B] hover:text-[#292725] hover:bg-[#EBE7DF]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-square cursor-pointer bg-[#FAF8F3] border border-warm-gray-light/20 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#292725]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A46D] mb-1">
                  {img.category}
                </span>
                <h3 className="font-heading text-lg font-bold leading-snug">
                  {img.title}
                </h3>
                {img.description && (
                  <p className="text-xs text-white/80 line-clamp-2 mt-1">{img.description}</p>
                )}
                <div className="flex items-center gap-1.5 text-xs text-[#C5A46D] font-semibold mt-3">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge Preview</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Authentic Demonstration Note */}
        <div className="mt-16 p-6 rounded-3xl bg-[#FAF8F3] border border-warm-gray-light/20 max-w-2xl mx-auto text-center">
          <div className="w-10 h-10 rounded-full bg-[#C5A46D]/15 flex items-center justify-center text-[#B08F56] mx-auto mb-3">
            <Info className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-lg font-bold text-[#292725] mb-1">
            Authentic Event Photography Notice
          </h4>
          <p className="text-xs sm:text-sm text-[#77716B] leading-relaxed">
            The photographs featured here currently demonstrate our intended styling standards, decorative color combinations, and structural concepts. Sasamal Events does not falsely attribute external works. Live client project photographs will be gradually updated via our company administrator portal.
          </p>
        </div>
      </Container>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeImage.image_url}
              alt={activeImage.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />

            <div className="p-6 sm:p-8 bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D] block mb-1">
                {activeImage.category}
              </span>
              <h3 className="font-heading text-2xl font-bold text-[#292725] mb-2">
                {activeImage.title}
              </h3>
              {activeImage.description && (
                <p className="text-sm text-[#77716B] leading-relaxed">{activeImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
