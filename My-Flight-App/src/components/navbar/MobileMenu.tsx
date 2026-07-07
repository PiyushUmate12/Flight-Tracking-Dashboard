"use client";

import { useState } from "react";
import {
  IconButton,
  Drawer,
  Box,
  Typography,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import FlightIcon from "@mui/icons-material/Flight";

import FilterButton from "./FilterButton";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 2,
            }}
          >
            <FlightIcon color="primary" />

            <Typography fontWeight={700}>
              Flight Tracker
            </Typography>
          </Box>

          <Divider />

          <Box
            sx={{
              p: 2,
            }}
           
          >
            <FilterButton />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}