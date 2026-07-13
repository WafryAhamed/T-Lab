import React from 'react';
interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
}
export function ProgressBar({ value, showLabel = false }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full">
      <div
        className="h-2 w-full bg-bg rounded-full overflow-hidden border border-line"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}>
        
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{
            width: `${clamped}%`
          }} />
        
      </div>
      {showLabel &&
      <p className="mt-1 text-xs text-secondary">{clamped}% complete</p>
      }
    </div>);

}