import { clsx, type ClassValue } from 'clsx'

/** Merge class names (supports conditional objects/arrays). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}
