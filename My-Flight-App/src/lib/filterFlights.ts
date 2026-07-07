import { Flight } from "@/types/flight";
import { FilterState } from "@/features/flights";
import { getAirlineFromCallsign } from "@/lib/airlineLookup";

export function filterFlights(
  flights: Flight[],
  searchQuery: string,
  filters: FilterState,
  boundingBox: [[number, number], [number, number]] | null
): Flight[] {
  const query = searchQuery.trim().toLowerCase();

  return flights.filter((flight) => {
    const resolvedAirline =
      flight.airline && flight.airline.toLowerCase() !== "unknown"
        ? flight.airline
        : getAirlineFromCallsign(flight.callsign);

    // ---- Search ----
    if (query) {
      const haystack = [
        flight.callsign,
        flight.icao24,
        flight.originCountry,
        resolvedAirline,
        flight.sourceAirport,
        flight.destinationAirport,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) return false;
    }

    // ---- Airline filter ----
    if (filters.airline.trim()) {
      const airline = resolvedAirline?.toLowerCase() ?? "";
      if (!airline.includes(filters.airline.trim().toLowerCase())) {
        return false;
      }
    }

    // ---- Altitude filter ----
    if (
      flight.altitude < filters.altitudeRange[0] ||
      flight.altitude > filters.altitudeRange[1]
    ) {
      return false;
    }

    // ---- Speed filter ----
    if (
      flight.velocity < filters.speedRange[0] ||
      flight.velocity > filters.speedRange[1]
    ) {
      return false;
    }

    // ---- Bounding box filter ----
    if (boundingBox) {
      const [[west, south], [east, north]] = boundingBox;
      if (
        flight.longitude < west ||
        flight.longitude > east ||
        flight.latitude < south ||
        flight.latitude > north
      ) {
        return false;
      }
    }

    return true;
  });
}