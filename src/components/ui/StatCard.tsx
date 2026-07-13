import React from 'react';
import { Card } from './Card';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: boolean;
}
export function StatCard({ label, value, icon: Icon, accent }: StatCardProps) {
  return (
    <Card className="p-5 flex items-center gap-4">
      <div
        className={
        accent ?
        'h-11 w-11 rounded-xl bg-accent text-black flex items-center justify-center shrink-0' :
        'h-11 w-11 rounded-xl bg-bg border border-line text-secondary flex items-center justify-center shrink-0'
        }>
        
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-display font-bold text-maintext leading-none">
          {value}
        </p>
        <p className="text-sm text-secondary mt-1 truncate">{label}</p>
      </div>
    </Card>);

}