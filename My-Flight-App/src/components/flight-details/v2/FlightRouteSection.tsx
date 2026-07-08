"use client";

import { Box, Typography } from "@mui/material";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import FlightLandRoundedIcon from "@mui/icons-material/FlightLandRounded";

import { Flight } from "@/types/flight";
import { getValidCallsign } from "@/utils/FlightHelper";
import { useGetAirportNameQuery } from "@/services/airportApiSlice";

interface Props {
  flight: Flight;
}

function formatAirport(value?: string | null): {
  text: string;
  isAvailable: boolean;
} {
  const isAvailable =
    !!value && value.trim() !== "" && value.trim().toLowerCase() !== "unknown";

  return {
    text: isAvailable ? value!.trim() : "Not available",
    isAvailable,
  };
}

// Treat a 3-letter code (like "IXC") as "not yet resolved to a full name"
function looksLikeBareCode(value: string): boolean {
  return /^[A-Z]{3}$/.test(value.trim());
}

export default function FlightRouteSection({ flight }: Props) {
  const validCallsign = getValidCallsign(flight.callsign);

  const rawDeparture = formatAirport(flight.sourceAirport);
  const rawArrival = formatAirport(flight.destinationAirport);

  // Only fire the lookup if we got back a bare 3-letter code instead of a full name
  const shouldResolveDep =
    rawDeparture.isAvailable && looksLikeBareCode(rawDeparture.text);
  const shouldResolveArr =
    rawArrival.isAvailable && looksLikeBareCode(rawArrival.text);

  const { data: depData } = useGetAirportNameQuery(rawDeparture.text, {
    skip: !shouldResolveDep,
  });
  const { data: arrData } = useGetAirportNameQuery(rawArrival.text, {
    skip: !shouldResolveArr,
  });

  const departure = {
    ...rawDeparture,
    text: depData?.name ?? rawDeparture.text,
  };
  const arrival = {
    ...rawArrival,
    text: arrData?.name ?? rawArrival.text,
  };

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FlightTakeoffRoundedIcon sx={{ fontSize: 18, color: "#3b82f6" }} />
          <Box sx={{ width: 2, height: 34, bgcolor: "divider" }} />
          <FlightLandRoundedIcon sx={{ fontSize: 18, color: "#22c55e" }} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 11, color: "text.disabled" }}>
            Departure
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              fontStyle: departure.isAvailable ? "normal" : "italic",
              opacity: departure.isAvailable ? 1 : 0.5,
            }}
          >
            {departure.text}
          </Typography>

          <Box sx={{ height: 12 }} />

          <Typography sx={{ fontSize: 11, color: "text.disabled" }}>
            Arrival
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              fontStyle: arrival.isAvailable ? "normal" : "italic",
              opacity: arrival.isAvailable ? 1 : 0.5,
            }}
          >
            {arrival.text}
          </Typography>
        </Box>
      </Box>

      {!validCallsign && (
        <Box
          sx={{
            mt: 1.5,
            ml: 4.5,
            p: 1,
            borderRadius: 1.5,
            bgcolor: "action.hover",
            fontSize: 12,
            color: "text.secondary",
          }}
        >
          No callsign broadcast — route data unavailable.
        </Box>
      )}

      {validCallsign && !departure.isAvailable && !arrival.isAvailable && (
        <Box
          sx={{
            mt: 1.5,
            ml: 4.5,
            p: 1,
            borderRadius: 1.5,
            bgcolor: "action.hover",
            fontSize: 12,
            color: "text.secondary",
          }}
        >
          Route data not found for this flight.
        </Box>
      )}
    </Box>
  );
}