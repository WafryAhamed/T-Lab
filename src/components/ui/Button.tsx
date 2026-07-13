import React from 'react';
import { cn } from '../../lib/utils';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed';
  const variants: Record<string, string> = {
    primary: 'bg-accent text-black hover:bg-accent/90',
    secondary: 'bg-card text-maintext border border-line hover:border-accent',
    ghost: 'text-secondary hover:text-maintext hover:bg-card',
    danger: 'bg-card text-red-500 border border-line hover:border-red-500'
  };
  const sizes: Record<string, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3'
  };
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}>
      
      {children}
    </button>);

}