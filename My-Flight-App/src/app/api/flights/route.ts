import { NextResponse } from "next/server";
import { AirLabsFlightsResponse } from "@/types/api";

let cache: { data: AirLabsFlightsResponse["response"]; timestamp: number } | null = null;

const REFRESH_INTERVAL_MS = 4 * 60 * 1000; // 4 minutes for now

export async function GET() {
  try {
    const isStale = !cache || Date.now() - cache.timestamp > REFRESH_INTERVAL_MS;

    if (isStale) {
      const url = `${process.env.AIRLABS_API_URL}/flights?api_key=${process.env.AIRLABS_API_KEY}`;
      const response = await fetch(url, { cache: "no-store" });

      console.log("AirLabs status:", response.status);

      if (!response.ok) {
        const text = await response.text();
        console.error("AirLabs error:", text);
        throw new Error(`AirLabs ${response.status}`);
      }

      const json = await response.json();
      cache = { data: json.response ?? json ?? [], timestamp: Date.now() };
    }

    return NextResponse.json({ states: cache?.data ?? [] });
  } catch (error) {
    console.error("Flight API error:", error);
    return NextResponse.json({ message: "Failed to fetch flights" }, { status: 500 });
  }
}