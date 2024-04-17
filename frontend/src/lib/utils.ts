
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// util function that shadcn uses for components
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
