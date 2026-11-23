/**
 * Neutralises spreadsheet formulas in exported CSV cells: a value that starts
 * with =, +, -, @, tab or carriage return is prefixed with an apostrophe so
 * Excel/Sheets treat it as text instead of executing it.
 */
export function csvSafe(value: unknown): string {
  const text = String(value ?? "");
  return /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
}
