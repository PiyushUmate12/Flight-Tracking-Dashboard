import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2026 Flight Tracker Dashboard | Powered by
        OpenSky, AviationStack and Mapbox
      </Typography>
    </Box>
  );
}