import { NextResponse } from "next/server";
import { getOpenSkyToken } from "@/lib/openSkyToken";

export async function GET() {
  try {
    const token = await getOpenSkyToken();

    const response = await fetch(
      `${process.env.OPENSKY_API_URL}/states/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const text = await response.text();

      console.error(text);

      throw new Error(`OpenSky ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

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