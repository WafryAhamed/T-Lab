import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}
export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <nav
      className="flex items-center justify-between px-5 py-3 border-t border-line"
      aria-label="Pagination">
      
      <span className="text-xs text-secondary">
        Page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="p-1.5 rounded-lg text-secondary hover:text-maintext hover:bg-bg disabled:opacity-40">
          
          <ChevronLeft size={16} />
        </button>
        {Array.from(
          {
            length: totalPages
          },
          (_, i) => i + 1
        ).map((p) =>
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={cn(
            'h-7 w-7 rounded-lg text-xs font-medium',
            p === page ?
            'bg-accent text-black' :
            'text-secondary hover:bg-bg'
          )}>
          
            {p}
          </button>
        )}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="p-1.5 rounded-lg text-secondary hover:text-maintext hover:bg-bg disabled:opacity-40">
          
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>);

}