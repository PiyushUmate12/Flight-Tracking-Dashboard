import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const callsign = request.nextUrl.searchParams.get("callsign")?.trim();

    if (!callsign) {
      return NextResponse.json(
        { message: "Missing callsign" },
        { status: 400 }
      );
    }

    const base = `${process.env.AVIATIONSTACK_BASE_URL}/flights`;
    const key = process.env.AVIATIONSTACK_API_KEY;

    // Try IATA code first (e.g. "UA686")
    let flight = await fetchFlightByParam(base, key, "flight_iata", callsign);

    // Fall back to ICAO code (e.g. "UAL686") if IATA search found nothing
    if (!flight) {
      flight = await fetchFlightByParam(base, key, "flight_icao", callsign);
    }

    if (!flight) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      airline: flight.airline?.name,

      flightStatus: flight.flight_status,

      sourceAirport: flight.departure?.airport,
      sourceIata: flight.departure?.iata,
      sourceIcao: flight.departure?.icao,

      destinationAirport: flight.arrival?.airport,
      destinationIata: flight.arrival?.iata,
      destinationIcao: flight.arrival?.icao,

      aircraftRegistration: flight.aircraft?.registration,
      aircraftModel: flight.aircraft?.icao24,

      departureTime: flight.departure?.scheduled,
      arrivalTime: flight.arrival?.scheduled,

      delay: flight.departure?.delay,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "Unable to fetch flight" },
      { status: 500 }
    );
  }
}

async function fetchFlightByParam(
  base: string,
  key: string | undefined,
  param: "flight_iata" | "flight_icao",
  value: string
) {
  const url = `${base}?access_key=${key}&${param}=${encodeURIComponent(value)}`;

  const response = await fetch(url, {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    throw new Error(`AviationStack ${response.status}`);
  }

  const result = await response.json();


  if (!result.data || result.data.length === 0) {
    return null;
  }

  return result.data[0];
}