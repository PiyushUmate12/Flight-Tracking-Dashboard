"use client";

import { Box, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { Flight } from "@/types/flight";


interface Props {
  flight: Flight;
  onClose: () => void;
}

export default function FlightInfoSection({ flight, onClose }: Props) {
  
  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
            {flight.callsign}
          </Typography>

          <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
            {flight.airline || "Unknown Airline"}
          </Typography>

          <Typography sx={{ fontSize: 12, color: "text.disabled", mt: 0.3 }}>
            {flight.aircraftModel || "Unknown Aircraft"} • {flight.icao24}
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            width: 36,
            height: 36,
            bgcolor: "action.hover",
            color: "text.primary",
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
