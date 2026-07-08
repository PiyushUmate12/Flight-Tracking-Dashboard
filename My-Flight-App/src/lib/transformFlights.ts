import { AirLabsFlight } from "@/types/api";
import { Flight } from "@/types/flight";

export const transformFlights = (
  states: AirLabsFlight[] | null
): Flight[] => {
  if (!states) return [];

  return states
    .filter((f) => f.lat != null && f.lng != null)
    .map((f) => {
      // Build a stable unique id from whatever identifier is present
      const identifier =
        f.hex || f.flight_icao || f.flight_iata || f.reg_number || `${f.lat}-${f.lng}`;

      return {
        id: identifier,
        icao24: f.hex || identifier,

        callsign: (f.flight_icao || f.flight_iata || "Unknown").trim(),

        originCountry: f.flag ?? "Unknown",

        longitude: f.lng,
        latitude: f.lat,

        altitude: f.alt ?? 0,
        velocity: f.speed ?? 0,
        heading: f.dir ?? 0,   // defaults to 0 if missing — plane icon just won't rotate for these

        airline: f.airline_iata ?? "Unknown",
        sourceAirport: f.dep_iata ?? "Unknown",
        destinationAirport: f.arr_iata ?? "Unknown",
        aircraftModel: f.aircraft_icao ?? "Unknown",
        flightStatus: f.status,

        lastUpdated: f.updated ?? Date.now() / 1000,
      };
    });
};