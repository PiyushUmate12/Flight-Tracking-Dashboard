"use client";

import { Box, Typography } from "@mui/material";
import HeightRoundedIcon from "@mui/icons-material/HeightRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import { Flight } from "@/types/flight";

interface Props {
  flight: Flight;
}

const metrics = (flight: Flight) => [
  {
    title: "Altitude",
    value: `${Math.round(flight.altitude)} m`,
    icon: <HeightRoundedIcon sx={{ fontSize: 18 }} />,
    color: "#3b82f6",
  },
  {
    title: "Speed",
    value: `${Math.round(flight.velocity)} km/h`,
    icon: <SpeedRoundedIcon sx={{ fontSize: 18 }} />,
    color: "#22c55e",
  },
  {
    title: "Heading",
    value: `${Math.round(flight.heading)}°`,
    icon: <ExploreRoundedIcon sx={{ fontSize: 18 }} />,
    color: "#f59e0b",
  },
  {
    title: "Updated",
    value: new Date(flight.lastUpdated * 1000).toLocaleTimeString(),
    icon: <AccessTimeRoundedIcon sx={{ fontSize: 18 }} />,
    color: "#a855f7",
  },
];

export default function FlightMetrics({ flight }: Props) {
  return (
    <Box sx={{ py: 1.5 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1.2,
        }}
      >
        {metrics(flight).map((item) => (
          <Box
            key={item.title}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              py: 1,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.2,
                bgcolor: `${item.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: item.color,
              }}
            >
              {item.icon}
            </Box>

            <Box>
              <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                {item.title}
              </Typography>

              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {item.value}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
