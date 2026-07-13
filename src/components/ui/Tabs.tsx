import React from 'react';
import { cn } from '../../lib/utils';
interface TabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}
export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div
      role="tablist"
      className="flex gap-1 border-b border-line overflow-x-auto">
      
      {tabs.map((t) =>
      <button
        key={t}
        role="tab"
        aria-selected={active === t}
        onClick={() => onChange(t)}
        className={cn(
          'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
          active === t ?
          'border-accent text-accent' :
          'border-transparent text-secondary hover:text-maintext'
        )}>
        
          {t}
        </button>
      )}
    </div>);

}