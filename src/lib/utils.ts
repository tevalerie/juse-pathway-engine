import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseNum(v: string): number {
  const n = parseFloat(String(v).replace(/[,$\s]/g, ""));
  return isNaN(n) ? 0 : n;
}

export function fmtJMD(n: number): string {
  return new Intl.NumberFormat("en-JM", {
    style: "currency",
    currency: "JMD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function fmtPct(n: number, digits: number = 0): string {
  return `${n.toFixed(digits)}%`;
}

export function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
