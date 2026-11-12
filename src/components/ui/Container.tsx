import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
}

export function Container({ children, className = '', size = 'default' }: ContainerProps) {
  const sizes = {
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    narrow: 'max-w-4xl',
  };

  return (
    <div className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
