import { NextRequest, NextResponse } from "next/server";

const airportCache = new Map<string, { name: string; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24h — airport names never change

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code")?.trim().toUpperCase();
    if (!code) {
      return NextResponse.json({ message: "Missing code" }, { status: 400 });
    }

    const cached = airportCache.get(code);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({ name: cached.name });
    }

    const url = `${process.env.AIRLABS_API_URL}/airports?iata_code=${code}&api_key=${process.env.AIRLABS_API_KEY}`;
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) throw new Error(`AirLabs ${response.status}`);

    const result = await response.json();
    const airport = Array.isArray(result.response) ? result.response[0] : result.response;
    const name = airport?.name ?? code;

    airportCache.set(code, { name, timestamp: Date.now() });
    return NextResponse.json({ name });
  } catch (err) {
    console.error("Airport lookup error:", err);
    return NextResponse.json({ name: null }, { status: 500 });
  }
}