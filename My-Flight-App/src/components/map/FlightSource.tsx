"use client";

import { Source } from "react-map-gl/maplibre";
import { useMemo } from "react";
import { Flight } from "@/types/flight";

interface Props {
  flights: Flight[];
  children?: React.ReactNode;
}

export default function FlightSource({ flights, children }: Props) {
  const data = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: flights.map((flight) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [flight.longitude, flight.latitude],
        },
        properties: {
          ...flight,
        },
      })),
    }),
    [flights]
  );

  return (
    <Source id="flights-source" type="geojson" data={data}>
      {children}
    </Source>
  );
}