import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'terracotta' | 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    gold: 'bg-gold/10 text-gold-dark border-gold/20',
    terracotta: 'bg-terracotta/10 text-terracotta border-terracotta/20',
    default: 'bg-warm-gray/10 text-warm-gray border-warm-gray/20',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
