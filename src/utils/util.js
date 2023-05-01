import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function covertName(...inputs) {
  return twMerge(clsx(inputs));
}




