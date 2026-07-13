import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}
export function EmptyState({
  icon: Icon,
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="h-14 w-14 rounded-2xl bg-card border border-line flex items-center justify-center mb-4">
        <Icon className="text-secondary" size={26} />
      </div>
      <h3 className="font-display text-lg font-semibold text-maintext">
        {title}
      </h3>
      {description &&
      <p className="mt-1 text-sm text-secondary max-w-sm">{description}</p>
      }
      {action && <div className="mt-5">{action}</div>}
    </div>);

}