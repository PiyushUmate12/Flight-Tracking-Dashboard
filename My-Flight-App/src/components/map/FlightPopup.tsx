"use client";

import { useEffect, useState } from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { Popup, useMap } from "react-map-gl/maplibre";

import { Flight } from "@/types/flight";

interface FlightPopupProps {
  flight: Flight | null;
  /** height of your fixed navbar in px, reserved as unusable space at the top */
  navbarHeight?: number;
  /** buffer distance from any edge before the popup flips direction */
  edgeMargin?: number;
}

type AnchorY = "top" | "bottom" | "center";
type AnchorX = "left" | "right" | "center";

export default function FlightPopup({
  flight,
  navbarHeight = 64,
  edgeMargin = 150,
}: FlightPopupProps) {
  const theme = useTheme();
  const { current: map } = useMap();
  const [anchor, setAnchor] = useState<string>("bottom");

  useEffect(() => {
    if (!flight || !map) return;

    const computeAnchor = () => {
      const container = map.getContainer();
      const { clientWidth, clientHeight } = container;
      const point = map.project([flight.longitude, flight.latitude]);

      let y: AnchorY = "center";
      let x: AnchorX = "center";

      // near top (or under navbar) -> popup should open DOWNWARD
      if (point.y < navbarHeight + edgeMargin) {
        y = "top";
      }
      // near bottom -> popup should open UPWARD
      else if (point.y > clientHeight - edgeMargin) {
        y = "bottom";
      }

      // near left edge -> popup should open RIGHTWARD
      if (point.x < edgeMargin) {
        x = "left";
      }
      // near right edge -> popup should open LEFTWARD
      else if (point.x > clientWidth - edgeMargin) {
        x = "right";
      }

      let next: string;
      if (y !== "center" && x !== "center") next = `${y}-${x}`;
      else if (y !== "center") next = y;
      else if (x !== "center") next = x;
      else next = "bottom";

      setAnchor(next);
    };

    computeAnchor();

    map.on("move", computeAnchor);
    map.on("zoom", computeAnchor);
    map.on("resize", computeAnchor);

    return () => {
      map.off("move", computeAnchor);
      map.off("zoom", computeAnchor);
      map.off("resize", computeAnchor);
    };
  }, [flight, map, navbarHeight, edgeMargin]);

  if (!flight) return null;

  return (
    <Popup
      className={`flight-popup flight-popup-${theme.palette.mode}`}
      longitude={flight.longitude}
      latitude={flight.latitude}
      closeButton={false}
      closeOnClick={false}
      offset={18}
      anchor={anchor as any}
    >
      <Box
        sx={{
          minWidth: 190,
          maxWidth: 220,
          p: 1,
          fontSize: 13,
          lineHeight: 1.5,
          bgcolor: "background.paper",
          color: "text.primary",
        }}
      >
        <Typography component="strong" sx={{ fontSize: 14 }}>
          Flight {flight.callsign}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <div>
          <strong>Country:</strong> {flight.originCountry}
        </div>

        <div>
          <strong>Altitude:</strong> {flight.altitude.toFixed(0)} m
        </div>

        <div>
          <strong>Speed:</strong> {flight.velocity.toFixed(0)} m/s
        </div>

        <div>
          <strong>Heading:</strong> {flight.heading.toFixed(0)}°
        </div>
      </Box>
    </Popup>
  );
}