import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1.5">
        <label htmlFor={textareaId} className="block text-sm font-medium text-charcoal">
          {label}
          {props.required && <span className="text-terracotta ml-0.5">*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-4 py-2.5 rounded-lg border transition-colors duration-200
            bg-white text-charcoal placeholder-warm-gray-light
            border-warm-gray-light/50
            focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold
            min-h-[100px] resize-y
            ${error ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
