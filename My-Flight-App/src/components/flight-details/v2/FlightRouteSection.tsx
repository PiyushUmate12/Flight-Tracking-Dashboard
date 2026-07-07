// "use client";

// import { Box, Typography } from "@mui/material";
// import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
// import FlightLandRoundedIcon from "@mui/icons-material/FlightLandRounded";

// import { Flight } from "@/types/flight";

// interface Props {
//   flight: Flight;
// }

// export default function FlightRouteSection({ flight }: Props) {
//   return (
//     <Box sx={{ py: 2 }}>
//       <Box sx={{ display: "flex", gap: 2 }}>
//         {/* timeline */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <FlightTakeoffRoundedIcon sx={{ fontSize: 18, color: "#3b82f6" }} />
//           <Box sx={{ width: 2, height: 34, bgcolor: "#1f2937" }} />
//           <FlightLandRoundedIcon sx={{ fontSize: 18, color: "#22c55e" }} />
//         </Box>

//         {/* content */}
//         <Box sx={{ flex: 1 }}>
//           <Typography sx={{ fontSize: 11, color: "#64748b" }}>
//             Departure
//           </Typography>
//           <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
//             {flight.sourceAirport || "Unknown Airport"}
//           </Typography>

//           <Box sx={{ height: 12 }} />

//           <Typography sx={{ fontSize: 11, color: "#64748b" }}>
//             Arrival
//           </Typography>
//           <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
//             {flight.destinationAirport || "Unknown Airport"}
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

"use client";

import { Box, Typography } from "@mui/material";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import FlightLandRoundedIcon from "@mui/icons-material/FlightLandRounded";

import { Flight } from "@/types/flight";
import { getValidCallsign } from "@/utils/FlightHelper";

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

export default function FlightRouteSection({ flight }: Props) {
  const validCallsign = getValidCallsign(flight.callsign);

  const departure = formatAirport(flight.sourceAirport);
  const arrival = formatAirport(flight.destinationAirport);

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* timeline */}
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

        {/* content */}
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

      {/* No route data notice */}
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
