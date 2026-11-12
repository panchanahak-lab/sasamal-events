import React from 'react';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeading({ subtitle, title, description, align = 'center', light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {subtitle && (
        <p className={`text-sm font-medium tracking-[0.2em] uppercase mb-3 ${light ? 'text-gold-light' : 'text-gold'}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 ${light ? 'text-white' : 'text-charcoal'}`}>
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-warm-gray'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
