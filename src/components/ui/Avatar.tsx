import React from 'react';
import { cn } from '../../lib/utils';
interface AvatarProps {
  name: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export function Avatar({
  name,
  color = '#2C2C2C',
  size = 'md',
  className
}: AvatarProps) {
  const initials = name.
  split(' ').
  map((n) => n[0]).
  slice(0, 2).
  join('').
  toUpperCase();
  const sizes = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-12 w-12 text-base'
  };
  const isAccent = color === '#FFAB00';
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold shrink-0',
        isAccent ? 'text-black' : 'text-white',
        sizes[size],
        className
      )}
      style={{
        backgroundColor: color
      }}
      aria-hidden="true">
      
      {initials}
    </span>);

}