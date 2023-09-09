import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 //cn hepls to create dynamic claasses
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
