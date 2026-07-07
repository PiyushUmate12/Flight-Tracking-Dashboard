"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Box, useTheme } from "@mui/material";
import {
  NavigationControl,
  MapLayerMouseEvent,
  MapRef,
} from "react-map-gl/maplibre";

import { useGetLiveFlightsQuery } from "@/services/flightsApiSlice";
import { transformFlights } from "@/lib/transformFlights";
import { filterFlights } from "@/lib/filterFlights";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSelectedFlight,
  setConnectionStatus,
  setBoundingBox,
  clearBoundingBox,
} from "@/features/flights";
import { Flight } from "@/types/flight";

import FlightPopup from "./FlightPopup";
import FlightSource from "./FlightSource";
import FlightLayer from "./FlightLayer";
import MapSkeleton from "./MapSkeleton";
import BoundingBoxControl from "./BoundingBoxControl";

import { INITIAL_VIEW_STATE, LIGHT_MAP_STYLE, MAP_STYLE } from "./mapConfig";

const Map = dynamic(
  () => import("react-map-gl/maplibre").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <MapSkeleton />,
  }
);

export default function FlightMap() {
  const [hoverFlight, setHoverFlight] = useState<Flight | null>(null);
  const [drawMode, setDrawMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPixel, setStartPixel] = useState<{ x: number; y: number } | null>(null);
  const [currentPixel, setCurrentPixel] = useState<{ x: number; y: number } | null>(null);

  const theme = useTheme();
  const mapRef = useRef<MapRef | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector((state) => state.flights.searchQuery);
  const filters = useAppSelector((state) => state.flights.filters);
  const boundingBox = useAppSelector((state) => state.flights.boundingBox);

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetLiveFlightsQuery(undefined, {
      pollingInterval: 240000,
    });

  useEffect(() => {
    if (isError) {
      dispatch(setConnectionStatus("offline"));
    } else if (isLoading || (isFetching && !isSuccess)) {
      dispatch(setConnectionStatus("reconnecting"));
    } else if (isSuccess) {
      dispatch(setConnectionStatus("live"));
    }
  }, [isLoading, isFetching, isError, isSuccess, dispatch]);

  const allFlights = useMemo(
    () => transformFlights(data?.states ?? []),
    [data]
  );

  const flights = useMemo(
    () => filterFlights(allFlights, searchQuery, filters, boundingBox),
    [allFlights, searchQuery, filters, boundingBox]
  );

  const drawModeRef = useRef(drawMode);
  const draggingRef = useRef(isDragging);
  const startPixelRef = useRef(startPixel);

  useEffect(() => {
    drawModeRef.current = drawMode;
  }, [drawMode]);

  useEffect(() => {
    draggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    startPixelRef.current = startPixel;
  }, [startPixel]);

  const handleMapLoad = async () => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    try {
      if (!map.hasImage("aircraft")) {
        const image = await map.loadImage("/icons/aircraft.png");
        if (image?.data) {
          map.addImage("aircraft", image.data);
        }
      }
    } catch (err) {
      console.error("Failed to load aircraft icon:", err);
    }

    // ---- Bounding box drawing via native maplibre events ----
    map.on("mousedown", (e) => {
      if (!drawModeRef.current) return;

      e.preventDefault();
      map.dragPan.disable();
      setIsDragging(true);
      setStartPixel({ x: e.point.x, y: e.point.y });
      setCurrentPixel({ x: e.point.x, y: e.point.y });
    });

    map.on("mousemove", (e) => {
      if (!drawModeRef.current || !draggingRef.current) return;
      setCurrentPixel({ x: e.point.x, y: e.point.y });
    });

    map.on("mouseup", (e) => {
      if (!drawModeRef.current || !draggingRef.current) return;

      map.dragPan.enable();
      setIsDragging(false);

      if (startPixelRef.current) {
        const start = map.unproject([
          startPixelRef.current.x,
          startPixelRef.current.y,
        ]);
        const end = map.unproject([e.point.x, e.point.y]);

        const west = Math.min(start.lng, end.lng);
        const east = Math.max(start.lng, end.lng);
        const south = Math.min(start.lat, end.lat);
        const north = Math.max(start.lat, end.lat);

        if (Math.abs(east - west) > 0.01 && Math.abs(north - south) > 0.01) {
          dispatch(
            setBoundingBox([
              [west, south],
              [east, north],
            ])
          );
        }
      }

      setStartPixel(null);
      setCurrentPixel(null);
      setDrawMode(false);
    });
  };

  const handleClick = (event: MapLayerMouseEvent) => {
    if (drawMode) return;

    const feature = event.features?.[0];
    if (!feature || !feature.properties) return;

    dispatch(
      setSelectedFlight({
        id: feature.properties.id,
        icao24: feature.properties.icao24,
        callsign: feature.properties.callsign,
        originCountry: feature.properties.originCountry,
        latitude: Number(feature.properties.latitude),
        longitude: Number(feature.properties.longitude),
        altitude: Number(feature.properties.altitude),
        velocity: Number(feature.properties.velocity),
        heading: Number(feature.properties.heading),
        airline: feature.properties.airline ?? "Unknown",
        sourceAirport: feature.properties.sourceAirport ?? "Unknown",
        destinationAirport: feature.properties.destinationAirport ?? "Unknown",
        aircraftModel: feature.properties.aircraftModel ?? "Unknown",
        lastUpdated: Number(feature.properties.lastUpdated),
      })
    );
  };

  const rectStyle = useMemo(() => {
    if (!startPixel || !currentPixel) return null;

    const left = Math.min(startPixel.x, currentPixel.x);
    const top = Math.min(startPixel.y, currentPixel.y);
    const width = Math.abs(currentPixel.x - startPixel.x);
    const height = Math.abs(currentPixel.y - startPixel.y);

    return { left, top, width, height };
  }, [startPixel, currentPixel]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <BoundingBoxControl
        active={drawMode}
        hasBox={!!boundingBox}
        onToggle={() => setDrawMode((prev) => !prev)}
        onClear={() => dispatch(clearBoundingBox())}
      />

      <Map
        ref={mapRef}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={theme.palette.mode === "dark" ? MAP_STYLE : LIGHT_MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
        dragPan={!drawMode}
        onMouseMove={(event: MapLayerMouseEvent) => {
          if (drawMode) return;

          const feature = event.features?.[0];
          const canvas = mapRef.current?.getMap().getCanvas();

          if (canvas) {
            canvas.style.cursor = feature ? "pointer" : "";
          }

          if (!feature || !feature.properties) {
            setHoverFlight(null);
            return;
          }

          setHoverFlight({
            id: feature.properties.id,
            icao24: feature.properties.icao24,
            callsign: feature.properties.callsign,
            originCountry: feature.properties.originCountry,
            latitude: Number(feature.properties.latitude),
            longitude: Number(feature.properties.longitude),
            altitude: Number(feature.properties.altitude),
            velocity: Number(feature.properties.velocity),
            heading: Number(feature.properties.heading),
            airline: feature.properties.airline ?? "Unknown",
            sourceAirport: feature.properties.sourceAirport ?? "Unknown",
            destinationAirport:
              feature.properties.destinationAirport ?? "Unknown",
            aircraftModel: feature.properties.aircraftModel ?? "Unknown",
            lastUpdated: Number(feature.properties.lastUpdated),
          });
        }}
        interactiveLayerIds={["flight-points"]}
        onClick={handleClick}
        onLoad={handleMapLoad}
        cursor={drawMode ? "crosshair" : undefined}
      >
        <NavigationControl position="top-right" />

        <FlightSource flights={flights}>
          <FlightLayer />
        </FlightSource>

        <FlightPopup flight={hoverFlight} />
      </Map>

      {rectStyle && (
        <Box
          sx={{
            position: "absolute",
            border: "2px dashed",
            borderColor: "primary.main",
            bgcolor: "rgba(59,130,246,0.15)",
            pointerEvents: "none",
            zIndex: 4,
            ...rectStyle,
          }}
        />
      )}
    </Box>
  );
}