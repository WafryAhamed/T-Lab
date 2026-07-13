import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
export function Skeleton({ className }: {className?: string;}) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-card border border-line',
        className
      )}
      aria-hidden="true" />);


}
export function CardSkeleton() {
  return (
    <div
      className="bg-card border border-line rounded-2xl p-5 space-y-3"
      aria-hidden="true">
      
      <div className="animate-pulse h-4 w-2/3 rounded bg-bg" />
      <div className="animate-pulse h-3 w-full rounded bg-bg" />
      <div className="animate-pulse h-3 w-1/2 rounded bg-bg" />
    </div>);

}
export function useSimulatedLoading(ms = 600) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return loading;
}