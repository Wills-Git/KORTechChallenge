//@ts-nocheck
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ComponentWrapperProps } from "@/types/types.ts"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
