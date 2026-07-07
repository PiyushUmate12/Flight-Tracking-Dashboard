// Common ICAO airline codes → names. Not exhaustive, but covers most
// major carriers you'll actually see in live OpenSky traffic.
const ICAO_AIRLINE_MAP: Record<string, string> = {
  UAE: "Emirates",
  QTR: "Qatar Airways",
  ETD: "Etihad Airways",
  BAW: "British Airways",
  AFR: "Air France",
  DLH: "Lufthansa",
  KLM: "KLM",
  UAL: "United Airlines",
  AAL: "American Airlines",
  DAL: "Delta Air Lines",
  SWA: "Southwest Airlines",
  JBU: "JetBlue Airways",
  ACA: "Air Canada",
  ANA: "All Nippon Airways",
  JAL: "Japan Airlines",
  SIA: "Singapore Airlines",
  CPA: "Cathay Pacific",
  THA: "Thai Airways",
  QFA: "Qantas",
  VIR: "Virgin Atlantic",
  RYR: "Ryanair",
  EZY: "easyJet",
  IBE: "Iberia",
  AZA: "ITA Airways",
  TAP: "TAP Air Portugal",
  SAS: "SAS",
  FIN: "Finnair",
  AUA: "Austrian Airlines",
  SWR: "Swiss International",
  TUI: "TUI Airways",
  WZZ: "Wizz Air",
  PIA: "Pakistan International",
  AIC: "Air India",
  IGO: "IndiGo",
  SEJ: "SpiceJet",
  GFA: "Gulf Air",
  SVA: "Saudia",
  MSR: "EgyptAir",
  RAM: "Royal Air Maroc",
  KAC: "Kuwait Airways",
  MEA: "Middle East Airlines",
  ELY: "El Al",
  TRA: "Transavia",
  CES: "China Eastern",
  CCA: "Air China",
  CSN: "China Southern",
  HDA: "Hong Kong Airlines",
  CXA: "Xiamen Airlines",
  KAL: "Korean Air",
  AAR: "Asiana Airlines",
  GIA: "Garuda Indonesia",
  MAS: "Malaysia Airlines",
  PAL: "Philippine Airlines",
  VNA: "Vietnam Airlines",
};

export function getAirlineFromCallsign(
  callsign?: string | null
): string | null {
  if (!callsign) return null;

  const trimmed = callsign.trim().toUpperCase();
  const prefix = trimmed.slice(0, 3);

  return ICAO_AIRLINE_MAP[prefix] ?? null;
}