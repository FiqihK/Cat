import test from 'node:test';
import assert from 'node:assert/strict';
import {
  convertUnit,
  getConversionFormula,
  calculateTotals,
  formatRupiah,
} from './conversion.ts';

test('convertUnit calculates correct volume conversions', () => {
  // 1 Drum (20L) = 4 Ember (5L)
  assert.equal(convertUnit(1, 'drum', 'ember'), 4);
  // 1 Drum (20L) = 20 Liter
  assert.equal(convertUnit(1, 'drum', 'liter'), 20);
  // 1 Ember (5L) = 5 Liter
  assert.equal(convertUnit(1, 'ember', 'liter'), 5);
  // 1 Liter = 1000 ml
  assert.equal(convertUnit(1, 'liter', 'ml'), 1000);
  // 2 Ember to Drum = 0.5 Drum
  assert.equal(convertUnit(2, 'ember', 'drum'), 0.5);
});

test('getConversionFormula generates expected string', () => {
  assert.equal(
    getConversionFormula(1, 'drum', 'ember'),
    'Drum (20L) = 4 Ember (5L)'
  );
});

test('calculateTotals computes subtotal, PPN 11%, and total correctly', () => {
  const items = [
    { price: 230000, quantity: 1 },
  ];

  // With 11% PPN (PKP)
  const pkpResult = calculateTotals(items, true);
  assert.equal(pkpResult.subtotal, 230000);
  assert.equal(pkpResult.ppnAmount, 25300);
  assert.equal(pkpResult.total, 255300);
  assert.equal(pkpResult.totalItems, 1);

  // Without PPN (Retail)
  const retailResult = calculateTotals(items, false);
  assert.equal(retailResult.subtotal, 230000);
  assert.equal(retailResult.ppnAmount, 0);
  assert.equal(retailResult.total, 230000);
});

test('formatRupiah formats standard Indonesian rupiah string', () => {
  assert.equal(formatRupiah(850000), 'Rp 850.000');
  assert.equal(formatRupiah(12450000), 'Rp 12.450.000');
  assert.equal(formatRupiah(255300), 'Rp 255.300');
  assert.equal(formatRupiah(0), 'Rp 0');
});
