"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import FlightIcon from "@mui/icons-material/Flight";

import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import LiveStatus from "./LiveStatus";
import FilterButton from "./FilterButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
  <AppBar
  position="fixed"
  elevation={0}
  sx={{
    bgcolor: "background.paper",
    color: "text.primary", // Add this
    borderBottom: 1,
    borderColor: "divider",
  }}
>
      <Toolbar
        sx={{
          minHeight: "72px",
          px: { xs: 2, md: 4 },
          gap: 2,
        }}
      >
        {isMobile && <MobileMenu />}

        {/* Logo */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FlightIcon color="primary" />

 <Typography
  variant="h6"
  sx={{
    fontWeight: 700,
    color: "text.primary",
    display: {
      xs: "none",
      sm: "block",
    },
  }}
>
  Flight Tracker
</Typography>
        </Box>

        {/* Search */}

        {!isMobile && (
          <Box
            sx={{
              flex: 1,
              maxWidth: 650,
              mx: "auto",
            }}
          >
            <SearchBar />
          </Box>
        )}

        {/* Actions */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ml: "auto",
          }}
        >
          {!isMobile && <FilterButton />}

          <LiveStatus />

          <ThemeToggle />
        </Box>
      </Toolbar>

      {/* Mobile Search */}

      {isMobile && (
        <Box
          sx={{
            px: 2,
            pb: 2,
          }}
        >
          <SearchBar />
        </Box>
      )}
    </AppBar>
  );
}
