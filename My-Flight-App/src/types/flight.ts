export interface Flight {
  // -------- AirLabs (live position data) --------
  id: string;
  icao24: string;
  callsign: string;

  latitude: number;
  longitude: number;

  altitude: number;
  velocity: number;
  heading: number;

  originCountry: string;
  lastUpdated: number;

  // -------- AirLabs (flight detail data) --------
  airline?: string;

  sourceAirport?: string;
  destinationAirport?: string;

  aircraftModel?: string;

  flightStatus?: string;

  sourceIata?: string;
  sourceIcao?: string;

  destinationIata?: string;
  destinationIcao?: string;

  aircraftRegistration?: string;

  departureTime?: string;
  arrivalTime?: string;

  delay?: number;

  cachedAt?: number;
}