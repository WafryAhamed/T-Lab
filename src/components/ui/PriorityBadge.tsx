import React from 'react';
import { ArrowDown, ArrowRight, ArrowUp, AlertTriangle } from 'lucide-react';
import { TaskPriority } from '../../types';
import { cn } from '../../lib/utils';
export function PriorityBadge({ priority }: {priority: TaskPriority;}) {
  const map: Record<
    TaskPriority,
    {
      cls: string;
      icon: React.ReactNode;
    }> =
  {
    Low: {
      cls: 'bg-bg text-secondary border border-line',
      icon: <ArrowDown size={11} />
    },
    Medium: {
      cls: 'bg-bg text-maintext border border-line',
      icon: <ArrowRight size={11} />
    },
    High: {
      cls: 'border border-accent text-accent',
      icon: <ArrowUp size={11} />
    },
    Urgent: {
      cls: 'bg-accent text-black',
      icon: <AlertTriangle size={11} />
    }
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap',
        map[priority].cls
      )}>
      
      {map[priority].icon}
      {priority}
    </span>);

}