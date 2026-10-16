/** Accept ordinary minus, Unicode minus, en/em dashes, and decimal commas. */
export function parseStudentNumber(raw: string): number {
  const normalized = raw
    .trim()
    .replace(/[−–—]/g, "-")
    .replace(/\s/g, "")
    .replace(/,/g, ".");
  if (!normalized || normalized === "-" || normalized === "." || normalized === "-.") {
    return Number.NaN;
  }
  return Number.parseFloat(normalized);
}

export function latexSigned(value: number, digits = 1): string {
  const text = value.toFixed(digits);
  return value < 0 ? `(${text})` : text;
}
