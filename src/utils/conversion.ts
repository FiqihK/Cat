/**
 * Pure calculation utilities for Pusat Cat Indonesia
 */

export type UnitType = 'drum' | 'ember' | 'liter' | 'ml';

export const UNIT_CONVERSIONS_IN_ML: Record<UnitType, number> = {
  drum: 20000,
  ember: 5000,
  liter: 1000,
  ml: 1,
};

export const UNIT_LABELS: Record<UnitType, string> = {
  drum: 'Drum (20L)',
  ember: 'Ember (5L)',
  liter: 'Liter (1L)',
  ml: 'ml',
};

/**
 * Convert quantity from one unit to another
 */
export function convertUnit(quantity: number, fromUnit: UnitType, toUnit: UnitType): number {
  if (quantity < 0) return 0;
  const inMl = quantity * UNIT_CONVERSIONS_IN_ML[fromUnit];
  const targetUnitMl = UNIT_CONVERSIONS_IN_ML[toUnit];
  const converted = inMl / targetUnitMl;
  // Return rounded to 4 decimal places if floating, else integer
  return Math.round(converted * 10000) / 10000;
}

/**
 * Generate human-readable conversion formula
 */
export function getConversionFormula(quantity: number, fromUnit: UnitType, toUnit: UnitType): string {
  const result = convertUnit(quantity, fromUnit, toUnit);
  const fromLabel = quantity === 1 ? UNIT_LABELS[fromUnit] : `${quantity} ${UNIT_LABELS[fromUnit]}`;
  const toLabel = UNIT_LABELS[toUnit];
  return `${fromLabel} = ${result} ${toLabel}`;
}

/**
 * Calculate tax and total for transactions
 */
export function calculateTotals(
  items: Array<{ price: number; quantity: number }>,
  includePpn: boolean = false,
  ppnRate: number = 0.11
): { subtotal: number; ppnAmount: number; total: number; totalItems: number } {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const ppnAmount = includePpn ? Math.round(subtotal * ppnRate) : 0;
  const total = subtotal + ppnAmount;

  return {
    subtotal,
    ppnAmount,
    total,
    totalItems,
  };
}

/**
 * Format number to Indonesian Rupiah currency format
 * e.g., 850000 -> "Rp 850.000"
 */
export function formatRupiah(amount: number): string {
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
}
