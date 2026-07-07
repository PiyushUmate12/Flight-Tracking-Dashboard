"use client";

import { Layer } from "react-map-gl/maplibre";

export default function FlightLayer() {
  return (
    <Layer
      id="flight-points"
      source="flights-source"
      type="symbol"
      layout={{
        "icon-image": "aircraft",

"icon-size": [
  "interpolate",
  ["linear"],
  ["zoom"],
  2, 0.02,
  4, 0.03,
  6, 0.045,
  8, 0.06,
  10, 0.08,
  12, 0.1,
],

        "icon-allow-overlap": true,
        "icon-ignore-placement": true,

        "icon-rotate": ["get", "heading"],
        "icon-rotation-alignment": "map",
        "icon-pitch-alignment": "map",
      }}
    />
  );
}