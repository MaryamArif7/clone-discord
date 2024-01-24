import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 //cn hepls to create dynamic claasses insside of the tailwind
 //suppose you arer giving a css property to a class like color, we can give the color proerty again to the same class 
 // and thats gonna override the same class
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
