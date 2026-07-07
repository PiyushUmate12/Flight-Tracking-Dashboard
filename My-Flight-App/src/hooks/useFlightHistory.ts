"use client";

import { useEffect, useState } from "react";
import { Flight } from "@/types/flight";

export interface FlightHistoryPoint {
  time: string;
  altitude: number;
  speed: number;
  heading: number;
}

export function useFlightHistory(flight: Flight | null) {
  const [history, setHistory] = useState<FlightHistoryPoint[]>([]);

  useEffect(() => {
    if (!flight) {
      setHistory([]);
      return;
    }

    setHistory((prev) => {
      const point: FlightHistoryPoint = {
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        altitude: Math.round(flight.altitude),
        speed: Math.round(flight.velocity),
        heading: Math.round(flight.heading),
      };

      return [...prev.slice(-29), point];
    });
  }, [
    flight?.lastUpdated,
    flight?.altitude,
    flight?.velocity,
    flight?.heading,
  ]);

  return history;
}