import React from 'react';
import { cn } from '../../lib/utils';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section';
}
export function Card({ className, children, as = 'div', ...props }: CardProps) {
  const Comp = as;
  return (
    <Comp
      className={cn('bg-card border border-line rounded-2xl', className)}
      {...props}>
      
      {children}
    </Comp>);

}