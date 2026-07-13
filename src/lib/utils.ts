import { twMerge } from 'tailwind-merge';

export function cn(
...classes: Array<string | false | null | undefined>)
: string {
  return twMerge(classes.filter(Boolean).join(' '));
}

export function formatDate(date: string): string {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return date;
  }
}