export function fmt$(n: number): string {
  if (!isFinite(n)) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function fmtPct(n: number, decimals = 2): string {
  if (!isFinite(n)) return '—';
  return n.toFixed(decimals) + '%';
}

export function fmtNum(n: number): string {
  if (!isFinite(n)) return '—';
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

/** Parse a string to a number, stripping $, %, commas */
export function p(s: string): number {
  if (!s || !s.trim()) return 0;
  const n = parseFloat(s.replace(/[$%,\s]/g, ''));
  return isNaN(n) ? 0 : n;
}

/** Return Tailwind color class based on sign */
export function signColor(n: number): string {
  if (n > 0) return 'text-emerald-400';
  if (n < 0) return 'text-red-400';
  return 'text-white';
}
