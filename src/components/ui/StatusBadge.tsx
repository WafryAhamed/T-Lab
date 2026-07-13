import React from 'react';
import { TaskStatus } from '../../types';
import { cn } from '../../lib/utils';
// Legacy statuses ("To Do") map onto the new 4-status system
const normalize = (s: string): TaskStatus => {
  if (s === 'To Do') return 'Todo';
  return s as TaskStatus;
};
export function StatusBadge({ status }: {status: TaskStatus | 'To Do';}) {
  const s = normalize(status);
  const map: Record<TaskStatus, string> = {
    Todo: 'bg-bg text-secondary border border-line',
    'In Progress': 'border border-accent text-accent',
    Review: 'bg-maintext text-bg',
    Completed: 'bg-accent text-black'
  };
  return (
    <span
      className={cn(
        'inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap',
        map[s]
      )}>
      
      {s === 'Todo' ? 'To Do' : s}
    </span>);

}