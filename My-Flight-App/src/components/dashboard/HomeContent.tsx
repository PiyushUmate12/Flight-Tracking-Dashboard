"use client";

import FlightMap from "../map/FlightMap";
import FlightDrawerV2 from "../flight-details/v2/FlightDrawerV2";
import DashboardLayout from "./DashboardLayout";

import { useAppSelector } from "@/store/hooks";

export default function HomeContent() {
  const selectedFlight = useAppSelector(
    (state) => state.flights.selectedFlight
  );

  return (
    <DashboardLayout
      drawerOpen={Boolean(selectedFlight)}
      drawer={<FlightDrawerV2 />}
    >
      <FlightMap />
    </DashboardLayout>
  );
}