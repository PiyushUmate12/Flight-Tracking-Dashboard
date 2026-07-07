import { OpenSkyState } from "@/types/api";
import { Flight } from "@/types/flight";

export const transformFlights = (
  states: OpenSkyState[] | null
): Flight[] => {
  if (!states) return [];

  return states
    .filter((state) => state[5] !== null && state[6] !== null)
    .map((state) => ({
      id: state[0],

      icao24: state[0],

      callsign: state[1]?.trim() || "Unknown",

      originCountry: state[2],

      longitude: state[5] ?? 0,

      latitude: state[6] ?? 0,

      altitude: state[7] ?? 0,

      velocity: state[9] ?? 0,

      heading: state[10] ?? 0,

      airline: "Unknown",

      sourceAirport: "Unknown",

      destinationAirport: "Unknown",

      aircraftModel: "Unknown",

      lastUpdated: state[4],
    }));
};