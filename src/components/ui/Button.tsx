import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'maroon' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-charcoal text-white hover:bg-charcoal/90 focus:ring-charcoal',
    secondary: 'bg-ivory text-charcoal border border-warm-gray-light hover:bg-cream focus:ring-warm-gray',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-white focus:ring-gold',
    ghost: 'text-charcoal hover:bg-ivory focus:ring-warm-gray',
    gold: 'bg-gold text-white hover:bg-gold-dark focus:ring-gold',
    maroon: 'bg-[#6B1D2F] text-white hover:bg-[#521321] focus:ring-[#6B1D2F] shadow-sm',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20BD5A] focus:ring-[#25D366]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3 text-base gap-2',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
