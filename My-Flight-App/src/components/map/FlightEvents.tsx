"use client";

import { useCallback } from "react";
import { useMap } from "react-map-gl/maplibre";

export default function FlightEvents() {
  const { current: map } = useMap();

  const handleLoad = useCallback(() => {
    if (!map) return;

    console.log("Map Ready");
  }, [map]);

  return null;
}