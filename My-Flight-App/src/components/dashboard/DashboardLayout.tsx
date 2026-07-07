"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

interface DashboardLayoutProps {
  drawerOpen: boolean;
  drawer: ReactNode;
  children: ReactNode;
}

const DRAWER_WIDTH = 380;

export default function DashboardLayout({
  drawerOpen,
  drawer,
  children,
}: DashboardLayoutProps) {
  const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      bgcolor: "background.default",  
      }}
    >
      {/* MAP */}

      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </Box>

      {/* FLOATING DRAWER */}

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
  initial={
    isMobile
      ? {
          y: "100%",
          opacity: 1,
        }
      : {
          x: -420,
          opacity: 0,
        }
  }
  animate={
    isMobile
      ? {
          y: 0,
          opacity: 1,
        }
      : {
          x: 0,
          opacity: 1,
        }
  }
  exit={
    isMobile
      ? {
          y: "100%",
          opacity: 1,
        }
      : {
          x: -420,
          opacity: 0,
        }
  }
  transition={{
    duration: 0.3,
    ease: "easeOut",
  }}
  style={{
    position: "absolute",
    zIndex: 1000,

    ...(isMobile
      ? {
          left: 0,
          right: 0,
          bottom: 0,
          height: "70vh",
        }
      : {
          top: 24,
          left: 24,
          bottom: 24,
          width: DRAWER_WIDTH,
        }),
  }}
>
  <Box
    sx={{
      height: "100%",
      overflow: "hidden",

      borderTopLeftRadius: isMobile ? 24 : 24,
      borderTopRightRadius: isMobile ? 24 : 24,
      borderBottomLeftRadius: isMobile ? 0 : 24,
      borderBottomRightRadius: isMobile ? 0 : 24,

      bgcolor: "background.paper",

      backdropFilter: "blur(18px)",

      border: 1,
      borderColor: "divider",

      boxShadow: "0 30px 80px rgba(0,0,0,.45)",
    }}
  >
    {drawer}
  </Box>
</motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
