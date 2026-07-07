"use client";

import { useState } from "react";
import {
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Popover,
  Drawer,
  Box,
  Typography,
  Slider,
  TextField,
  Stack,
  Chip,
  Divider,
  InputAdornment,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FlightIcon from "@mui/icons-material/Flight";
import HeightIcon from "@mui/icons-material/Height";
import SpeedIcon from "@mui/icons-material/Speed";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters, clearFilters } from "@/features/flights";

export default function FilterButton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.flights.filters);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const activeCount =
    (filters.airline.trim() !== "" ? 1 : 0) +
    (filters.altitudeRange[0] !== 0 || filters.altitudeRange[1] !== 50000
      ? 1
      : 0) +
    (filters.speedRange[0] !== 0 || filters.speedRange[1] !== 1200 ? 1 : 0);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const panelContent = (
    <Box sx={{ width: { xs: "100%", sm: 340 } }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 2,
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
          <FilterListIcon fontSize="small" color="primary" />
          <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
            Filters
          </Typography>
        </Stack>

        {activeCount > 0 && (
          <Chip
            label={`Clear all (${activeCount})`}
            size="small"
            onClick={() => dispatch(clearFilters())}
            sx={{
              cursor: "pointer",
              fontSize: 11,
              bgcolor: "action.hover",
            }}
          />
        )}
      </Box>

      <Divider />

      {/* Body */}
      <Stack spacing={3} sx={{ px: 2.5, py: 2.5 }}>
        {/* Airline */}
        <Box>
          <Stack
            direction="row"
            sx={{ alignItems: "center", gap: 0.75, mb: 1 }}
          >
            <FlightIcon sx={{ fontSize: 15, color: "text.secondary" }} />
            <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "text.secondary" }}>
              AIRLINE
            </Typography>
          </Stack>
          <TextField
            placeholder="e.g. Emirates, United..."
            size="small"
            fullWidth
            value={filters.airline}
            onChange={(e) =>
              dispatch(setFilters({ ...filters, airline: e.target.value }))
            }
            slotProps={{
              input: {
                endAdornment: filters.airline ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() =>
                        dispatch(setFilters({ ...filters, airline: "" }))
                      }
                    >
                      <Typography sx={{ fontSize: 16, lineHeight: 1 }}>×</Typography>
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
              },
            }}
          />
        </Box>

        {/* Altitude */}
        <Box>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: 0.75 }}>
              <HeightIcon sx={{ fontSize: 15, color: "text.secondary" }} />
              <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "text.secondary" }}>
                ALTITUDE (FT)
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>
              {filters.altitudeRange[0].toLocaleString()} – {filters.altitudeRange[1].toLocaleString()}
            </Typography>
          </Stack>
          <Slider
            value={filters.altitudeRange}
            onChange={(_, value) =>
              dispatch(
                setFilters({
                  ...filters,
                  altitudeRange: value as [number, number],
                })
              )
            }
            min={0}
            max={50000}
            step={500}
            size="small"
            sx={{ mx: 0.5 }}
          />
        </Box>

        {/* Speed */}
        <Box>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: 0.75 }}>
              <SpeedIcon sx={{ fontSize: 15, color: "text.secondary" }} />
              <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "text.secondary" }}>
                SPEED (KM/H)
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>
              {filters.speedRange[0]} – {filters.speedRange[1]}
            </Typography>
          </Stack>
          <Slider
            value={filters.speedRange}
            onChange={(_, value) =>
              dispatch(
                setFilters({
                  ...filters,
                  speedRange: value as [number, number],
                })
              )
            }
            min={0}
            max={1200}
            step={20}
            size="small"
            sx={{ mx: 0.5 }}
          />
        </Box>
      </Stack>

      {isMobile && (
        <Box sx={{ px: 2.5, pb: 2.5 }}>
          <Button fullWidth variant="contained" onClick={handleClose} sx={{ borderRadius: 2, textTransform: "none" }}>
            Done
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <IconButton color="inherit" onClick={handleOpen} sx={{ position: "relative" }}>
          <FilterListIcon />
          {activeCount > 0 && (
            <Chip
              label={activeCount}
              size="small"
              color="primary"
              sx={{
                position: "absolute",
                top: 2,
                right: 2,
                height: 16,
                minWidth: 16,
                fontSize: 10,
                "& .MuiChip-label": { px: 0.6 },
              }}
            />
          )}
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleOpen}
          sx={{ borderRadius: 3, textTransform: "none" }}
        >
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </Button>
      )}

      {isMobile ? (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: { sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } },
          }}
        >
          {panelContent}
        </Drawer>
      ) : (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: { sx: { borderRadius: 2, mt: 1 } },
          }}
        >
          {panelContent}
        </Popover>
      )}
    </>
  );
}
