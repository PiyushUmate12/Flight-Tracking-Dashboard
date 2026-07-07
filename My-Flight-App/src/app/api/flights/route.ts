import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.OPENSKY_API_URL}/states/all`,
      {
        cache: "no-store",
      }
    );

    console.log("OpenSky status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error("OpenSky error:", text);

      throw new Error(`OpenSky ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    console.error("Flight API error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch flights",
      },
      {
        status: 500,
      }
    );
  }
}