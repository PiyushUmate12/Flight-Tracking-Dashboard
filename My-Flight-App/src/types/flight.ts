export interface Flight {
  // -------- OpenSky --------
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

  // -------- AviationStack --------
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