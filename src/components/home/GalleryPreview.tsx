import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Eye, Info } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useGalleryImages } from '@/hooks/useSupabase';
import type { GalleryImage } from '@/types';

const categories = [
  { id: 'all', label: 'All Events' },
  { id: 'mandap', label: 'Mandap' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'haldi', label: 'Haldi' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'success', label: 'Success Party' },
  { id: 'gender-reveal', label: 'Gender Reveal' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'reception', label: 'Reception' },
  { id: 'family', label: 'Family Functions' },
  { id: 'private', label: 'Private Functions' },
];

export function GalleryPreview() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const { images } = useGalleryImages(selectedCategory);

  return (
    <section className="py-20 sm:py-28 bg-white" id="gallery">
      <Container>
        <SectionHeading
          subtitle="Portfolio Showcase"
          title="Our Work & Inspiration"
          description="A curation of decoration styles, concepts, and setups across birthdays, ceremonies, and grand weddings in Navi Mumbai."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
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

        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {images.slice(0, 8).map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer bg-[#FAF8F3] border border-warm-gray-light/20 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#292725]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A46D] mb-1">
                  {img.category}
                </span>
                <h4 className="font-heading text-sm sm:text-base font-semibold leading-snug">
                  {img.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-white/80 mt-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to view</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on demonstration imagery */}
        <div className="mt-8 p-3.5 rounded-xl bg-[#FAF8F3] border border-warm-gray-light/20 flex items-center justify-center gap-2 text-xs text-[#77716B] text-center max-w-2xl mx-auto">
          <Info className="w-4 h-4 text-[#C5A46D] shrink-0" />
          <span>
            Demonstration imagery representing our design standards and stage concepts. Real project archives are updated regularly via our admin panel.
          </span>
        </div>

        {/* Bottom CTA to full gallery */}
        <div className="mt-8 text-center">
          <Link to="/gallery">
            <Button variant="outline" size="md">
              View Complete Gallery
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </Container>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeImage.image_url}
              alt={activeImage.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />

            <div className="p-6 bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D] block mb-1">
                {activeImage.category}
              </span>
              <h3 className="font-heading text-xl font-bold text-[#292725] mb-1">
                {activeImage.title}
              </h3>
              {activeImage.description && (
                <p className="text-sm text-[#77716B]">{activeImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
