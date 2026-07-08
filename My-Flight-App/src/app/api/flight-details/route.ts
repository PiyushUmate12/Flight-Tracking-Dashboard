
import { NextRequest, NextResponse } from "next/server";
import { AirLabsFlightInfo } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    const callsign = request.nextUrl.searchParams.get("callsign")?.trim();

    if (!callsign) {
      return NextResponse.json({ message: "Missing callsign" }, { status: 400 });
    }

    const base = `${process.env.AIRLABS_API_URL}/flight`;
    const key = process.env.AIRLABS_API_KEY;

    let flight = await fetchFlightByParam(base, key, "flight_iata", callsign);
    if (!flight) {
      flight = await fetchFlightByParam(base, key, "flight_icao", callsign);
    }

    if (!flight) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      airline: flight.airline_name ?? flight.airline_iata ?? flight.airline_icao ?? "Unknown",

      flightStatus: flight.status,

      sourceIata: flight.dep_iata,
      sourceIcao: flight.dep_icao,
      sourceAirport: flight.dep_name ?? flight.dep_iata ?? "Unknown",

      destinationIata: flight.arr_iata,
      destinationIcao: flight.arr_icao,
      destinationAirport: flight.arr_name ?? flight.arr_iata ?? "Unknown",

      aircraftRegistration: flight.reg_number,
      aircraftModel: flight.model,

      departureTime: flight.dep_time,
      arrivalTime: flight.arr_time,

      delay: flight.delayed ?? undefined,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Unable to fetch flight" }, { status: 500 });
  }
}

async function fetchFlightByParam(
  base: string,
  key: string | undefined,
  param: "flight_iata" | "flight_icao",
  value: string
): Promise<AirLabsFlightInfo | null> {
  const url = `${base}?${param}=${encodeURIComponent(value)}&api_key=${key}`;

  const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });

  if (!response.ok) {
    throw new Error(`AirLabs ${response.status}`);
  }

  const result = await response.json();

  if (!result || !result.response) {
    return null;
  }

  return result.response;
}