import React from 'react';
import { cn } from '../../lib/utils';
export function Spinner({
  className,
  size = 20



}: {className?: string;size?: number;}) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-line border-t-accent',
        className
      )}
      style={{
        width: size,
        height: size
      }} />);


}