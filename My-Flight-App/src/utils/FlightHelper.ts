// src/utils/flightHelpers.ts
export function getValidCallsign(callsign?: string | null): string | null {
  if (!callsign) return null;

  const trimmed = callsign.trim();

  if (
    trimmed === "" ||
    trimmed.toLowerCase() === "unknown" ||
    trimmed.toLowerCase() === "n/a"
  ) {
    return null;
  }

  return trimmed;
}