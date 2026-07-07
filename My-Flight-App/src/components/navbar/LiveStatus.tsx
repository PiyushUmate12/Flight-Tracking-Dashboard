"use client";

import Chip from "@mui/material/Chip";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme, useMediaQuery } from "@mui/material";

import { useAppSelector } from "@/store/hooks";

export default function LiveStatus() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const status = useAppSelector(
    (state) => state.flights.connectionStatus
  );

  const color =
    status === "live"
      ? "success"
      : status === "reconnecting"
      ? "warning"
      : "error";

  return (
    <Chip
      icon={<CircleIcon fontSize="small" />}
      label={isMobile ? "" : status}
      color={color}
      size="small"
      sx={{
        borderRadius: 3,
      }}
    />
  );
}