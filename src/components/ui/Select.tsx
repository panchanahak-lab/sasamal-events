import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1.5">
        <label htmlFor={selectId} className="block text-sm font-medium text-charcoal">
          {label}
          {props.required && <span className="text-terracotta ml-0.5">*</span>}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={`
            w-full px-4 py-2.5 rounded-lg border transition-colors duration-200
            bg-white text-charcoal
            border-warm-gray-light/50
            focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold
            ${error ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''}
            ${className}
          `}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
