import React from 'react';
import { cn } from '../../lib/utils';
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'neutral' | 'outline';
  className?: string;
}
export function Badge({
  children,
  variant = 'neutral',
  className
}: BadgeProps) {
  const variants: Record<string, string> = {
    accent: 'bg-accent text-black',
    neutral: 'bg-bg text-secondary border border-line',
    outline: 'border border-accent text-accent'
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full',
        variants[variant],
        className
      )}>
      
      {children}
    </span>);

}