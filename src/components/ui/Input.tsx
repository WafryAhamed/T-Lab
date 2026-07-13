import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label &&
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-secondary mb-1.5">
          
            {label}
          </label>
        }
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-sm text-maintext placeholder:text-secondary/50 focus:outline-none focus:border-accent transition-colors',
            error && 'border-red-500',
            className
          )}
          {...props} />
        
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>);

  }
);
Input.displayName = 'Input';
interface TextareaProps extends
  React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label &&
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-secondary mb-1.5">
          
            {label}
          </label>
        }
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-sm text-maintext placeholder:text-secondary/50 focus:outline-none focus:border-accent transition-colors resize-none',
            className
          )}
          {...props} />
        
      </div>);

  }
);
Textarea.displayName = 'Textarea';
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className, id, children, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label &&
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-secondary mb-1.5">
          
            {label}
          </label>
        }
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-sm text-maintext focus:outline-none focus:border-accent transition-colors',
            className
          )}
          {...props}>
          
          {children}
        </select>
      </div>);

  }
);
Select.displayName = 'Select';