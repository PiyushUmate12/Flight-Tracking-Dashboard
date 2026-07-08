"use client";

import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSelectedFlight,
  setFlightDetailsCache,
} from "@/features/flights";

import { useLazyGetFlightDetailsQuery } from "@/services/airlabsApiSlice";
import { getValidCallsign } from "@/utils/FlightHelper";

import FlightInfoSection from "./FlightInfoSection";
import FlightRouteSection from "./FlightRouteSection";
import FlightMetrics from "./FlightMetrics";
import FlightTabsV2 from "./FlightTabsV2";
import FlightContent from "./FlighContent";

// Stable reference — never recreated, so the selector never "changes" spuriously
const EMPTY_CACHE = {};

export default function FlightDrawerV2() {
  
  const dispatch = useAppDispatch();

  const selectedFlight = useAppSelector(
    (state) => state.flights.selectedFlight
  );

  const cache = useAppSelector(
    (state) => state.flights.flightDetailsCache ?? EMPTY_CACHE
  );

  const [tab, setTab] = useState(0);

  const [getFlightDetails, { data }] = useLazyGetFlightDetailsQuery();

  // Only treat a callsign as valid if it's a real, non-placeholder string
const validCallsign = getValidCallsign(selectedFlight?.callsign);

const cachedFlight = useMemo(() => {
  if (!validCallsign) return null;
  return cache[validCallsign] ?? null;
}, [cache, validCallsign]);

useEffect(() => {
  if (!validCallsign) return; // no callsign → don't waste an API call

  const cached = cache[validCallsign];

  if (!cached) {
    getFlightDetails(validCallsign);
    return;
  }

  const age = Date.now() - (cached.cachedAt ?? 0);
  if (age > 24 * 60 * 60 * 1000) {
    getFlightDetails(validCallsign);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [validCallsign]);

  // Write fresh API data into cache
  useEffect(() => {
    if (!data || !selectedFlight) return;

    dispatch(
      setFlightDetailsCache({
        ...selectedFlight,
        ...data,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const flight = cachedFlight ?? selectedFlight;

  if (!flight) return null;

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        bgcolor: "background.paper",
        color: "text.primary",
        px: 2,
        py: 1,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <FlightInfoSection
        flight={flight}
        onClose={() => dispatch(setSelectedFlight(null))}
      />

      <FlightRouteSection flight={flight} />

      <FlightMetrics flight={flight} />

      <FlightTabsV2 onChange={setTab} />

      <Box sx={{ mt: 1.5 }}>
        <FlightContent tab={tab} flight={flight} />
      </Box>
    </Box>
  );
}
