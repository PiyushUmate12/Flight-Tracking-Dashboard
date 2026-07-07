// "use client";

// import { Box, Typography, Stack } from "@mui/material";

// import { Flight } from "@/types/flight";
// import { useFlightHistory } from "@/hooks/useFlightHistory";

// // import FlightOverview from "./FlightOverview";
// import AltitudeChart from "@/components/charts/AltitudeChart";
// import SpeedChart from "@/components/charts/SpeedChart";

// interface Props {
//   tab: number;
//   flight: Flight;
// }

// export default function FlightContent({ tab, flight }: Props) {
//   const history = useFlightHistory(flight);

//   return (
//     <Box
//       sx={{
//         px: 2,
//         pb: 3,
//         mt: 1,
//       }}
//     >
    
//      {tab === 0 && (
//   <Box
//     sx={{
//       display: "grid",
//       gridTemplateColumns: "1fr 1fr",
//       gap: 1.5,
//     }}
//   >
//     {/* LEFT PANEL */}
//     <Box
//       sx={{
//         p: 1.5,
//         borderRadius: 2,
//         bgcolor: "rgba(255,255,255,0.03)",
//       }}
//     >
//       <Typography sx={{ fontSize: 11, color: "#64748b" }}>
//         Callsign
//       </Typography>
//       <Typography sx={{ fontWeight: 700, mb: 1 }}>
//         {flight.callsign || "Unknown"}
//       </Typography>

//       <Typography sx={{ fontSize: 11, color: "#64748b" }}>
//         ICAO24
//       </Typography>
//       <Typography sx={{ fontWeight: 700, mb: 1 }}>
//         {flight.icao24?.toUpperCase() || "Unknown"}
//       </Typography>

//       <Typography sx={{ fontSize: 11, color: "#64748b" }}>
//         Country
//       </Typography>
//       <Typography sx={{ fontWeight: 700 }}>
//         {flight.originCountry || "Unknown"}
//       </Typography>
//     </Box>

//     {/* RIGHT PANEL */}
//     <Box
//       sx={{
//         p: 1.5,
//         borderRadius: 2,
//         bgcolor: "rgba(255,255,255,0.03)",
//       }}
//     >
//       <Typography sx={{ fontSize: 11, color: "#64748b" }}>
//         Latitude
//       </Typography>
//       <Typography sx={{ fontWeight: 700, mb: 1 }}>
//         {flight.latitude?.toFixed(4) || "0.0000"}
//       </Typography>

//       <Typography sx={{ fontSize: 11, color: "#64748b" }}>
//         Longitude
//       </Typography>
//       <Typography sx={{ fontWeight: 700 }}>
//         {flight.longitude?.toFixed(4) || "0.0000"}
//       </Typography>
//     </Box>
//   </Box>
// )}

//       {/* ===================== ANALYTICS ===================== */}
//       {tab === 1 && (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             mt: 1,
//           }}
//         >
//           <AltitudeChart history={history} />
//           <SpeedChart history={history} />
//         </Box>
//       )}

//       {/* ===================== HISTORY ===================== */}
//       {tab === 2 && (
//         <Stack spacing={2}>
//           <Typography fontWeight={700} fontSize={16}>
//             Flight History
//           </Typography>

//           <Info
//             label="Last Updated"
//             value={new Date(
//               flight.lastUpdated * 1000
//             ).toLocaleString()}
//           />

//           <Typography sx={{ color: "#94a3b8", fontSize: 13 }}>
//             Live tracking history will appear here once AviationStack integration is complete.
//           </Typography>
//         </Stack>
//       )}
//     </Box>
//   );
// }

// /* ===================== INFO COMPONENT ===================== */

// function Info({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         gap: 0.3,
//       }}
//     >
//       <Typography
//         sx={{
//           fontSize: 11,
//           color: "#64748b",
//         }}
//       >
//         {label}
//       </Typography>

//       <Typography
//         sx={{
//           fontSize: 14,
//           fontWeight: 600,
//           color: "white",
//         }}
//       >
//         {value}
//       </Typography>
//     </Box>
//   );
// }

"use client";

import { Box, Typography, Stack } from "@mui/material";

import { Flight } from "@/types/flight";
import { useFlightHistory } from "@/hooks/useFlightHistory";
import { getValidCallsign } from "@/utils/FlightHelper";
// import FlightOverview from "./FlightOverview";
import AltitudeChart from "@/components/charts/AltitudeChart";
import SpeedChart from "@/components/charts/SpeedChart";

interface Props {
  tab: number;
  flight: Flight;
}

export default function FlightContent({ tab, flight }: Props) {
  const history = useFlightHistory(flight);

  const validCallsign = getValidCallsign(flight.callsign);

  return (
    <Box
      sx={{
        px: 2,
        pb: 3,
        mt: 1,
      }}
    >
      {tab === 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1.5,
          }}
        >
          {/* LEFT PANEL */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "action.hover",
            }}
          >
            <Field label="Callsign" value={validCallsign} />
            <Field
              label="ICAO24"
              value={flight.icao24?.toUpperCase()}
            />
            <Field label="Country" value={flight.originCountry} last />
          </Box>

          {/* RIGHT PANEL */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "action.hover",
            }}
          >
            <Field
              label="Latitude"
              value={
                flight.latitude !== undefined
                  ? flight.latitude.toFixed(4)
                  : undefined
              }
            />
            <Field
              label="Longitude"
              value={
                flight.longitude !== undefined
                  ? flight.longitude.toFixed(4)
                  : undefined
              }
              last
            />
          </Box>

          {/* NO CALLSIGN NOTICE */}
          {!validCallsign && (
            <Box
              sx={{
                gridColumn: "1 / -1",
                mt: 0.5,
                p: 1.25,
                borderRadius: 2,
                bgcolor: "action.hover",
                fontSize: 12.5,
                color: "text.secondary",
              }}
            >
              This aircraft isn&apos;t broadcasting a callsign, so route,
              airline, and schedule details can&apos;t be looked up. Position
              and speed data above is still live.
            </Box>
          )}
        </Box>
      )}

      {/* ===================== ANALYTICS ===================== */}
      {tab === 1 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
          }}
        >
          <AltitudeChart history={history} />
          <SpeedChart history={history} />
        </Box>
      )}

      {/* ===================== HISTORY ===================== */}
      {tab === 2 && (
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
            Flight History
          </Typography>

          <Info
            label="Last Updated"
            value={new Date(flight.lastUpdated * 1000).toLocaleString()}
          />

          <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
            Live tracking history will appear here once AviationStack
            integration is complete.
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

/* ===================== FIELD COMPONENT (Overview tab) ===================== */

function Field({
  label,
  value,
  last,
}: {
  label: string;
  value?: string | null;
  last?: boolean;
}) {
  const isAvailable =
    value !== undefined && value !== null && value.trim() !== "";

  return (
    <Box sx={{ mb: last ? 0 : 1 }}>
      <Typography sx={{ fontSize: 11, color: "text.disabled" }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontWeight: 700,
          fontStyle: isAvailable ? "normal" : "italic",
          opacity: isAvailable ? 1 : 0.5,
        }}
      >
        {isAvailable ? value : "Not available"}
      </Typography>
    </Box>
  );
}

/* ===================== INFO COMPONENT (History tab) ===================== */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.3,
      }}
    >
      <Typography
        sx={{
          fontSize: 11,
          color: "text.disabled",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
