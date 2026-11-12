import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-sm font-medium text-charcoal">
          {label}
          {props.required && <span className="text-terracotta ml-0.5">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-2.5 rounded-lg border transition-colors duration-200
            bg-white text-charcoal placeholder-warm-gray-light
            border-warm-gray-light/50
            focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold
            ${error ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="text-xs text-warm-gray">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
