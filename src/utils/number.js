// Measured values use the Brazilian decimal comma with a fixed number of digits,
// so every figure on a screen shares one format ("412,6 N", "2,35 s").
export function formatMeasure (value, digits = 1) {
  const number = Number(value)
  if (!Number.isFinite(number)) return '—'
  return number.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}
