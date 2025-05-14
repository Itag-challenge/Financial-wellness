
// app/lib/utils.ts
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Use the types directly from the clsx namespace
export function cn(...inputs: Parameters<typeof clsx>[0][]) {
  return twMerge(clsx(inputs));
}